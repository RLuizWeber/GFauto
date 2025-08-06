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

    console.log('=== API EXCLUINDO ANUNCIANTE ===');
    console.log('ID recebido:', id);
    console.log('Timestamp:', new Date().toISOString());

    // Verificar se o anunciante existe
    const advertiser = await prisma.advertiser.findUnique({
      where: { id }
    });

    console.log('Anunciante encontrado:', !!advertiser);
    if (advertiser) {
      console.log('Nome do anunciante:', advertiser.nomeResponsavel);
      console.log('Email do anunciante:', advertiser.email);
    }

    if (!advertiser) {
      console.log('Erro: Anunciante não encontrado');
      return NextResponse.json(
        { error: 'Anunciante não encontrado' },
        { status: 404 }
      );
    }

    // Excluir o anunciante
    console.log('Executando DELETE no banco...');
    const deletedAdvertiser = await prisma.advertiser.delete({
      where: { id }
    });

    console.log('DELETE executado com sucesso');
    console.log('Anunciante excluído:', deletedAdvertiser.nomeResponsavel);

    // VERIFICAÇÃO EXTRA: Confirmar que foi realmente excluído
    console.log('=== VERIFICAÇÃO PÓS-EXCLUSÃO ===');
    const verificacao = await prisma.advertiser.findUnique({
      where: { id }
    });
    
    if (verificacao) {
      console.error('ERRO: Anunciante ainda existe após exclusão!', verificacao);
    } else {
      console.log('✅ CONFIRMADO: Anunciante foi realmente excluído do banco');
    }

    // Contar total de anunciantes restantes
    const totalRestante = await prisma.advertiser.count();
    console.log('Total de anunciantes restantes no banco:', totalRestante);

    return NextResponse.json({
      success: true,
      message: 'Anunciante excluído com sucesso',
      deleted: {
        id: deletedAdvertiser.id,
        name: deletedAdvertiser.nomeResponsavel
      }
    });

  } catch (error) {
    console.error('ERRO na API de exclusão:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir anunciante', details: String(error) },
      { status: 500 }
    );
  }
}
