'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function EmailSentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get('email')
  const [isResending, setIsResending] = useState(false)
  const [message, setMessage] = useState('')

  const resendEmail = async () => {
    setIsResending(true)
    setMessage('')
    
    try {
      // Aqui você implementaria a lógica para reenviar o e-mail
      // Por enquanto vou simular
      setTimeout(() => {
        setIsResending(false)
        setMessage('✅ E-mail reenviado com sucesso!')
      }, 2000)
    } catch (error) {
      setIsResending(false)
      setMessage('❌ Erro ao reenviar e-mail. Tente novamente.')
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
            Verifique seu E-mail
          </h2>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-2">
              📧 E-mail de Confirmação Enviado!
            </h3>

            <p className="text-gray-600 mb-4">
              Enviamos um e-mail de confirmação para:
            </p>
            
            <p className="text-lg font-semibold text-blue-600 mb-6">
              {email || 'seu e-mail'}
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-blue-900 mb-2">📋 Próximos passos:</h4>
              <ol className="text-sm text-blue-700 space-y-1 text-left">
                <li>1. Verifique sua caixa de entrada</li>
                <li>2. Clique no link de confirmação</li>
                <li>3. Complete seu cadastro</li>
                <li>4. Publique seu primeiro anúncio!</li>
              </ol>
            </div>

            <div className="space-y-3">
              <button
                onClick={resendEmail}
                disabled={isResending}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {isResending ? 'Reenviando...' : '📤 Reenviar E-mail'}
              </button>

              <button
                onClick={() => router.push('/login')}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Ir para Login
              </button>
            </div>

            {message && (
              <div className={`mt-4 p-3 rounded-lg ${
                message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {message}
              </div>
            )}
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 space-y-2">
          <p>🔍 <strong>Não encontrou o e-mail?</strong></p>
          <ul className="space-y-1">
            <li>• Verifique a pasta de spam/lixo eletrônico</li>
            <li>• Verifique se o e-mail está correto</li>
            <li>• Aguarde alguns minutos</li>
          </ul>
          
          <div className="mt-4">
            <p>Problemas? Entre em contato:</p>
            <p>
              <a href="mailto:contato@gfauto.com" className="text-blue-600 hover:underline">
                contato@gfauto.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
