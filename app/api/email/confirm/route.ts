/**
 * API para confirmar e-mail do anunciante
 * POST: Confirma o e-mail usando o token enviado
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: "Token de confirmação é obrigatório" },
        { status: 400 }
      );
    }

    // Buscar usuário pelo token (armazenado temporariamente no campo slogan)
    const advertisers = await prisma.advertiser.findMany({
      where: {
        slogan: {
          startsWith: `token:${token}:`
        }
      }
    });

    let advertiser = null;
    for (const adv of advertisers) {
      if (adv.slogan) {
        const [, , expirationStr] = adv.slogan.split(':');
        const expirationTime = new Date(parseInt(expirationStr));
        if (expirationTime > new Date()) {
          advertiser = adv;
          break;
        }
      }
    }

    if (!advertiser) {
      return NextResponse.json(
        { error: "Token inválido ou expirado" },
        { status: 400 }
      );
    }

    // Atualizar status do usuário
    const updatedAdvertiser = await prisma.advertiser.update({
      where: { id: advertiser.id },
      data: {
        emailVerificado: true,
        statusCadastro: "email_confirmado",
        slogan: null, // Limpar token
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      message: "E-mail confirmado com sucesso!",
      advertiserId: updatedAdvertiser.id,
      statusCadastro: updatedAdvertiser.statusCadastro
    });

  } catch (error) {
    console.error('Erro ao confirmar e-mail:', error);
    return NextResponse.json(
      { error: "Erro ao confirmar e-mail" },
      { status: 500 }
    );
  }
}
