/**
 * API para buscar o último anunciante criado (para teste)
 * GET: Retorna o último advertiser criado
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const latestAdvertiser = await prisma.advertiser.findFirst({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        email: true,
        nomeResponsavel: true,
        createdAt: true,
        statusCadastro: true
      }
    });

    if (!latestAdvertiser) {
      return NextResponse.json(
        { error: "Nenhum anunciante encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(latestAdvertiser);
  } catch (error) {
    console.error('Erro ao buscar último anunciante:', error);
    return NextResponse.json(
      { error: "Erro ao buscar dados" },
      { status: 500 }
    );
  }
}
