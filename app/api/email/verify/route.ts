/// Caminho: app/api/email/verify/route.ts
// Versão: 1.0
// Autor: GPT & Weber
// Data: 29/07/2025
// Comentários: Verifica token de confirmação enviado por e‑mail.

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    if (!token) {
      return NextResponse.json({ message: 'Token não fornecido' }, { status: 400 });
    }

    // Mock de verificação: no futuro remova este if e use real lookup
    const registro = await prisma.advertiser.findFirst({
      where: { /* supondo que você armazena token no DB */ verifyToken: token }
    });

    if (!registro) {
      return NextResponse.json({ message: 'Token inválido' }, { status: 404 });
    }

    // Atualiza status de verificação
    await prisma.advertiser.update({
      where: { id: registro.id },
      data: { statusCadastro: 'aguardando_pagamento' }
    });

    return NextResponse.json({ message: 'Email verificado com sucesso' });
  } catch (err: any) {
    console.error('[VERIFY EMAIL ERROR]', err);
    return NextResponse.json({ message: 'Erro ao verificar email' }, { status: 500 });
  }
}
