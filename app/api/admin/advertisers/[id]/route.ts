/**
 * API para excluir anunciante específico
 * DELETE: Remove anunciante do banco de dados
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    console.log('=== EXCLUINDO ANUNCIANTE ===');
    console.log('ID:', id);

    // Verificar se o anunciante existe
    const advertiser = await prisma.advertiser.findUnique({
      where: { id }
    });

    if (!advertiser) {
      return NextResponse.json(
        { error: 'Anunciante não encontrado' },
        { status: 404 }
      );
    }

    // Excluir o anunciante
    await prisma.advertiser.delete({
      where: { id }
    });

    console.log('Anunciante excluído com sucesso:', advertiser.nomeResponsavel);

    return NextResponse.json({
      success: true,
      message: 'Anunciante excluído com sucesso'
    });

  } catch (error) {
    console.error('Erro ao excluir anunciante:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir anunciante' },
      { status: 500 }
    );
  }
}
