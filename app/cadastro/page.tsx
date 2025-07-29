// Caminho: app/cadastro/page.tsx
// Versão: 1.1
// Autor: GPT & Weber
// Data: 27/07/2025
// Comentários: Tela de "Cadastro Simples" do anunciante com redirecionamento automático para conclusão. Essa tela utiliza 8 campos da tabela advertiser do DB.

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CadastroPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    nomeResponsavel: '',
    cpf: '',
    email: '',
    celContato: '',
    senha: '',
    planoEscolhido: 'cortesia',
    especialidade: '',
    cidade: ''
  })

  const [mensagem, setMensagem] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMensagem('Enviando...')

    try {
      const response = await fetch('/api/advertiser/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.status === 201) {
        const novo = await response.json()
        const id = novo?.id
        setMensagem('Cadastro realizado com sucesso! Redirecionando...')
        setTimeout(() => {
          router.push(`/advertiser/conclusao/${id}`)
        }, 1500)
      } else {
        const erro = await response.json()
        setMensagem(erro?.error || 'Erro ao cadastrar')
      }
    } catch (erro) {
      setMensagem('Erro de conexão ou servidor')
      console.error('Erro:', erro)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Cadastro Simples</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="nomeResponsavel" placeholder="Nome do Responsável" value={formData.nomeResponsavel} onChange={handleChange} required className="input" />
        <input name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} required className="input" />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="input" />
        <input name="celContato" placeholder="Celular" value={formData.celContato} onChange={handleChange} required className="input" />
        <input name="senha" type="password" placeholder="Senha" value={formData.senha} onChange={handleChange} required className="input" />
        <input name="especialidade" placeholder="Especialidade" value={formData.especialidade} onChange={handleChange} required className="input" />
        <input name="cidade" placeholder="Cidade" value={formData.cidade} onChange={handleChange} required className="input" />

        <div className="flex gap-4 items-center">
          <label className="text-sm font-medium">Plano:</label>
          <select name="planoEscolhido" value={formData.planoEscolhido} onChange={handleChange} className="border rounded p-1">
            <option value="cortesia">Cortesia</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Cadastrar</button>
      </form>
      {mensagem && <p className="mt-4 text-sm text-red-600">{mensagem}</p>}
    </div>
  )
}
