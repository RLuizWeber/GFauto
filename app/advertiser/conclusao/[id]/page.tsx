// Nome do Código: page.tsx
// Versão: 1.2
// Autor: Alcides Weber & Dev Team
// Data da última modificação: 2025-07-25
// Hora: 18:42
// Comentários: Página de Conclusão do Cadastro com preview do anúncio e botão "Publicar Anúncio"

'use client'

import { useEffect, useState } from 'react'

interface Anunciante {
  id: string
  nomeFantasia: string
  razaoSocial: string
  imagemUrl: string
  slogan: string
  descricao: string
  nomeParaAnuncio: string
  planoEscolhido: string
  statusCadastro: string
}

export default function ConclusaoCadastro({ params }: { params: { id: string } }) {
  const [anunciante, setAnunciante] = useState<Anunciante | null>(null)

  useEffect(() => {
    async function fetchAnunciante() {
      const res = await fetch(`/api/advertiser/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setAnunciante(data)
      }
    }

    fetchAnunciante()
  }, [params.id])

  if (!anunciante) {
    return <p className="text-center mt-10">Carregando dados do anunciante...</p>
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Conclusão do Cadastro</h1>

      <section className="bg-gray-100 p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Preview do Anúncio</h2>

        <div className="mb-4">
          <strong>Nome para o Anúncio:</strong> {anunciante.nomeParaAnuncio || anunciante.nomeFantasia}
        </div>

        <div className="mb-4">
          <strong>Plano Escolhido:</strong> {anunciante.planoEscolhido}
        </div>

        <div className="mb-4">
          <strong>Slogan:</strong> {anunciante.slogan}
        </div>

        <div className="mb-4">
          <strong>Descrição:</strong> {anunciante.descricao}
        </div>

        {anunciante.imagemUrl && (
          <img
            src={anunciante.imagemUrl}
            alt="Imagem do Anúncio"
            className="w-full max-w-md mx-auto mt-6 mb-4"
          />
        )}

        <button
          className="bg-green-600 text-white px-6 py-3 rounded mt-4"
          onClick={() => alert('Anúncio publicado com sucesso!')}
        >
          Publicar Anúncio
        </button>
      </section>
    </main>
  )
}
