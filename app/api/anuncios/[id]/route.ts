// PUT /api/anuncios/:id
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const data = await req.json();

  try {
    const anuncioAtualizado = await prisma.anuncio.update({
      where: { id: Number(id) },
      data
    });

    return NextResponse.json(anuncioAtualizado);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar anúncio.' }, { status: 500 });
  }
}

// DELETE /api/anuncios/:id
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    await prisma.anuncio.delete({
      where: { id: Number(id) }
    });

    return NextResponse.json({ message: 'Anúncio deletado.' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar anúncio.' }, { status: 500 });
  }
}
