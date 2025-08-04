// Caminho: app/cadastro/page.tsx
// Versão: 2.0
// Autor: GPT & Weber
// Data: 04/08/2025
// Comentários: "Cadastro Simples" do anunciante com validações completas, máscaras e validação de força da senha

'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface FormErrors {
  nomeResponsavel?: string
  cpf?: string
  email?: string
  celContato?: string
  senha?: string
  confirmaSenha?: string
  cidade?: string
  estado?: string
}

interface PasswordStrength {
  score: number
  label: string
  color: string
  requirements: string[]
}

export default function CadastroPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Captura parâmetros da URL (vindos da página de planos)
  const planoFromUrl = searchParams.get('plano') || 'cortesia'
  const valorFromUrl = searchParams.get('valor') || '0'
  const periodoFromUrl = searchParams.get('periodo') || ''

  const [formData, setFormData] = useState({
    nomeResponsavel: '',
    cpf: '',
    email: '',
    celContato: '',
    senha: '',
    confirmaSenha: '',
    planoEscolhido: planoFromUrl,
    valorPlano: valorFromUrl,
    periodoPlano: periodoFromUrl,
    cidade: '',
    estado: ''
  })

  const [estados, setEstados] = useState<any[]>([])
  const [cidades, setCidades] = useState<any[]>([])
  const [errors, setErrors] = useState<FormErrors>({})
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    label: 'Muito fraca',
    color: '#ef4444',
    requirements: []
  })
  const [isFormValid, setIsFormValid] = useState(false)
  const [mensagem, setMensagem] = useState('')

  // Carregar estados ao montar o componente
  useEffect(() => {
    fetch('/api/estados')
      .then(res => res.json())
      .then(data => setEstados(data))
      .catch(err => console.error('Erro ao carregar estados:', err))
  }, [])

  // Carregar cidades quando estado for selecionado
  useEffect(() => {
    if (formData.estado) {
      fetch(`/api/cidades?estado_id=${formData.estado}`)
        .then(res => res.json())
        .then(data => setCidades(data))
        .catch(err => console.error('Erro ao carregar cidades:', err))
    } else {
      setCidades([])
    }
  }, [formData.estado])

  // Validar força da senha
  useEffect(() => {
    if (formData.senha) {
      setPasswordStrength(checkPasswordStrength(formData.senha))
    }
  }, [formData.senha])

  // Validar formulário
  useEffect(() => {
    validateForm()
  }, [formData, errors])

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }
    return value
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }
    return value
  }

  const validateCPF = (cpf: string) => {
    const numbers = cpf.replace(/\D/g, '')
    if (numbers.length !== 11) return false
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(numbers)) return false
    
    // Valida primeiro dígito verificador
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(numbers[i]) * (10 - i)
    }
    let remainder = 11 - (sum % 11)
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(numbers[9])) return false
    
    // Valida segundo dígito verificador
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(numbers[i]) * (11 - i)
    }
    remainder = 11 - (sum % 11)
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(numbers[10])) return false
    
    return true
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const checkPasswordStrength = (password: string): PasswordStrength => {
    const requirements = []
    let score = 0

    if (password.length >= 8) {
      score += 1
    } else {
      requirements.push('Mínimo 8 caracteres')
    }

    if (/[a-z]/.test(password)) {
      score += 1
    } else {
      requirements.push('1 letra minúscula')
    }

    if (/[A-Z]/.test(password)) {
      score += 1
    } else {
      requirements.push('1 letra maiúscula')
    }

    if (/\d/.test(password)) {
      score += 1
    } else {
      requirements.push('1 número')
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 1
    } else {
      requirements.push('1 caractere especial')
    }

    let label = 'Muito fraca'
    let color = '#ef4444'

    if (score === 2) {
      label = 'Fraca'
      color = '#f97316'
    } else if (score === 3) {
      label = 'Média'
      color = '#eab308'
    } else if (score === 4) {
      label = 'Forte'
      color = '#22c55e'
    } else if (score === 5) {
      label = 'Muito forte'
      color = '#16a34a'
    }

    return { score, label, color, requirements }
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!formData.nomeResponsavel.trim()) {
      newErrors.nomeResponsavel = 'Nome é obrigatório'
    }

    if (!formData.cpf || !validateCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido'
    }

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }

    if (!formData.celContato || formData.celContato.replace(/\D/g, '').length < 10) {
      newErrors.celContato = 'Celular inválido'
    }

    if (!formData.senha || passwordStrength.score < 3) {
      newErrors.senha = 'Senha deve ser no mínimo média'
    }

    if (formData.senha !== formData.confirmaSenha) {
      newErrors.confirmaSenha = 'Senhas não conferem'
    }

    if (!formData.cidade) {
      newErrors.cidade = 'Cidade é obrigatória'
    }

    if (!formData.estado) {
      newErrors.estado = 'Estado é obrigatório'
    }

    setErrors(newErrors)
    setIsFormValid(Object.keys(newErrors).length === 0)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === 'cpf') {
      formattedValue = formatCPF(value)
    } else if (name === 'celContato') {
      formattedValue = formatPhone(value)
    } else if (name === 'email') {
      formattedValue = value.toLowerCase()
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    setMensagem('Enviando...')

    try {
      // O hash da senha será feito no servidor (API)
      const dataToSend = {
        nomeResponsavel: formData.nomeResponsavel,
        cpf: formData.cpf.replace(/\D/g, ''), // Remove formatação
        email: formData.email,
        celContato: formData.celContato.replace(/\D/g, ''), // Remove formatação
        senha: formData.senha, // Senha será hasheada no servidor
        planoEscolhido: formData.planoEscolhido,
        valorPlano: formData.valorPlano,
        periodoPlano: formData.periodoPlano,
        cidade: formData.cidade,
        estado: formData.estado,
        statusCadastro: 'cadastro_simples'
      }

      const response = await fetch('/api/advertiser/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      })

      if (response.status === 201) {
        const novo = await response.json()
        const id = novo?.id
        setMensagem('Cadastro realizado com sucesso! Redirecionando...')
        
        // Aqui será enviado o e-mail de confirmação via Resend
        // TODO: Implementar envio de e-mail de confirmação
        
        setTimeout(() => {
          router.push(`/advertiser/conclusao/${id}`)
        }, 1500)
      } else {
        const erro = await response.json()
        setMensagem(erro?.error || 'Erro ao cadastrar anunciante')
      }
    } catch (erro) {
      setMensagem('Erro de conexão ou servidor')
      console.error('Erro:', erro)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Cadastro Simples</h1>
        <p className="text-gray-600">Preencha seus dados para continuar</p>
        {(planoFromUrl !== 'cortesia') && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              Plano selecionado: <strong>{planoFromUrl}</strong>
              {valorFromUrl !== '0' && ` - R$ ${valorFromUrl}`}
              {periodoFromUrl && ` (${periodoFromUrl})`}
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nome do Responsável */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome do Responsável *
          </label>
          <input
            name="nomeResponsavel"
            type="text"
            placeholder="Digite seu nome completo"
            value={formData.nomeResponsavel}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.nomeResponsavel ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.nomeResponsavel && (
            <p className="mt-1 text-sm text-red-600">{errors.nomeResponsavel}</p>
          )}
        </div>

        {/* CPF */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CPF *
          </label>
          <input
            name="cpf"
            type="text"
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChange={handleChange}
            maxLength={14}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.cpf ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.cpf && (
            <p className="mt-1 text-sm text-red-600">{errors.cpf}</p>
          )}
        </div>

        {/* E-mail */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seu principal e-mail *
          </label>
          <input
            name="email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Celular */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Celular de contato *
          </label>
          <input
            name="celContato"
            type="text"
            placeholder="(00) 00000-0000"
            value={formData.celContato}
            onChange={handleChange}
            maxLength={15}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.celContato ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.celContato && (
            <p className="mt-1 text-sm text-red-600">{errors.celContato}</p>
          )}
        </div>

        {/* Estado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado *
          </label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            title="Selecione seu estado"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.estado ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Selecione o estado</option>
            {estados.map((estado) => (
              <option key={estado.id} value={estado.id}>
                {estado.nome} - {estado.sigla}
              </option>
            ))}
          </select>
          {errors.estado && (
            <p className="mt-1 text-sm text-red-600">{errors.estado}</p>
          )}
        </div>

        {/* Cidade */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cidade *
          </label>
          <select
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            disabled={!formData.estado}
            title="Selecione sua cidade"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.cidade ? 'border-red-500' : 'border-gray-300'
            } ${!formData.estado ? 'bg-gray-100' : ''}`}
          >
            <option value="">
              {!formData.estado ? 'Selecione primeiro o estado' : 'Selecione a cidade'}
            </option>
            {cidades.map((cidade) => (
              <option key={cidade.id} value={cidade.id}>
                {cidade.nome}
              </option>
            ))}
          </select>
          {errors.cidade && (
            <p className="mt-1 text-sm text-red-600">{errors.cidade}</p>
          )}
        </div>

        {/* Plano */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Plano
          </label>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-lg font-semibold text-gray-800">
              {formData.planoEscolhido === 'cortesia' ? 'Plano Cortesia' : 'Plano Premium'}
            </p>
            {formData.valorPlano !== '0' && (
              <p className="text-sm text-gray-600">
                Valor: R$ {formData.valorPlano}
                {formData.periodoPlano && ` (${formData.periodoPlano})`}
              </p>
            )}
          </div>
        </div>

        {/* Senha */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cadastre a Senha *
          </label>
          <input
            name="senha"
            type="password"
            placeholder="Digite uma senha segura"
            value={formData.senha}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.senha ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          
          {/* Indicador de força da senha */}
          {formData.senha && (
            <div className="mt-2">
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2 relative overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 absolute top-0 left-0 ${
                      passwordStrength.score === 1 ? 'bg-red-500 w-1/5' :
                      passwordStrength.score === 2 ? 'bg-orange-500 w-2/5' :
                      passwordStrength.score === 3 ? 'bg-yellow-500 w-3/5' :
                      passwordStrength.score === 4 ? 'bg-green-500 w-4/5' :
                      passwordStrength.score === 5 ? 'bg-green-600 w-full' : 'bg-red-500 w-0'
                    }`}
                  ></div>
                </div>
                <span 
                  className={`text-sm font-medium ${
                    passwordStrength.score === 1 ? 'text-red-500' :
                    passwordStrength.score === 2 ? 'text-orange-500' :
                    passwordStrength.score === 3 ? 'text-yellow-500' :
                    passwordStrength.score === 4 ? 'text-green-500' :
                    passwordStrength.score === 5 ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {passwordStrength.label}
                </span>
              </div>
              
              {passwordStrength.requirements.length > 0 && (
                <div className="text-xs text-gray-600">
                  <p className="mb-1">Necessário:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {passwordStrength.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          {errors.senha && (
            <p className="mt-1 text-sm text-red-600">{errors.senha}</p>
          )}
        </div>

        {/* Confirmação de Senha */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirme a Senha *
          </label>
          <input
            name="confirmaSenha"
            type="password"
            placeholder="Digite a senha novamente"
            value={formData.confirmaSenha}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.confirmaSenha ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.confirmaSenha && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmaSenha}</p>
          )}
        </div>

        {/* Botão de Submit */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
            isFormValid
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {mensagem === 'Enviando...' ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        {/* Nota sobre confirmação por e-mail */}
        <div className="text-center text-sm text-gray-600 mt-4">
          <p>
            Após o cadastro, você receberá um e-mail de confirmação.
          </p>
        </div>
      </form>

      {/* Mensagem de status */}
      {mensagem && (
        <div className={`mt-6 p-4 rounded-lg text-center ${
          mensagem.includes('sucesso') 
            ? 'bg-green-50 text-green-700' 
            : mensagem.includes('Enviando') 
            ? 'bg-blue-50 text-blue-700'
            : 'bg-red-50 text-red-700'
        }`}>
          {mensagem}
        </div>
      )}
    </div>
  )
}
