// Caminho: /components/visitante/BuscaForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Interfaces para tipagem
interface EstadoItem {
  id: string;
  nome: string;
  sigla: string;
}

interface CidadeItem {
  id: string;
  nome: string;
}

// Componente BuscaForm para a página inicial
export default function BuscaForm() {
  const router = useRouter();
  
  // Estados para armazenar os valores dos campos
  const [estado, setEstado] = useState<string>('');
  const [cidade, setCidade] = useState<string>('');
  const [especialidade, setEspecialidade] = useState<string>('');
  
  // Estados para sugestões de autocompletar
  const [estadosSugestoes, setEstadosSugestoes] = useState<EstadoItem[]>([]);
  const [cidadesSugestoes, setCidadesSugestoes] = useState<CidadeItem[]>([]);
  
  // Estados para controle de carregamento e erros
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Função para buscar sugestões de estados com base no texto digitado
  const buscarEstados = async (texto: string): Promise<void> => {
    if (!texto || texto.length < 2) {
      setEstadosSugestoes([]);
      return;
    }
    
    try {
      setLoading(true);
      
      // Em um ambiente real, isso seria uma chamada à API
      // Simulando uma lista de estados para demonstração
      const estadosSimulados: EstadoItem[] = [
        { id: 'rs', nome: 'Rio Grande do Sul', sigla: 'RS' },
        { id: 'sc', nome: 'Santa Catarina', sigla: 'SC' },
        { id: 'pr', nome: 'Paraná', sigla: 'PR' },
        { id: 'sp', nome: 'São Paulo', sigla: 'SP' },
        { id: 'rj', nome: 'Rio de Janeiro', sigla: 'RJ' },
        { id: 'mg', nome: 'Minas Gerais', sigla: 'MG' },
      ];
      
      // Filtra estados que correspondem ao texto digitado (nome ou sigla)
      const sugestoes = estadosSimulados.filter(estado => 
        estado.nome.toLowerCase().includes(texto.toLowerCase()) || 
        estado.sigla.toLowerCase().includes(texto.toLowerCase())
      );
      
      setEstadosSugestoes(sugestoes);
      
    } catch (err) {
      console.error('Erro ao buscar estados:', err);
      setError('Não foi possível carregar sugestões de estados. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  
  // Função para buscar sugestões de cidades com base no texto digitado e estado selecionado
  const buscarCidades = async (texto: string, estadoSelecionado: string): Promise<void> => {
    if (!texto || texto.length < 2 || !estadoSelecionado) {
      setCidadesSugestoes([]);
      return;
    }
    
    try {
      setLoading(true);
      
      // Em um ambiente real, isso seria uma chamada à API
      // Simulando uma lista de cidades para demonstração
      const cidadesSimuladas: Record<string, CidadeItem[]> = {
        'Rio Grande do Sul': [
          { id: 'pf', nome: 'Passo Fundo' },
          { id: 'poa', nome: 'Porto Alegre' },
          { id: 'sm', nome: 'Santa Maria' },
          { id: 'pel', nome: 'Pelotas' },
        ],
        'Santa Catarina': [
          { id: 'fln', nome: 'Florianópolis' },
          { id: 'jvl', nome: 'Joinville' },
          { id: 'bln', nome: 'Blumenau' },
        ],
        'São Paulo': [
          { id: 'sp', nome: 'São Paulo' },
          { id: 'cps', nome: 'Campinas' },
          { id: 'sto', nome: 'Santos' },
        ]
      };
      
      // Obtém as cidades do estado selecionado
      const cidadesDoEstado = cidadesSimuladas[estadoSelecionado] || [];
      
      // Filtra cidades que correspondem ao texto digitado
      const sugestoes = cidadesDoEstado.filter(cidade => 
        cidade.nome.toLowerCase().includes(texto.toLowerCase())
      );
      
      setCidadesSugestoes(sugestoes);
      
    } catch (err) {
      console.error('Erro ao buscar cidades:', err);
      setError('Não foi possível carregar sugestões de cidades. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  
  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (!estado || !cidade || !especialidade) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    // Redirecionar para a página de resultados com os parâmetros informados
    router.push(`/resultados?estado=${encodeURIComponent(estado)}&cidade=${encodeURIComponent(cidade)}&especialidade=${encodeURIComponent(especialidade)}`);
  };
  
  // Efeito para limpar cidades quando o estado mudar
  useEffect(() => {
    setCidade('');
    setCidadesSugestoes([]);
  }, [estado]);
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}
      
      <div>
        <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
          Informe o Estado
        </label>
        <input
          type="text"
          id="estado"
          value={estado}
          onChange={(e) => {
            setEstado(e.target.value);
            buscarEstados(e.target.value);
          }}
          placeholder="Digite o nome ou sigla do estado"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {estadosSugestoes.length > 0 && (
          <div className="mt-1 border border-gray-300 rounded-md shadow-sm bg-white max-h-40 overflow-y-auto">
            {estadosSugestoes.map((estadoItem) => (
              <div 
                key={estadoItem.id}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setEstado(estadoItem.nome);
                  setEstadosSugestoes([]);
                }}
              >
                {estadoItem.nome} ({estadoItem.sigla})
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div>
        <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-1">
          Informe a Cidade
        </label>
        <input
          type="text"
          id="cidade"
          value={cidade}
          onChange={(e) => {
            setCidade(e.target.value);
            buscarCidades(e.target.value, estado);
          }}
          placeholder="Digite o nome da cidade"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          disabled={!estado}
        />
        {cidadesSugestoes.length > 0 && (
          <div className="mt-1 border border-gray-300 rounded-md shadow-sm bg-white max-h-40 overflow-y-auto">
            {cidadesSugestoes.map((cidadeItem) => (
              <div 
                key={cidadeItem.id}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setCidade(cidadeItem.nome);
                  setCidadesSugestoes([]);
                }}
              >
                {cidadeItem.nome}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div>
        <label htmlFor="especialidade" className="block text-sm font-medium text-gray-700 mb-1">
          O que procura?
        </label>
        <input
          type="text"
          id="especialidade"
          value={especialidade}
          onChange={(e) => setEspecialidade(e.target.value)}
          placeholder="Ex.: Auto Elétrica, Mecânica, Funilaria, Farol quebrado, etc."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          disabled={!cidade}
        />
      </div>
      
      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          disabled={loading || !estado || !cidade || !especialidade}
        >
          {loading ? 'Carregando...' : 'Buscar Serviços'}
        </button>
      </div>
    </form>
  );
}
