/**
 * app/api/advertiser/register/route.ts
 * Rota para cadastro simples do anunciante.
 * - POST: Cria um novo anunciante com os campos básicos (primeira etapa do fluxo).
 * - Valida campos obrigatórios conforme schema.prisma e fluxo GFauto.
 * - O restante dos campos é preenchido na conclusão do cadastro.
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

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

    // Verificar se o email já existe
    const existingUser = await prisma.advertiser.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "E-mail já cadastrado" },
        { status: 409 }
      );
    }

    // Hash da senha no servidor
    const hashedPassword = await bcrypt.hash(data.senha, 12);

    // Gerar ID único para o advertiser
    const advertiserId = `adv_${Date.now()}_${Math.random().toString(36).substring(2)}`;

    // Cria o anunciante no banco
    const advertiser = await prisma.advertiser.create({
      data: {
        id: advertiserId,
        email: data.email,
        senha: hashedPassword,
        cpf: data.cpf,
        celContato: data.celContato,
        nomeResponsavel: data.nomeResponsavel,
        planoEscolhido: data.planoEscolhido,
        cidade: data.cidade,
        estado: data.estado,
        statusCadastro: "cadastro_simples",
        emailVerificado: false,
        updatedAt: new Date()
      }
    });

    // Remover a senha da resposta por segurança
    const { senha, ...advertiserResponse } = advertiser;

    return NextResponse.json(advertiserResponse, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao cadastrar anunciante", details: String(error) },
      { status: 500 }
    );
  }
}
