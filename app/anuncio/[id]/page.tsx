// Caminho: /GFauto/app/anuncio/[id]/page.tsx
import { prisma } from "../../../../lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatarTelefone } from "../../../../fluxo_visitante/utils/formatters";

export default async function AnuncioPage({ params }: { params: { id: string } }) {
  const anuncio = await prisma.anuncio.findUnique({
    where: {
      id: params.id,
    },
    include: {
      imagens: true,
      especialidade: true,
      cidade: {
        include: {
          estado: true,
        },
      },
    },
  });

  if (!anuncio) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            {anuncio.imagens && anuncio.imagens.length > 0 ? (
              <div className="relative h-64 md:h-full">
                <Image
                  src={anuncio.imagens[0].url}
                  alt={anuncio.titulo}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="bg-gray-200 h-64 md:h-full flex items-center justify-center">
                <span className="text-gray-500">Sem imagem</span>
              </div>
            )}
          </div>
          <div className="md:w-1/2 p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {anuncio.especialidade?.nome || "Especialidade não informada"}
            </div>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              {anuncio.titulo}
            </h1>
            <p className="mt-2 text-gray-600">
              {anuncio.cidade?.nome}, {anuncio.cidade?.estado?.nome}
            </p>
            <div className="mt-4 border-t border-gray-200 pt-4">
              <h2 className="text-xl font-semibold text-gray-800">Descrição</h2>
              <p className="mt-2 text-gray-600">{anuncio.descricao}</p>
            </div>
            <div className="mt-4 border-t border-gray-200 pt-4">
              <h2 className="text-xl font-semibold text-gray-800">Contato</h2>
              <p className="mt-2 text-gray-600">
                <strong>Endereço:</strong> {anuncio.endereco}
              </p>
              <p className="mt-1 text-gray-600">
                <strong>Telefone:</strong>{" "}
                {anuncio.telefone ? formatarTelefone(anuncio.telefone) : "Não informado"}
              </p>
              <p className="mt-1 text-gray-600">
                <strong>Email:</strong> {anuncio.email || "Não informado"}
              </p>
              <p className="mt-1 text-gray-600">
                <strong>Website:</strong>{" "}
                {anuncio.website ? (
                  <a
                    href={anuncio.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {anuncio.website}
                  </a>
                ) : (
                  "Não informado"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
