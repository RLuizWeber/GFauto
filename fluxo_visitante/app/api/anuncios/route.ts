import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

/**
 * API para busca de anúncios com rotação circular para premium
 *
 * Esta API retorna anúncios filtrados por cidade e especialidade,
 * com rotação circular para anúncios premium e paginação.
 *
 * @param {Request} request - Objeto de requisição
 * @returns {Promise<NextResponse>} Lista de anúncios e informações de paginação
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cidadeId = searchParams.get('cidade_id');
    const especialidadeId = searchParams.get('especialidade_id');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    if (!cidadeId || !especialidadeId) {
      return NextResponse.json(
        { error: 'Parâmetros cidade_id e especialidade_id são obrigatórios' },
        { status: 400 }
      );
    }

    // Buscar ou criar registro de rotação
    let rotacao = await prisma.rotacaoPremium.findFirst({
      where: {
        especialidadeId: parseInt(especialidadeId),
        cidadeId: parseInt(cidadeId)
      }
    });

    if (!rotacao) {
      rotacao = await prisma.rotacaoPremium.create({
        data: {
          especialidadeId: parseInt(especialidadeId),
          cidadeId: parseInt(cidadeId),
          ultimaPosicao: 0
        }
      });
    }

    // Buscar anúncios premium
    const anunciosPremium = await prisma.anuncio.findMany({
      where: {
        cidadeId: parseInt(cidadeId),
        especialidadeId: parseInt(especialidadeId),
        plano: 'premium',
        status: 'PUBLICADO'
      },
      include: {
        imagens: {
          orderBy: { ordem: 'asc' },
          take: 1
        }
      }
    });

    // Aplicar rotação circular nos anúncios premium
    let anunciosPremiumRotacionados = [...anunciosPremium];
    if (anunciosPremiumRotacionados.length > 0) {
      const posicao = rotacao.ultimaPosicao % anunciosPremiumRotacionados.length;
      anunciosPremiumRotacionados = [
        ...anunciosPremiumRotacionados.slice(posicao),
        ...anunciosPremiumRotacionados.slice(0, posicao)
      ];

      // Atualizar posição para próxima consulta
      await prisma.rotacaoPremium.update({
        where: { id: rotacao.id },
        data: { ultimaPosicao: (rotacao.ultimaPosicao + 1) % anunciosPremiumRotacionados.length }
      });
    }

    // Buscar anúncios cortesia
    const anunciosCortesia = await prisma.anuncio.findMany({
      where: {
        cidadeId: parseInt(cidadeId),
        especialidadeId: parseInt(especialidadeId),
        plano: 'cortesia',
        status: 'PUBLICADO'
      },
      include: {
        imagens: {
          orderBy: { ordem: 'asc' },
          take: 1
        }
      }
    });

    // Combinar anúncios premium e cortesia
    const todosAnuncios = [...anunciosPremiumRotacionados, ...anunciosCortesia];

    // Aplicar paginação
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const anunciosPaginados = todosAnuncios.slice(skip, skip + take);

    // Formatar resposta
    const anunciosFormatados = anunciosPaginados.map(anuncio => ({
      id: anuncio.id,
      titulo: anuncio.titulo,
      descricao: anuncio.descricao,
      endereco: anuncio.endereco,
      telefone: anuncio.telefone,
      whatsapp: anuncio.whatsapp,
      email: anuncio.email,
      site: anuncio.site,
      plano: anuncio.plano,
      imagemPrincipal: anuncio.imagemPrincipal || (anuncio.imagens.length > 0 ? anuncio.imagens[0].url : null),
      latitude: anuncio.latitude,
      longitude: anuncio.longitude
    }));

    // Informações de paginação
    const total = todosAnuncios.length;
    const totalPages = Math.ceil(total / pageSize);

    return NextResponse.json({
      anuncios: anunciosFormatados,
      pagination: {
        page,
        pageSize,
        total,
        totalPages
      }
    });
  } catch (error) {
    console.error('Erro ao buscar anúncios:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar anúncios' },
      { status: 500 }
    );
  }
}
