/**
 * app/api/advertiser/register/route.ts
 * Rota para cadastro simples do anunciante.
 * - POST: Cria um novo anunciante com os campos básicos (primeira etapa do fluxo).
 * - Valida campos obrigatórios conforme schema.prisma e fluxo GFauto.
 * - O restante dos campos é preenchido na conclusão do cadastro.
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validando campos obrigatórios do cadastro simples
    const requiredFields = [
      "email",
      "senha",
      "cpf",
      "celContato",
      "nomeResponsavel",
      "planoEscolhido"
    ];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Campo obrigatório ausente: ${field}` },
          { status: 400 }
        );
      }
    }

    // Cria o anunciante no banco (campos extra só se enviados)
    const advertiser = await prisma.advertiser.create({
      data: {
        email: data.email,
        senha: data.senha,
        cpf: data.cpf,
        celContato: data.celContato,
        nomeResponsavel: data.nomeResponsavel,
        planoEscolhido: data.planoEscolhido,
        statusCadastro: data.statusCadastro || "cadastro_simples", // default se não vier
        // Demais campos opcionais podem ser passados, mas não são obrigatórios
        ...data
      }
    });

    return NextResponse.json(advertiser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao cadastrar anunciante", details: String(error) },
      { status: 500 }
    );
  }
}
