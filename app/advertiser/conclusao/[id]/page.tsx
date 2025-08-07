'use client'

// Teste de commit via VCS - 07/08/2025
import { useEffect, useState, ChangeEvent } from 'react'
import { useParams, useRouter } from 'next/navigation'
import InputMask from 'react-input-mask'

interface AdvertiserData {
  id: string
  email: string
  cpf: string
  nome: string
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
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [advertiser, setAdvertiser] = useState<AdvertiserData>({
    id: '',
    email: '',
    cpf: '',
    nome: '',
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
        router.push('/painel')
      } else {
        console.error('Erro ao finalizar cadastro')
      }
    } catch (err) {
      console.error('Erro ao salvar:', err)
    } finally {
      setSaving(false)
    }
  }

  const isPremium = advertiser.planoEscolhido?.toLowerCase().includes('premium')
  const displayName = advertiser.usarNomeFantasia ? advertiser.nomeFantasia : advertiser.nomeRazaoSocial

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
            Complete seus dados e veja como seu anúncio ficará em tempo real
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
            <h2 className="text-xl font-semibold mb-6 text-gray-900">
              Dados da Empresa
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-700 mb-3">Dados do Responsável (já cadastrados)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={advertiser.nome}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                    placeholder="Nome do responsável"
                  />
                  <input
                    type="text"
                    value={advertiser.cpf}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                    placeholder="CPF"
                  />
                  <input
                    type="email"
                    value={advertiser.email}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                    placeholder="E-mail"
                  />
                  <input
                    type="text"
                    value={advertiser.celContato}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                    placeholder="Celular"
                  />
                </div>
              </div>

              <div className="space-y-4">
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
                    <div className="md:col-span-2">
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <InputMask
                        mask="99999-999"
                        value={advertiser.cep || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('cep', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="CEP"
                      />
                    </div>
                    <div>
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
                      <input
                        type="url"
                        value={advertiser.imagemUrl || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('imagemUrl', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="URL da imagem ou logo"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Cole a URL de uma imagem hospedada online
                      </p>
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
              Preview do Anúncio
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

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {displayName || 'Nome da Empresa'}
                  </h3>
                  
                  {advertiser.especialidade && (
                    <p className="text-sm text-red-600 font-medium mb-2">
                      {advertiser.especialidade}
                    </p>
                  )}

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

                  {(advertiser.enderecoEmpresa || advertiser.cidade) && (
                    <p className="text-sm text-gray-500 mb-2">
                      📍 {advertiser.enderecoEmpresa && `${advertiser.enderecoEmpresa}, `}
                      {advertiser.bairro && `${advertiser.bairro}, `}
                      {advertiser.cidade && advertiser.estado && `${advertiser.cidade}/${advertiser.estado}`}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 text-sm">
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
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">
                <strong>Plano:</strong> {advertiser.planoEscolhido}
              </p>
              <p className="text-xs text-gray-600">
                <strong>Recursos:</strong> {isPremium ? 
                  'Logo, slogan, descrição, contatos extras' : 
                  'Nome, especialidade, endereço, contato'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
