/// Caminho: app/advertiser/conclusao/[id]/page.tsx
// Versão: 1.0
// Autor: GPT & Weber
// Data: 27/07/2025
// Comentários: Tela de Conclusão do Cadastro do anunciante. Busca os dados existentes, complementa as informações do cadastro e atualiza via PUT.

'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function ConclusaoCadastro() {
  const { id } = useParams()
  const router = useRouter()

  const [form, setForm] = useState({
    nomeFantasia: '',
    nomeRazaoSocial: '',
    imagemUrl: '',
    slogan: '',
    descricao: '',
    nomeParaAnuncio: ''
  })

  useEffect(() => {
    async function fetchAdvertiser() {
      try {
        const res = await fetch(`/api/advertiser/${id}`)
        const data = await res.json()
        setForm({
          nomeFantasia: data.nomeFantasia || '',
          nomeRazaoSocial: data.nomeRazaoSocial || '',
          imagemUrl: data.imagemUrl || '',
          slogan: data.slogan || '',
          descricao: data.descricao || '',
          nomeParaAnuncio: data.nomeParaAnuncio || ''
        })
      } catch (err) {
        console.error('Erro ao buscar anunciante:', err)
      }
    }

    if (id) fetchAdvertiser()
  }, [id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      const res = await fetch(`/api/advertiser/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        router.push(`/advertiser/painel/${id}`)
      } else {
        console.error('Erro ao atualizar cadastro:', await res.text())
      }
    } catch (err) {
      console.error('Erro geral no envio:', err)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  return (
    <main className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Conclusão do Cadastro</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nomeFantasia"
          placeholder="Nome Fantasia"
          value={form.nomeFantasia}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="text"
          name="nomeRazaoSocial"
          placeholder="Razão Social"
          value={form.nomeRazaoSocial}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="text"
          name="imagemUrl"
          placeholder="URL da Imagem"
          value={form.imagemUrl}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="text"
          name="slogan"
          placeholder="Slogan"
          value={form.slogan}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <textarea
          name="descricao"
          placeholder="Descrição do Anunciante"
          value={form.descricao}
          onChange={handleChange}
          className="w-full border p-2 h-28"
        />
        <input
          type="text"
          name="nomeParaAnuncio"
          placeholder="Nome que será exibido no anúncio"
          value={form.nomeParaAnuncio}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Finalizar Cadastro
        </button>
      </form>
    </main>
  )
}
