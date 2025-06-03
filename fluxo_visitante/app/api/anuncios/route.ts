// Caminho: /fluxo_visitante/app/api/anuncios/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

/**
 * API para busca de anúncios com rotação de premium
 * 
 * Esta API retorna a lista de anúncios para a especialidade e cidade selecionadas,
 * com os anúncios premium aparecendo primeiro e com rotação circular.
 * Os anúncios gratuitos (cortesia) aparecem após os premium, sem rotação.
 * 
 * @param {Request} request - Objeto de requisição com parâmetros especialidade_id, cidade_id, page e pageSize
 * @returns {Promise<NextResponse>} Lista de anúncios com paginação
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const especialidadeId = searchParams.get('especialidade_id');
    const cidadeId = searchParams.get('cidade_id');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    
    if (!especialidadeId || !cidadeId) {
      return NextResponse.json(
        { error: 'Parâmetros especialidade_id e cidade_id são obrigatórios' },
        { status: 400 }
      );
    }
    
    // Definir o tipo para anúncios
    type Anuncio = {
      id: string;
      titulo: string;
      descricao: string | null;
      endereco: string;
      telefone: string;
      whatsapp: string | null;
      email: string | null;
      site: string | null;
      plano: string;
      imagemPrincipal: string | null;
      latitude: number | null;
      longitude: number | null;
      imagens: {
        id: string;
        url: string;
        ordem: number;
      }[];
      [key: string]: any; // Para outros campos que possam existir
    };
    
    // Buscar anúncios premium
    const anunciosPremium = await prisma.anuncio.findMany({
      where: {
        especialidadeId: especialidadeId,
        cidadeId: cidadeId,
        plano: 'premium',
        status: 'PUBLICADO'
      },
      include: {
        imagens: {
          orderBy: {
            ordem: 'asc'
          }
        }
      }
    });
    
    // Buscar anúncios cortesia
    const anunciosCortesia = await prisma.anuncio.findMany({
      where: {
        especialidadeId: especialidadeId,
        cidadeId: cidadeId,
        plano: 'cortesia',
        status: 'PUBLICADO'
      },
      include: {
        imagens: {
          orderBy: {
            ordem: 'asc'
          }
        }
      }
    });
    
    // Buscar ou criar registro de rotação
    let rotacao = await prisma.rotacaoPremium.findFirst({
      where: {
        especialidadeId: especialidadeId,
        cidadeId: cidadeId
      }
    });
    
    if (!rotacao) {
      rotacao = await prisma.rotacaoPremium.create({
        data: {
          especialidadeId: especialidadeId,
          cidadeId: cidadeId,
          ultimaPosicao: 0
        }
      });
    }
    
    // Aplicar rotação aos anúncios premium
    let anunciosPremiumRotacionados: typeof anunciosPremium = [];
    if (anunciosPremium.length > 0) {
      const posicao = rotacao.ultimaPosicao % anunciosPremium.length;
      anunciosPremiumRotacionados = [
        ...anunciosPremium.slice(posicao),
        ...anunciosPremium.slice(0, posicao)
      ];
      
      // Atualizar posição para próxima consulta
      await prisma.rotacaoPremium.update({
        where: { id: rotacao.id },
        data: {
          ultimaPosicao: (posicao + 1) % anunciosPremium.length,
          updatedAt: new Date()
        }
      });
    }
    
    // Combinar anúncios premium rotacionados com cortesia
    const todosAnuncios = [...anunciosPremiumRotacionados, ...anunciosCortesia];
    
    // Aplicar paginação
    const skip = (page - 1) * pageSize;
    const anunciosPaginados = todosAnuncios.slice(skip, skip + pageSize);
    
    // Contar total para paginação
    const total = todosAnuncios.length;
    const totalPages = Math.ceil(total / pageSize);
    
    return NextResponse.json({
      anuncios: anunciosPaginados,
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
