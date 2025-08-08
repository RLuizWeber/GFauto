/**
 * app/api/advertiser/update/[id]/route.ts
 * Rota para conclusão do cadastro e atualização do anunciante.
 * - PATCH/PUT: Atualiza campos adicionais, finaliza o cadastro E cria o anúncio.
 * - Só aceita atualização de quem já existe.
 * - Valida campos obrigatórios da conclusão (ex: especialidade, cidade, imagemUrl, etc.)
 * - Cria registro na tabela Anuncio para aparecer nos resultados de busca
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await request.json();

    // Validar campos obrigatórios para criar anúncio
    if (!data.cidade || !data.especialidade) {
      return NextResponse.json(
        { error: "Cidade e especialidade são obrigatórios para publicar o anúncio" },
        { status: 400 }
      );
    }

    // Mapear campos do frontend para o banco
    const mappedData = {
      ...data,
      razaoSocial: data.nomeRazaoSocial || data.razaoSocial, // Mapear nomeRazaoSocial → razaoSocial
    };

    // Remover campo que não existe no banco
    delete mappedData.nomeRazaoSocial;
    delete mappedData.usarNomeFantasia; // Este campo não é salvo no banco

    // 1. Atualizar o anunciante
    const advertiser = await prisma.advertiser.update({
      where: { id },
      data: {
        ...mappedData,
        statusCadastro: "Completo" // Atualiza status para cadastro completo
      }
    });

    // 2. Buscar cidade no banco de dados
    let cidade = await prisma.cidades.findFirst({
      where: { 
        nome: {
          equals: data.cidade,
          mode: 'insensitive'
        }
      }
    });

    // Se a cidade não existe, criar uma nova (temporariamente com estado genérico)
    if (!cidade) {
      // Buscar um estado padrão ou criar
      let estado = await prisma.estados.findFirst({
        where: { sigla: data.estado || 'RS' }
      });
      
      if (!estado) {
        estado = await prisma.estados.create({
          data: {
            id: `estado-${Date.now()}`,
            nome: data.estado || 'Rio Grande do Sul',
            sigla: data.estado || 'RS',
            updated_at: new Date()
          }
        });
      }

      cidade = await prisma.cidades.create({
        data: {
          id: `cidade-${Date.now()}`,
          nome: data.cidade,
          estado_id: estado.id,
          updated_at: new Date()
        }
      });
    }

    // 3. Buscar especialidade no banco de dados
    let especialidade = await prisma.especialidades.findFirst({
      where: { 
        nome: {
          equals: data.especialidade,
          mode: 'insensitive'
        }
      }
    });

    // Se a especialidade não existe, criar uma nova
    if (!especialidade) {
      especialidade = await prisma.especialidades.create({
        data: {
          id: `esp-${Date.now()}`,
          nome: data.especialidade,
          slug: data.especialidade.toLowerCase().replace(/\s+/g, '-'),
          descricao: `Serviços de ${data.especialidade}`,
          updated_at: new Date()
        }
      });
    }

    // 4. Verificar se já existe um anúncio para este anunciante
    const anuncioExistente = await prisma.anuncio.findFirst({
      where: { advertiserId: id }
    });

    let anuncio;
    if (anuncioExistente) {
      // Atualizar anúncio existente
      anuncio = await prisma.anuncio.update({
        where: { id: anuncioExistente.id },
        data: {
          titulo: data.usarNomeFantasia ? (data.nomeFantasia || advertiser.razaoSocial) : advertiser.razaoSocial,
          descricao: data.descricao || `${data.especialidade} - ${data.cidade}`,
          endereco: `${data.enderecoEmpresa || ''}, ${data.bairro || ''}, ${data.cidade}`,
          cidade_id: cidade.id,
          especialidade_id: especialidade.id,
          telefone: data.celContato,
          whatsapp: data.celContato2 || data.celContato,
          email: advertiser.email,
          imagem_principal: data.imagemUrl,
          plano: data.planoEscolhido?.toLowerCase().includes('premium') ? 'premium' : 'cortesia',
          status: 'PUBLICADO',
          site: data.site || null
        }
      });
    } else {
      // Criar novo anúncio
      anuncio = await prisma.anuncio.create({
        data: {
          id: `anuncio-${Date.now()}`,
          advertiserId: id,
          mercadopagoPreferenceId: `pref-${Date.now()}`, // Placeholder
          titulo: data.usarNomeFantasia ? (data.nomeFantasia || advertiser.razaoSocial) : advertiser.razaoSocial,
          descricao: data.descricao || `${data.especialidade} - ${data.cidade}`,
          endereco: `${data.enderecoEmpresa || ''}, ${data.bairro || ''}, ${data.cidade}`,
          cidade_id: cidade.id,
          especialidade_id: especialidade.id,
          telefone: data.celContato,
          whatsapp: data.celContato2 || data.celContato,
          email: advertiser.email,
          imagem_principal: data.imagemUrl,
          plano: data.planoEscolhido?.toLowerCase().includes('premium') ? 'premium' : 'cortesia',
          status: 'PUBLICADO',
          site: data.site || null,
          updatedAt: new Date()
        }
      });
    }

    // 5. Enviar e-mail de boas-vindas
    try {
      const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/email/welcome`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: advertiser.email,
          nomeResponsavel: advertiser.nomeResponsavel,
          especialidade: data.especialidade,
          plano: advertiser.planoEscolhido,
          dataExpiracao: anuncio.data_expiracao,
          anuncioUrl: `https://gfauto.vercel.app/resultados?cidade=${encodeURIComponent(data.cidade)}&especialidade=${encodeURIComponent(data.especialidade)}&anuncio=${anuncio.id}`
        })
      });

      if (!emailResponse.ok) {
        console.error('Erro ao enviar e-mail de boas-vindas:', await emailResponse.text());
      }
    } catch (emailError) {
      console.error('Falha ao enviar e-mail de boas-vindas:', emailError);
      // Não falhar a operação principal por causa do e-mail
    }

    // 6. Retornar dados do anunciante + URL do anúncio
    return NextResponse.json({
      ...advertiser,
      anuncio: {
        id: anuncio.id,
        url: `/resultados?cidade=${encodeURIComponent(data.cidade)}&especialidade=${encodeURIComponent(data.especialidade)}&anuncio=${anuncio.id}`
      }
    });

  } catch (error) {
    console.error('Erro ao atualizar anunciante e criar anúncio:', error);
    return NextResponse.json(
      { error: "Erro ao publicar anúncio", details: String(error) },
      { status: 500 }
    );
  }
}

// Adicionar suporte ao método PUT (mesmo que PATCH)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  return PATCH(request, { params });
}
