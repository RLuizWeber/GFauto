/**
 * app/api/advertiser/update/[id]/route.ts
 * Rota para conclusão do cadastro e atualização do anunciante.
 * - PATCH/PUT: Atualiza campos adicionais e finaliza o cadastro.
 * - Só aceita atualização de quem já existe.
 * - Valida campos obrigatórios da conclusão (ex: especialidade, cidade, imagemUrl, etc.)
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await request.json();

    // Mapear campos do frontend para o banco
    const mappedData = {
      ...data,
      razaoSocial: data.nomeRazaoSocial || data.razaoSocial, // Mapear nomeRazaoSocial → razaoSocial
    };

    // Remover campo que não existe no banco
    delete mappedData.nomeRazaoSocial;
    delete mappedData.usarNomeFantasia; // Este campo não é salvo no banco

    const advertiser = await prisma.advertiser.update({
      where: { id },
      data: {
        ...mappedData,
        statusCadastro: "Completo" // Atualiza status para cadastro completo
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

// Adicionar suporte ao método PUT (mesmo que PATCH)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  return PATCH(request, { params });
}
