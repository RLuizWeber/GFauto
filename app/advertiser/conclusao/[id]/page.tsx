'use client'

// Teste de commit via VCS - 07/08/2025
import { useEffect, useState, ChangeEvent } from 'react'
import { useParams, useRouter } from 'next/navigation'
import InputMask from 'react-input-mask'
import { useAuth } from '@/lib/useAuth'

interface AdvertiserData {
  id: string
  email: string
  cpf: string
  nomeResponsavel: string
  celContato: string
  planoEscolhido: string
  nomeFantasia?: string
  nomeRazaoSocial?: string
  cnpj?: string
  imagemUrl?: string
  slogan?: string
  descricao?: string
  especialidade?: string
  enderecoEmpresa?: string
  bairro?: string
  cep?: string
  cidade?: string
  estado?: string
  cargo?: string
  celContato2?: string
  nomeParaAnuncio?: string
  usarNomeFantasia?: boolean
}

export default function ConclusaoCadastro() {
  const { id } = useParams()
  const router = useRouter()
  const { updateUser } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [anuncioUrl, setAnuncioUrl] = useState('')

  const [advertiser, setAdvertiser] = useState<AdvertiserData>({
    id: '',
    email: '',
    cpf: '',
    nomeResponsavel: '',
    celContato: '',
    planoEscolhido: 'Cortesia',
    usarNomeFantasia: true
  })

  useEffect(() => {
    async function fetchAdvertiser() {
      try {
        const res = await fetch(`/api/advertiser/${id}`)
        if (res.ok) {
          const data = await res.json()
          setAdvertiser({
            ...data,
            usarNomeFantasia: data.usarNomeFantasia ?? true
          })
        }
      } catch (err) {
        console.error('Erro ao buscar anunciante:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchAdvertiser()
  }, [id])

  const handleInputChange = (field: keyof AdvertiserData, value: any) => {
    setAdvertiser(prev => ({ ...prev, [field]: value }))
  }

  const handleCepChange = async (cep: string) => {
    // Remove caracteres não numéricos
    const cleanCep = cep.replace(/\D/g, '')
    
    // Atualiza o CEP no estado
    handleInputChange('cep', cep)
    
    // Se o CEP tem 8 dígitos, busca o endereço
    if (cleanCep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
        const data = await response.json()
        
        if (!data.erro) {
          handleInputChange('cidade', data.localidade)
          handleInputChange('estado', data.uf)
          handleInputChange('bairro', data.bairro)
          if (data.logradouro) {
            handleInputChange('enderecoEmpresa', data.logradouro)
          }
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch(`/api/advertiser/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...advertiser,
          statusCadastro: 'Completo'
        })
      })

      if (res.ok) {
        const result = await res.json()
        setSuccess(true)
        
        // Atualizar contexto do usuário com os dados mais recentes
        updateUser({
          ...advertiser,
          statusCadastro: 'Completo'
        })
        
        // Usar URL real do anúncio retornada pela API
        if (result.anuncio?.url) {
          setAnuncioUrl(`https://gfauto.vercel.app${result.anuncio.url}`)
        } else {
          // Fallback para URL provisória
          setAnuncioUrl('https://gfauto.vercel.app/resultados?cidade=' + encodeURIComponent(advertiser.cidade || '') + '&especialidade=' + encodeURIComponent(advertiser.especialidade || ''))
        }
        
        // Remover redirecionamento automático - deixar usuário escolher
      } else {
        console.error('Erro ao finalizar cadastro')
        alert('Erro ao publicar anúncio. Tente novamente.')
      }
    } catch (err) {
      console.error('Erro ao salvar:', err)
      alert('Erro ao publicar anúncio. Verifique sua conexão e tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  const isPremium = advertiser.planoEscolhido?.toLowerCase().includes('premium')
  const displayName = advertiser.usarNomeFantasia ? advertiser.nomeFantasia : advertiser.nomeRazaoSocial

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-lg mx-4">
          <img 
            src="/images/fluxo_app/mc4.png" 
            alt="Sucesso" 
            className="mx-auto mb-4"
            width="180"
            height="192"
          />
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Parabéns! Seu anúncio foi publicado com sucesso!
          </h2>
          <p className="text-gray-600 mb-6">
            Seu anúncio já está disponível para visualização na página de resultados
          </p>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">📍 Veja como os anúncios aparecem na página de resultados</h3>
              <p className="text-sm text-blue-700 mb-3">
                Seu anúncio aparecerá de forma destacada nos resultados de busca
              </p>
              <button 
                onClick={() => window.open('/planos', '_blank')}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Ver Página de Resultados (Modelo)
              </button>
            </div>
            
            {anuncioUrl && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">🎯 Seu anúncio específico</h3>
                <p className="text-sm text-green-700 mb-3">
                  Link direto para encontrar seu anúncio nos resultados
                </p>
                <button 
                  onClick={() => window.open(anuncioUrl, '_blank')}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  Ver Meu Anúncio nos Resultados
                </button>
              </div>
            )}
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="font-semibold text-red-800 mb-2">⚙️ Painel de Controle</h3>
              <p className="text-sm text-red-700 mb-3">
                Gerencie seu anúncio, visualize estatísticas e atualize informações
              </p>
              <button 
                onClick={() => router.push('/painel')}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Acessar Painel de Controle
              </button>
            </div>
            
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">📧 Verificamos seu e-mail:</p>
              <p className="text-xs text-gray-800 font-mono break-all">
                {advertiser.email}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Enviamos uma confirmação com todas as informações do seu anúncio.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dados do cadastro...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Conclusão do Cadastro</h1>
          <p className="text-gray-600">
            Veja abaixo uma Prévia do Seu Anúncio em tempo Real
          </p>
          <div className="mt-2">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              isPremium ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
            }`}>
              Plano {advertiser.planoEscolhido}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-700 mb-3">Dados do Responsável (já cadastrados)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={advertiser.nomeResponsavel || ''}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                    placeholder={advertiser.nomeResponsavel ? '' : 'Nome do responsável'}
                  />
                  <input
                    type="text"
                    value={advertiser.cpf || ''}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                    placeholder={advertiser.cpf ? '' : 'CPF'}
                  />
                  <input
                    type="email"
                    value={advertiser.email || ''}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                    placeholder={advertiser.email ? '' : 'E-mail'}
                  />
                  <input
                    type="text"
                    value={advertiser.celContato || ''}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                    placeholder={advertiser.celContato ? '' : 'Celular'}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Dados da Empresa
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Razão Social
                    </label>
                    <input
                      type="text"
                      value={advertiser.nomeRazaoSocial || ''}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('nomeRazaoSocial', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Nome oficial da empresa"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Fantasia
                    </label>
                    <input
                      type="text"
                      value={advertiser.nomeFantasia || ''}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('nomeFantasia', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Nome comercial da empresa"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CNPJ
                    </label>
                    <InputMask
                      mask="99.999.999/9999-99"
                      value={advertiser.cnpj || ''}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('cnpj', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="00.000.000/0000-00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Especialidade
                    </label>
                    <input
                      type="text"
                      value={advertiser.especialidade || ''}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('especialidade', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Ex: Mecânica, Elétrica, Pintura..."
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome que aparecerá no anúncio
                  </label>
                  <div className="flex items-center space-x-4 mb-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={advertiser.usarNomeFantasia}
                        onChange={() => handleInputChange('usarNomeFantasia', true)}
                        className="mr-2"
                      />
                      Nome Fantasia
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={!advertiser.usarNomeFantasia}
                        onChange={() => handleInputChange('usarNomeFantasia', false)}
                        className="mr-2"
                      />
                      Razão Social
                    </label>
                  </div>
                  <input
                    type="text"
                    value={displayName || ''}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                    placeholder="Nome que será exibido"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700">Endereço da Empresa</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CEP
                      </label>
                      <InputMask
                        mask="99999-999"
                        value={advertiser.cep || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleCepChange(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="CEP (preenchimento automático)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cidade
                      </label>
                      <input
                        type="text"
                        value={advertiser.cidade || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('cidade', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Cidade"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estado (UF)
                      </label>
                      <input
                        type="text"
                        value={advertiser.estado || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('estado', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Estado (UF)"
                        maxLength={2}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rua e Número
                      </label>
                      <input
                        type="text"
                        value={advertiser.enderecoEmpresa || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('enderecoEmpresa', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Rua, número"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bairro
                      </label>
                      <input
                        type="text"
                        value={advertiser.bairro || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('bairro', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Bairro"
                        required
                      />
                    </div>
                  </div>
                </div>

                {isPremium && (
                  <div className="bg-yellow-50 p-4 rounded-lg space-y-4">
                    <h3 className="font-medium text-yellow-800">Recursos Premium</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slogan
                      </label>
                      <input
                        type="text"
                        value={advertiser.slogan || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('slogan', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Frase de destaque da empresa"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição
                      </label>
                      <textarea
                        value={advertiser.descricao || ''}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange('descricao', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 h-24"
                        placeholder="Descreva os serviços da empresa"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Segundo Celular (opcional)
                      </label>
                      <InputMask
                        mask="(99) 99999-9999"
                        value={advertiser.celContato2 || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('celContato2', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="(00) 00000-0000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Imagem/Logo da Empresa
                      </label>
                      <div className="space-y-3">
                        {advertiser.imagemUrl ? (
                          <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                            <div className="text-center">
                              <div className="flex items-center justify-center mb-2">
                                <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-green-800 font-medium">Imagem carregada com sucesso!</span>
                              </div>
                              <p className="text-sm text-green-700 mb-3">
                                Sua imagem aparecerá na prévia do anúncio abaixo.
                              </p>
                              <button
                                type="button"
                                onClick={() => handleInputChange('imagemUrl', '')}
                                className="text-red-600 hover:text-red-800 text-sm underline"
                              >
                                Alterar imagem
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300 text-center hover:border-red-400 transition-colors">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="mt-2 text-sm text-gray-600">
                              Nenhuma imagem selecionada
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG até 5MB
                            </p>
                          </div>
                        )}
                        
                        <div className="space-y-3">
                          <label className="block">
                            <span className="sr-only">Escolher arquivo de imagem</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  // Verificar tamanho do arquivo (5MB = 5 * 1024 * 1024 bytes)
                                  if (file.size > 5 * 1024 * 1024) {
                                    alert('Arquivo muito grande! O tamanho máximo é 5MB.')
                                    return
                                  }
                                  
                                  // Verificar tipo do arquivo
                                  if (!file.type.startsWith('image/')) {
                                    alert('Por favor, selecione apenas arquivos de imagem.')
                                    return
                                  }
                                  
                                  // Criar URL temporária para preview
                                  const tempUrl = URL.createObjectURL(file)
                                  handleInputChange('imagemUrl', tempUrl)
                                }
                              }}
                              className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-3 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100
                                file:cursor-pointer cursor-pointer
                                border border-gray-300 rounded-lg
                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </label>
                          
                          <p className="text-xs text-gray-500 text-center">
                            📸 Formatos aceitos: PNG, JPG, JPEG | Tamanho máximo: 5MB
                          </p>
                          
                          {advertiser.imagemUrl && (
                            <div className="mt-3 text-center">
                              <p className="text-sm text-green-600 mb-2">✅ Imagem carregada com sucesso!</p>
                              <button
                                type="button"
                                onClick={() => handleInputChange('imagemUrl', '')}
                                className="text-sm text-red-600 hover:text-red-800 underline"
                              >
                                🗑️ Remover imagem
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Seu Cargo na Empresa
                      </label>
                      <input
                        type="text"
                        value={advertiser.cargo || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('cargo', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Ex: Proprietário, Gerente, Diretor..."
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 font-medium disabled:opacity-50"
              >
                {saving ? 'Publicando Anúncio...' : 'Publicar Anúncio'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Prévia do seu Anúncio
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Veja como seu anúncio aparecerá na página de resultados
            </p>

            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {advertiser.imagemUrl && isPremium ? (
                    <img
                      src={advertiser.imagemUrl}
                      alt="Logo da empresa"
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg border flex items-center justify-center">
                      {isPremium ? (
                        <span className="text-xs text-gray-500 text-center">
                          Logo<br />Empresa
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">
                          Cortesia
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 text-center">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {displayName || 'Nome da Empresa'}
                  </h3>

                  {advertiser.slogan && isPremium && (
                    <p className="text-sm text-gray-600 italic mb-2">
                      "{advertiser.slogan}"
                    </p>
                  )}

                  {advertiser.descricao && isPremium && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                      {advertiser.descricao}
                    </p>
                  )}

                  <div className="flex flex-wrap justify-center gap-2 text-sm mb-3">
                    {advertiser.celContato && (
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded">
                        📱 {advertiser.celContato}
                      </span>
                    )}
                    {advertiser.celContato2 && isPremium && (
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded">
                        📱 {advertiser.celContato2}
                      </span>
                    )}
                  </div>

                  {(advertiser.enderecoEmpresa || advertiser.cidade) && (
                    <p className="text-sm text-gray-500">
                      📍 {advertiser.enderecoEmpresa && `${advertiser.enderecoEmpresa}, `}
                      {advertiser.bairro && `${advertiser.bairro}, `}
                      {advertiser.cidade && advertiser.estado && `${advertiser.cidade}/${advertiser.estado}`}
                    </p>
                  )}
                </div>

                <div className="flex-shrink-0 flex flex-col gap-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600">
                    Localizar no Mapa
                  </button>
                  <button className="bg-gray-500 text-white px-3 py-1 rounded text-xs hover:bg-gray-600">
                    Atualizar Dados
                  </button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600">
                    Contato
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
