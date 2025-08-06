/**
 * API para redefinir senha usando token
 * POST /api/password/reset
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json();

    // Validações básicas
    if (!token || !newPassword) {
      return NextResponse.json(
        { error: 'Token e nova senha são obrigatórios' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'A senha deve ter pelo menos 6 caracteres' },
        { status: 400 }
      );
    }

    console.log('=== RESET DE SENHA ===');
    console.log('Token recebido:', token);

    // Buscar o anunciante pelo token no campo slogan
    const advertiser = await prisma.advertiser.findFirst({
      where: {
        slogan: {
          startsWith: `reset:${token}:`
        }
      }
    });

    if (!advertiser) {
      console.log('❌ Token não encontrado no banco');
      return NextResponse.json(
        { error: 'Token inválido ou expirado' },
        { status: 400 }
      );
    }

    console.log('✅ Anunciante encontrado:', advertiser.email);

    // Extrair timestamp de expiração do slogan
    const sloganParts = advertiser.slogan?.split(':');
    if (!sloganParts || sloganParts.length !== 3) {
      console.log('❌ Formato do token inválido');
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 400 }
      );
    }

    const expirationTimestamp = parseInt(sloganParts[2]);
    const now = Date.now();

    console.log('Expiration timestamp:', expirationTimestamp);
    console.log('Current timestamp:', now);

    // Verificar se o token expirou (válido por 1 hora)
    if (now > expirationTimestamp) {
      console.log('❌ Token expirado');
      
      // Limpar o token expirado
      await prisma.advertiser.update({
        where: { id: advertiser.id },
        data: { slogan: null }
      });

      return NextResponse.json(
        { error: 'Token expirado. Solicite um novo link de redefinição.' },
        { status: 400 }
      );
    }

    console.log('✅ Token válido, redefinindo senha...');

    // Hash da nova senha
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Atualizar a senha e limpar o token
    await prisma.advertiser.update({
      where: { id: advertiser.id },
      data: {
        senha: hashedPassword,
        slogan: null, // Limpar o token de reset
        updatedAt: new Date()
      }
    });

    console.log('✅ Senha redefinida com sucesso');

    return NextResponse.json(
      { message: 'Senha redefinida com sucesso' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
