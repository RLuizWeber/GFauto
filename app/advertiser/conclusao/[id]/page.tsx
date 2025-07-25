// Nome do Código: app/advertiser/conclusao/[id]/page.tsx
// Versão: 1.0
// Autor: Weber & Dev Team
// Data: 2025-07-22
// Hora: 09:43
// Comentários: Conclusão do Cadastro — preview do anúncio com dados reais do anunciante

'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'

interface Advertiser {
  id: string
  nomeFantasia: string
  razaoSocial: string
  slogan: string
  descricao: string
  imagemUrl: string
  statusCadastro: string
}

export default function ConclusaoCadastro() {
  const { id } = useParams()
  const [anunciante, setAnunciante] = useState<Advertiser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/advertiser/${id}`)
        if (!res.ok) throw new Error('Erro ao buscar anunciante')
        const data = await res.json()
        setAnunciante(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchData()
  }, [id])

  const isCadastroConcluido = anunciante &&
    anunciante.statusCadastro === 'cadastro_completo' &&
    anunciante.nomeFantasia &&
    anunciante.razaoSocial &&
    anunciante.descricao &&
    anunciante.imagemUrl

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <header className="w-full flex justify-between items-center py-4 border-b border-gray-300 mb-6">
        <Image src="/fluxo_plano/images/logo_gf.png" alt="Logo GFauto" width={180} height={60} />
        <Image src="/fluxo_plano/images/logo.png" alt="Logo Institucional" width={160} height={60} />
      </header>

      {loading ? (
        <p>Carregando dados...</p>
      ) : anunciante ? (
        <div className="w-full max-w-3xl bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Pré-visualização do Anúncio</h2>

          <div className="border border-gray-300 p-4 mb-6 rounded">
            <h3 className="text-xl font-semibold mb-2">{anunciante.nomeFantasia || anunciante.razaoSocial}</h3>
            <p className="italic text-gray-600">{anunciante.slogan}</p>
            <p className="mt-4">{anunciante.descricao}</p>

            <div className="mt-6">
              {anunciante.imagemUrl ? (
                <Image
                  src={anunciante.imagemUrl}
                  alt="Imagem do Anúncio"
                  width={400}
                  height={250}
                  className="rounded"
                />
              ) : (
                <div className="w-full h-52 bg-gray-200 text-center flex items-center justify-center text-sm text-gray-600 border border-dashed border-gray-400">
                  Insira uma imagem aqui
                </div>
              )}
            </div>
          </div>

          {!anunciante.imagemUrl && (
            <p className="text-red-600 text-sm mb-4">
              ⚠️ Você ainda não adicionou uma imagem. Enviaremos um e-mail com instruções para completar seu cadastro.
            </p>
          )}

          {isCadastroConcluido ? (
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Publicar Anúncio
            </button>
          ) : (
            <p className="text-yellow-700 font-medium">
              Preencha todos os dados obrigatórios para publicar seu anúncio.
            </p>
          )}
        </div>
      ) : (
        <p className="text-red-600">Anunciante não encontrado.</p>
      )}
    </div>
  )
}
