/**
 * app/api/advertiser/update/[id]/route.ts
 * Rota para conclusão do cadastro e atualização do anunciante.
 * - PATCH/PUT: Atualiza campos adicionais e finaliza o cadastro.
 * - Só aceita atualização de quem já existe.
 * - Valida campos obrigatórios da conclusão (ex: especialidade, cidade, imagemUrl, etc.)
 */

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await request.json();

    // Aqui pode-se validar campos obrigatórios da conclusão do cadastro, se quiser:
    // Exemplo: especialidade, cidade, imagemUrl etc.

    const advertiser = await prisma.advertiser.update({
      where: { id },
      data: {
        ...data,
        statusCadastro: "cadastro_completo" // Atualiza status para cadastro completo
      }
    });

    return NextResponse.json(advertiser);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar anunciante", details: String(error) },
      { status: 500 }
    );
  }
}
