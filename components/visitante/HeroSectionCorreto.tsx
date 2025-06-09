// Caminho: /components/visitante/HeroSectionCorreto.tsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const HeroSectionCorreto: React.FC = () => {
  const router = useRouter();
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [loading, setLoading] = useState(false);

  // Lista de estados brasileiros
  const estados = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' }
  ];

  // Especialidades automotivas
  const especialidades = [
    'Auto Elétricas',
    'Auto Peças',
    'Mecânica Geral',
    'Funilaria e Pintura',
    'Pneus e Rodas',
    'Som Automotivo',
    'Ar Condicionado',
    'Vidros Automotivos',
    'Alarmes e Travas',
    'Injeção Eletrônica',
    'Suspensão',
    'Freios',
    'Escapamentos',
    'Radiadores',
    'Baterias',
    'Oficinas Multimarcas'
  ];

  // Função para mapear termos de busca para especialidades
  const mapearEspecialidade = (termo: string): string => {
    const termoLower = termo.toLowerCase();
    
    if (termoLower.includes('farol') || termoLower.includes('luz') || termoLower.includes('elétric')) {
      return 'Auto Elétricas';
    }
    if (termoLower.includes('peça') || termoLower.includes('peças')) {
      return 'Auto Peças';
    }
    if (termoLower.includes('motor') || termoLower.includes('mecânic')) {
      return 'Mecânica Geral';
    }
    if (termoLower.includes('funilaria') || termoLower.includes('pintura') || termoLower.includes('batida')) {
      return 'Funilaria e Pintura';
    }
    if (termoLower.includes('pneu') || termoLower.includes('roda')) {
      return 'Pneus e Rodas';
    }
    if (termoLower.includes('som') || termoLower.includes('áudio')) {
      return 'Som Automotivo';
    }
    if (termoLower.includes('ar condicionado') || termoLower.includes('climatização')) {
      return 'Ar Condicionado';
    }
    
    return termo; // Retorna o termo original se não encontrar mapeamento
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!estado || !cidade || !especialidade) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    // Mapear especialidade se necessário
    const especialidadeMapeada = mapearEspecialidade(especialidade);

    // Construir URL para página de resultados
    const params = new URLSearchParams({
      estado: estado,
      cidade: cidade,
      especialidade: especialidadeMapeada
    });

    // Redirecionar para página de resultados
    router.push(`/resultados?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header com título principal */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Encontre os melhores serviços automotivos
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Conectamos você aos melhores profissionais e lojas de autopeças da sua região.
        </p>
      </div>

      {/* Seção com as 3 imagens - TAMANHO AJUSTADO PARA 180PX */}
      <div className="container mx-auto px-4">
        
        {/* Logo GFauto */}
        <div className="text-center mb-8">
          <img 
            src="/images/fluxo_visitante/logo_gf.png" 
            alt="GFauto - Busca rápida e fácil" 
            className="mx-auto"
            style={{ width: '180px', height: 'auto' }}
          />
          <p className="text-sm text-gray-600 mt-2">Busca rápida e fácil</p>
        </div>

        {/* Manda Chuva (mc4.png) */}
        <div className="text-center mb-8">
          <img 
            src="/images/fluxo_visitante/mc4.png" 
            alt="Serviços confiáveis" 
            className="mx-auto"
            style={{ width: '180px', height: 'auto' }}
          />
          <p className="text-sm text-gray-600 mt-2">Serviços confiáveis</p>
        </div>

        {/* Moto (image001.jpg) */}
        <div className="text-center mb-8">
          <img 
            src="/images/fluxo_visitante/image001.jpg" 
            alt="Contato direto - Imagem ilustrativa" 
            className="mx-auto"
            style={{ width: '180px', height: 'auto' }}
          />
          <p className="text-sm text-gray-600 mt-2">Contato direto</p>
          <p className="text-xs text-gray-500">Imagem ilustrativa</p>
        </div>

      </div>

      {/* Formulário de busca FUNCIONAL */}
      <div className="container mx-auto px-4 max-w-md">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Informe o Estado:
            </label>
            <input
              type="text"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              placeholder="Digite o nome ou sigla do estado"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              list="estados-list"
            />
            <datalist id="estados-list">
              {estados.map((est) => (
                <option key={est.sigla} value={est.sigla}>
                  {est.nome}
                </option>
              ))}
            </datalist>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Informe a Cidade:
            </label>
            <input
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              placeholder="Digite o nome da cidade"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              O que procura?
            </label>
            <input
              type="text"
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
              placeholder="Ex: Auto Elétricas, farol quebrado, mecânica..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              list="especialidades-list"
            />
            <datalist id="especialidades-list">
              {especialidades.map((esp) => (
                <option key={esp} value={esp}>
                  {esp}
                </option>
              ))}
            </datalist>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            {loading ? 'Buscando...' : 'Buscar Serviços'}
          </button>

        </form>
      </div>

    </div>
  );
};

export default HeroSectionCorreto;
