// Nome do Código: page.tsx
// Versão: 1.1
// Autor: Weber & Dev Team
// Data da última modificação: 2025-07-26
// Comentários: Página de login funcional com envio de dados para a rota /api/login

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      })

      const data = await res.json()

      if (res.ok) {
        // Redireciona para o painel
        router.push('/painel')
      } else {
        setErro(data.error || 'Erro ao fazer login')
      }
    } catch (error) {
      setErro('Erro de conexão com o servidor.')
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}

        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium">Senha</label>
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </main>
  )
}
