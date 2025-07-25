// Nome do Código: app/cadastro/page.tsx
// Versão: 1.0
// Autor: Weber & Dev Team
// Data: 25/07/2025
// Hora: 21:55
// Comentários: Tela de Cadastro Simples do anunciante com redirecionamento automático para conclusão.

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

export default function CadastroSimples() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nomeResponsavel: '',
    cpf: '',
    email: '',
    celContato: '',
    senha: '',
    planoEscolhido: 'cortesia',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const id = uuidv4()
    const createdAt = new Date().toISOString()

    const body = {
      id,
      ...formData,
      createdAt,
      updatedAt: createdAt,
      emailVerificado: false,
      statusCadastro: 'cadastro_simples',
    }

    const res = await fetch('/api/advertiser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      router.push(`/advertiser/conclusao/${id}`)
    } else {
      alert('Erro ao cadastrar. Tente novamente.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center mb-4">Cadastro Rápido</h1>

        <input type="text" name="nomeResponsavel" placeholder="Nome do Responsável" value={formData.nomeResponsavel} onChange={handleChange} required className="input" />

        <input type="text" name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} required className="input" />

        <input type="email" name="email" placeholder="E-mail principal" value={formData.email} onChange={handleChange} required className="input" />

        <input type="text" name="celContato" placeholder="Celular de Contato" value={formData.celContato} onChange={handleChange} required className="input" />

        <input type="password" name="senha" placeholder="Senha" value={formData.senha} onChange={handleChange} required className="input" />

        <select name="planoEscolhido" value={formData.planoEscolhido} onChange={handleChange} className="input">
          <option value="cortesia">Cortesia</option>
          <option value="premium">Premium</option>
        </select>

        <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Cadastrar e Continuar</button>
      </form>
    </div>
  )
}
