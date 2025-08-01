/**
 * app/api/advertiser/route.ts
 * Rota principal para operações gerais com ANUNCIANTES.
 * - GET: Lista todos os anunciantes (útil para admin ou diagnóstico).
 * Observação: A criação de novos anunciantes deve ser feita via /register.
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Lista todos os anunciantes
export async function GET() {
  try {
    const advertisers = await prisma.advertiser.findMany();
    return NextResponse.json(advertisers);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar anunciantes", details: String(error) },
      { status: 500 }
    );
  }
}

// (Removido o POST para evitar duplicidade com o /register)
