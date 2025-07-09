'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

/**
 * Componente de Formulário de Cadastro - Projeto GFauto
 * 
 * Funcionalidades:
 * - Cadastro completo de anunciantes (Cortesia e Premium)
 * - Validação rigorosa de todos os campos obrigatórios
 * - Validação de senha com complexidade (8 chars + maiúscula + minúscula + especial)
 * - Validação de CNPJ/CPF formato brasileiro
 * - Redirecionamento baseado no plano escolhido
 * 
 * Fluxo:
 * - Cortesia: Cadastro → Validação E-mail → Criar Anúncio
 * - Premium: Cadastro → Validação E-mail → Pagamento → Criar Anúncio
 * 
 * Baseado em: README_fluxo_cadastro.md e Estudo.md
 */

interface CadastroFormData {
  // Dados Básicos da Empresa (todos obrigatórios)
  nomeRazaoSocial: string
  nomeFantasia: string
  cnpj: string
  pessoaResponsavel: string
  cpf: string
  celContato: string
  endereco: string
  bairro: string
  cep: string
  cidade: string
  estado: string
  cargo: string
  
  // Dados de Acesso
  email: string
  senha: string
  confirmarSenha: string
}

interface FormErrors {
  [key: string]: string
}

export default function CadastroForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plano = searchParams.get('plano') || 'cortesia'
  
  const [formData, setFormData] = useState<CadastroFormData>({
    nomeRazaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    pessoaResponsavel: '',
    cpf: '',
    celContato: '',
    endereco: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
    cargo: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  // Estados brasileiros
  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ]

  /**
   * Manipula mudanças nos campos do formulário
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  /**
   * Valida formato de CNPJ (XX.XXX.XXX/XXXX-XX)
   */
  const validarCNPJ = (cnpj: string): boolean => {
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/
    return cnpjRegex.test(cnpj)
  }

  /**
   * Valida formato de CPF (XXX.XXX.XXX-XX)
   */
  const validarCPF = (cpf: string): boolean => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
    return cpfRegex.test(cpf)
  }

  /**
   * Valida força da senha conforme especificações:
   * - Mínimo 8 caracteres
   * - 1 maiúscula, 1 minúscula, 1 caractere especial [* # & $ ( ! ]
   */
  const validarSenha = (senha: string): boolean => {
    if (senha.length < 8) return false
    
    const temMaiuscula = /[A-Z]/.test(senha)
    const temMinuscula = /[a-z]/.test(senha)
    const temEspecial = /[*#&$(!]/.test(senha)
    
    return temMaiuscula && temMinuscula && temEspecial
  }

  /**
   * Valida formato de e-mail
   */
  const validarEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Valida formato de CEP (XXXXX-XXX)
   */
  const validarCEP = (cep: string): boolean => {
    const cepRegex = /^\d{5}-\d{3}$/
    return cepRegex.test(cep)
  }

  /**
   * Valida formato de celular ((XX) XXXXX-XXXX)
   */
  const validarCelular = (celular: string): boolean => {
    const celularRegex = /^\(\d{2}\) \d{5}-\d{4}$/
    return celularRegex.test(celular)
  }

  /**
   * Valida todos os campos do formulário
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validar campos obrigatórios
    if (!formData.nomeRazaoSocial.trim()) {
      newErrors.nomeRazaoSocial = 'Nome/Razão Social é obrigatório'
    }
    
    if (!formData.nomeFantasia.trim()) {
      newErrors.nomeFantasia = 'Nome de Fantasia é obrigatório'
    }
    
    if (!formData.cnpj.trim()) {
      newErrors.cnpj = 'CNPJ é obrigatório'
    } else if (!validarCNPJ(formData.cnpj)) {
      newErrors.cnpj = 'CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX'
    }
    
    if (!formData.pessoaResponsavel.trim()) {
      newErrors.pessoaResponsavel = 'Pessoa Responsável é obrigatória'
    }
    
    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório'
    } else if (!validarCPF(formData.cpf)) {
      newErrors.cpf = 'CPF deve estar no formato XXX.XXX.XXX-XX'
    }
    
    if (!formData.celContato.trim()) {
      newErrors.celContato = 'Celular de Contato é obrigatório'
    } else if (!validarCelular(formData.celContato)) {
      newErrors.celContato = 'Celular deve estar no formato (XX) XXXXX-XXXX'
    }
    
    if (!formData.endereco.trim()) {
      newErrors.endereco = 'Endereço da Empresa é obrigatório'
    }
    
    if (!formData.bairro.trim()) {
      newErrors.bairro = 'Bairro é obrigatório'
    }
    
    if (!formData.cep.trim()) {
      newErrors.cep = 'CEP é obrigatório'
    } else if (!validarCEP(formData.cep)) {
      newErrors.cep = 'CEP deve estar no formato XXXXX-XXX'
    }
    
    if (!formData.cidade.trim()) {
      newErrors.cidade = 'Cidade é obrigatória'
    }
    
    if (!formData.estado.trim()) {
      newErrors.estado = 'Estado é obrigatório'
    }
    
    if (!formData.cargo.trim()) {
      newErrors.cargo = 'Seu Cargo é obrigatório'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!validarEmail(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }
    
    if (!formData.senha.trim()) {
      newErrors.senha = 'Senha é obrigatória'
    } else if (!validarSenha(formData.senha)) {
      newErrors.senha = 'Senha deve ter 8+ caracteres, 1 maiúscula, 1 minúscula e 1 caractere especial (* # & $ ( ! )'
    }
    
    if (!formData.confirmarSenha.trim()) {
      newErrors.confirmarSenha = 'Confirmação de senha é obrigatória'
    } else if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Senhas não conferem'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Submete o formulário de cadastro
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          plano
        }),
      })

      if (response.ok) {
        const data = await response.json()
        
        // Redirecionamento baseado no plano (conforme README_fluxo_cadastro.md)
        if (plano === 'premium') {
          // Premium: Cadastro → Validação E-mail → Pagamento → Criar Anúncio
          router.push(`/pagamento?advertiser_id=${data.id}`)
        } else {
          // Cortesia: Cadastro → Validação E-mail → Criar Anúncio
          router.push(`/anuncio/criar?advertiser_id=${data.id}`)
        }
      } else {
        const errorData = await response.json()
        setErrors({ submit: errorData.message || 'Erro ao criar cadastro' })
      }
    } catch (error) {
      setErrors({ submit: 'Erro de conexão. Tente novamente.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cabeçalho baseado em /planos com textos ajustados */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            {/* Título 30% menor que /planos */}
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              Anuncie seu serviço/produto automotivo no GFauto
            </h1>
            {/* Substitui "Escolha seu Plano" por "Faça seu Cadastro" */}
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              Faça seu Cadastro
            </h2>
            {/* Mantém texto igual */}
            <p className="text-lg text-gray-600">
              Conecte-se com milhares de clientes que procuram serviços automotivos na sua região
            </p>
          </div>
        </div>
      </div>

      {/* Formulário de Cadastro */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          
          {/* Indicador de Plano */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Dados Básicos para o Cadastro
            </h3>
            <p className="text-gray-600">
              Plano escolhido: <span className="font-semibold text-green-600">
                {plano === 'premium' ? 'Premium' : 'Cortesia (Gratuito)'}
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              A confirmação do cadastro e login deverá ser feita pelo e-mail do cadastro
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* PARTE 1: Dados Básicos da Empresa */}
            <div className="border-b pb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Parte 1: Dados Básicos da Empresa
              </h4>
              
              {/* Linha 1: Nome/Razão Social + Nome de Fantasia */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome / Razão Social *
                  </label>
                  <input
                    type="text"
                    name="nomeRazaoSocial"
                    value={formData.nomeRazaoSocial}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.nomeRazaoSocial ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Digite o nome ou razão social"
                  />
                  {errors.nomeRazaoSocial && (
                    <p className="text-red-500 text-sm mt-1">{errors.nomeRazaoSocial}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome de Fantasia *
                  </label>
                  <input
                    type="text"
                    name="nomeFantasia"
                    value={formData.nomeFantasia}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.nomeFantasia ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nome fantasia da empresa"
                  />
                  {errors.nomeFantasia && (
                    <p className="text-red-500 text-sm mt-1">{errors.nomeFantasia}</p>
                  )}
                </div>
              </div>

              {/* Linha 2: CNPJ + Pessoa Responsável */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CNPJ *
                  </label>
                  <input
                    type="text"
                    name="cnpj"
                    value={formData.cnpj}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.cnpj ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="00.000.000/0000-00"
                  />
                  {errors.cnpj && (
                    <p className="text-red-500 text-sm mt-1">{errors.cnpj}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pessoa Responsável *
                  </label>
                  <input
                    type="text"
                    name="pessoaResponsavel"
                    value={formData.pessoaResponsavel}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.pessoaResponsavel ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nome do responsável"
                  />
                  {errors.pessoaResponsavel && (
                    <p className="text-red-500 text-sm mt-1">{errors.pessoaResponsavel}</p>
                  )}
                </div>
              </div>

              {/* Linha 3: CPF + Celular */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CPF *
                  </label>
                  <input
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.cpf ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="000.000.000-00"
                  />
                  {errors.cpf && (
                    <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cel. de Contato *
                  </label>
                  <input
                    type="text"
                    name="celContato"
                    value={formData.celContato}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.celContato ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="(00) 00000-0000"
                  />
                  {errors.celContato && (
                    <p className="text-red-500 text-sm mt-1">{errors.celContato}</p>
                  )}
                </div>
              </div>

              {/* Endereço */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço da Empresa *
                </label>
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.endereco ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Rua, número, complemento"
                />
                {errors.endereco && (
                  <p className="text-red-500 text-sm mt-1">{errors.endereco}</p>
                )}
              </div>

              {/* Linha 4: Bairro + CEP + Estado */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bairro *
                  </label>
                  <input
                    type="text"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.bairro ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nome do bairro"
                  />
                  {errors.bairro && (
                    <p className="text-red-500 text-sm mt-1">{errors.bairro}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CEP *
                  </label>
                  <input
                    type="text"
                    name="cep"
                    value={formData.cep}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.cep ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="00000-000"
                  />
                  {errors.cep && (
                    <p className="text-red-500 text-sm mt-1">{errors.cep}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado *
                  </label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.estado ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Selecione o estado</option>
                    {estados.map(estado => (
                      <option key={estado} value={estado}>{estado}</option>
                    ))}
                  </select>
                  {errors.estado && (
                    <p className="text-red-500 text-sm mt-1">{errors.estado}</p>
                  )}
                </div>
              </div>

              {/* Linha 5: Cidade + Cargo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.cidade ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nome da cidade"
                  />
                  {errors.cidade && (
                    <p className="text-red-500 text-sm mt-1">{errors.cidade}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seu Cargo *
                  </label>
                  <input
                    type="text"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.cargo ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Seu cargo na empresa"
                  />
                  {errors.cargo && (
                    <p className="text-red-500 text-sm mt-1">{errors.cargo}</p>
                  )}
                </div>
              </div>
            </div>

            {/* PARTE 2: Dados de Acesso */}
            <div className="border-b pb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Parte 2: Dados de Acesso
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seu Principal E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Senha *
                  </label>
                  <input
                    type="password"
                    name="senha"
                    value={formData.senha}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.senha ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Mínimo 8 caracteres"
                  />
                  {errors.senha && (
                    <p className="text-red-500 text-sm mt-1">{errors.senha}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    8+ caracteres, 1 maiúscula, 1 minúscula, 1 especial (* # & $ ( ! )
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Senha *
                </label>
                <input
                  type="password"
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 md:w-1/2 ${
                    errors.confirmarSenha ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Digite a senha novamente"
                />
                {errors.confirmarSenha && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmarSenha}</p>
                )}
              </div>
            </div>

            {/* Erro geral de submissão */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-red-600">{errors.submit}</p>
              </div>
            )}

            {/* Botão de Submit */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
              >
                {loading ? 'Criando Cadastro...' : 'Criar Cadastro'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
