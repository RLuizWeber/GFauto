// Nome do Código: page.tsx
// Versão: 1.2
// Autor: Weber & Dev Team
// Data da última modificação: 2025-08-06
// Comentários: Redirecionamento para página de login do anunciante

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()

  useEffect(() => {
    // Redireciona automaticamente para a página de login do anunciante
    router.replace('/advertiser/login')
  }, [router])

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecionando para login...</p>
      </div>
    </main>
  )
}
