'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [advertiserId, setAdvertiserId] = useState<string | null>(null)

  useEffect(() => {
    const token = searchParams.get('token')
    
    if (!token) {
      setStatus('error')
      setMessage('Token de confirmação não encontrado.')
      return
    }

    confirmEmail(token)
  }, [searchParams])

  const confirmEmail = async (token: string) => {
    try {
      const response = await fetch('/api/email/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('E-mail confirmado com sucesso!')
        setAdvertiserId(data.advertiserId)
        
        // Redirecionar para conclusão do cadastro após 3 segundos
        setTimeout(() => {
          router.push(`/advertiser/conclusao/${data.advertiserId}`)
        }, 3000)
      } else {
        setStatus('error')
        setMessage(data.error || 'Erro ao confirmar e-mail')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Erro de conexão. Tente novamente.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🚗 GFauto
          </h1>
          <h2 className="text-xl text-gray-600">
            Confirmação de E-mail
          </h2>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          {status === 'loading' && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Confirmando seu e-mail...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                ✅ E-mail Confirmado!
              </h3>
              <p className="text-gray-600 mb-4">{message}</p>
              <p className="text-sm text-gray-500">
                Redirecionando para conclusão do cadastro...
              </p>
              
              {advertiserId && (
                <div className="mt-6">
                  <button
                    onClick={() => router.push(`/advertiser/conclusao/${advertiserId}`)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Continuar Cadastro
                  </button>
                </div>
              )}
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                ❌ Erro na Confirmação
              </h3>
              <p className="text-gray-600 mb-4">{message}</p>
              
              <div className="space-y-3">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Tentar Novamente
                </button>
                
                <button
                  onClick={() => router.push('/cadastro')}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Fazer Novo Cadastro
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Problemas? Entre em contato conosco</p>
          <p>
            <a href="mailto:contato@gfauto.com" className="text-blue-600 hover:underline">
              contato@gfauto.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
