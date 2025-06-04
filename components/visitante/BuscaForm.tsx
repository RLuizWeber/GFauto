// Caminho: /fluxo_visitante/components/visitante/BuscaForm.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
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

interface EspecialidadeItem {
  id: string;
  nome: string;
}

// Componente BuscaForm para a página inicial
export default function BuscaForm() {
  const router = useRouter();
  
  // Estados para armazenar os dados
  const [estados, setEstados] = useState<EstadoItem[]>([]);
  const [cidades, setCidades] = useState<CidadeItem[]>([]);
  const [especialidades, setEspecialidades] = useState<EspecialidadeItem[]>([]);
  
  // Estados para os valores digitados pelo usuário
  const [estado, setEstado] = useState<string>('');
  const [cidade, setCidade] = useState<string>('');
  const [especialidade, setEspecialidade] = useState<string>('');
  
  // Estados para os IDs selecionados
  const [estadoId, setEstadoId] = useState<string>('');
  const [cidadeId, setCidadeId] = useState<string>('');
  const [especialidadeId, setEspecialidadeId] = useState<string>('');
  
  // Estados para as sugestões
  const [estadosSugestoes, setEstadosSugestoes] = useState<EstadoItem[]>([]);
  const [cidadesSugestoes, setCidadesSugestoes] = useState<CidadeItem[]>([]);
  const [especialidadesSugestoes, setEspecialidadesSugestoes] = useState<EspecialidadeItem[]>([]);
  
  // Estados para controle de exibição das sugestões
  const [mostrarEstadosSugestoes, setMostrarEstadosSugestoes] = useState<boolean>(false);
  const [mostrarCidadesSugestoes, setMostrarCidadesSugestoes] = useState<boolean>(false);
  const [mostrarEspecialidadesSugestoes, setMostrarEspecialidadesSugestoes] = useState<boolean>(false);
  
  // Estados para carregamento e erro
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Refs para os campos de input
  const estadoInputRef = useRef<HTMLInputElement>(null);
  const cidadeInputRef = useRef<HTMLInputElement>(null);
  const especialidadeInputRef = useRef<HTMLInputElement>(null);

  // Buscar todos os estados ao carregar o componente
  useEffect(() => {
    const fetchEstados = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch('/api/estados');
        if (!response.ok) {
          throw new Error('Falha ao buscar estados');
        }
        const data = await response.json();
        setEstados(data);
      } catch (err) {
        console.error('Erro ao buscar estados:', err);
        setError('Não foi possível carregar os estados. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchEstados();
  }, []);

  // Função para buscar estados com base no texto digitado
  const buscarEstados = async (texto: string): Promise<void> => {
    if (!texto.trim()) {
      setEstadosSugestoes([]);
      return;
    }
    
    const textoLowerCase = texto.toLowerCase();
    const sugestoes = estados.filter(
      estado => 
        estado.nome.toLowerCase().includes(textoLowerCase) || 
        estado.sigla.toLowerCase().includes(textoLowerCase)
    );
    
    setEstadosSugestoes(sugestoes);
    setMostrarEstadosSugestoes(true);
  };

  // Função para buscar cidades com base no texto digitado e estado selecionado
  const buscarCidades = async (texto: string): Promise<void> => {
    if (!estadoId || !texto.trim()) {
      setCidadesSugestoes([]);
      return;
    }
    
    try {
      setLoading(true);
      const response = await fetch(`/api/cidades?estado_id=${estadoId}`);
      if (!response.ok) {
        throw new Error('Falha ao buscar cidades');
      }
      
      const data = await response.json();
      setCidades(data);
      
      const textoLowerCase = texto.toLowerCase();
      const sugestoes = data.filter(
        cidade => cidade.nome.toLowerCase().includes(textoLowerCase)
      );
      
      setCidadesSugestoes(sugestoes);
      setMostrarCidadesSugestoes(true);
    } catch (err) {
      console.error('Erro ao buscar cidades:', err);
      setError('Não foi possível carregar as cidades. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar especialidades com base no texto digitado e cidade selecionada
  const buscarEspecialidades = async (texto: string): Promise<void> => {
    if (!cidadeId || !texto.trim()) {
      setEspecialidadesSugestoes([]);
      return;
    }
    
    try {
      setLoading(true);
      const response = await fetch(`/api/especialidades?cidade_id=${cidadeId}`);
      if (!response.ok) {
        throw new Error('Falha ao buscar especialidades');
      }
      
      const data = await response.json();
      setEspecialidades(data);
      
      const textoLowerCase = texto.toLowerCase();
      const sugestoes = data.filter(
        especialidade => especialidade.nome.toLowerCase().includes(textoLowerCase)
      );
      
      setEspecialidadesSugestoes(sugestoes);
      setMostrarEspecialidadesSugestoes(true);
    } catch (err) {
      console.error('Erro ao buscar especialidades:', err);
      setError('Não foi possível carregar as especialidades. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Função para selecionar um estado da lista de sugestões
  const selecionarEstado = (estadoSelecionado: EstadoItem): void => {
    setEstado(estadoSelecionado.sigla + ' - ' + estadoSelecionado.nome);
    setEstadoId(estadoSelecionado.id);
    setMostrarEstadosSugestoes(false);
    
    // Limpar campos dependentes
    setCidade('');
    setCidadeId('');
    setEspecialidade('');
    setEspecialidadeId('');
    
    // Focar no próximo campo
    if (cidadeInputRef.current) {
      cidadeInputRef.current.focus();
    }
  };

  // Função para selecionar uma cidade da lista de sugestões
  const selecionarCidade = (cidadeSelecionada: CidadeItem): void => {
    setCidade(cidadeSelecionada.nome);
    setCidadeId(cidadeSelecionada.id);
    setMostrarCidadesSugestoes(false);
    
    // Limpar campos dependentes
    setEspecialidade('');
    setEspecialidadeId('');
    
    // Focar no próximo campo
    if (especialidadeInputRef.current) {
      especialidadeInputRef.current.focus();
    }
  };

  // Função para selecionar uma especialidade da lista de sugestões
  const selecionarEspecialidade = (especialidadeSelecionada: EspecialidadeItem): void => {
    setEspecialidade(especialidadeSelecionada.nome);
    setEspecialidadeId(especialidadeSelecionada.id);
    setMostrarEspecialidadesSugestoes(false);
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    // Validar se os campos necessários foram preenchidos
    if (!estado) {
      setError('Por favor, informe o estado.');
      return;
    }
    
    if (!cidade) {
      setError('Por favor, informe a cidade.');
      return;
    }
    
    if (!especialidade) {
      setError('Por favor, informe o que você procura.');
      return;
    }
    
    // Se temos os IDs, usamos eles para a busca
    if (cidadeId && especialidadeId) {
      router.push(`/resultados?cidade_id=${cidadeId}&especialidade_id=${especialidadeId}`);
    } else {
      // Caso contrário, usamos os textos digitados
      router.push(`/resultados?estado=${encodeURIComponent(estado)}&cidade=${encodeURIComponent(cidade)}&especialidade=${encodeURIComponent(especialidade)}`);
    }
  };

  // Função para fechar as sugestões quando clicar fora delas
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        estadoInputRef.current && 
        !estadoInputRef.current.contains(event.target as Node)
      ) {
        setMostrarEstadosSugestoes(false);
      }
      
      if (
        cidadeInputRef.current && 
        !cidadeInputRef.current.contains(event.target as Node)
      ) {
        setMostrarCidadesSugestoes(false);
      }
      
      if (
        especialidadeInputRef.current && 
        !especialidadeInputRef.current.contains(event.target as Node)
      ) {
        setMostrarEspecialidadesSugestoes(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}
      
      {/* Campo de Estado */}
      <div className="relative">
        <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
          Informe o Estado:
        </label>
        <input
          ref={estadoInputRef}
          id="estado"
          type="text"
          value={estado}
          onChange={(e) => {
            setEstado(e.target.value);
            buscarEstados(e.target.value);
          }}
          onFocus={() => {
            if (estado) buscarEstados(estado);
            setMostrarEstadosSugestoes(true);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Digite o nome ou sigla do estado"
          disabled={loading}
        />
        
        {/* Lista de sugestões de estados */}
        {mostrarEstadosSugestoes && estadosSugestoes.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
            {estadosSugestoes.map((estadoItem) => (
              <li
                key={estadoItem.id}
                onClick={() => selecionarEstado(estadoItem)}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
              >
                {estadoItem.sigla} - {estadoItem.nome}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Campo de Cidade */}
      <div className="relative">
        <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-1">
          Informe a Cidade:
        </label>
        <input
          ref={cidadeInputRef}
          id="cidade"
          type="text"
          value={cidade}
          onChange={(e) => {
            setCidade(e.target.value);
            buscarCidades(e.target.value);
          }}
          onFocus={() => {
            if (cidade) buscarCidades(cidade);
            setMostrarCidadesSugestoes(true);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Digite o nome da cidade"
          disabled={loading || !estadoId}
        />
        
        {/* Lista de sugestões de cidades */}
        {mostrarCidadesSugestoes && cidadesSugestoes.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
            {cidadesSugestoes.map((cidadeItem) => (
              <li
                key={cidadeItem.id}
                onClick={() => selecionarCidade(cidadeItem)}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
              >
                {cidadeItem.nome}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Campo de Especialidade */}
      <div className="relative">
        <label htmlFor="especialidade" className="block text-sm font-medium text-gray-700 mb-1">
          O que procura?
        </label>
        <input
          ref={especialidadeInputRef}
          id="especialidade"
          type="text"
          value={especialidade}
          onChange={(e) => {
            setEspecialidade(e.target.value);
            buscarEspecialidades(e.target.value);
          }}
          onFocus={() => {
            if (especialidade) buscarEspecialidades(especialidade);
            setMostrarEspecialidadesSugestoes(true);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Digite o que você está procurando"
          disabled={loading || !cidadeId}
        />
        
        {/* Lista de sugestões de especialidades */}
        {mostrarEspecialidadesSugestoes && especialidadesSugestoes.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
            {especialidadesSugestoes.map((especialidadeItem) => (
              <li
                key={especialidadeItem.id}
                onClick={() => selecionarEspecialidade(especialidadeItem)}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
              >
                {especialidadeItem.nome}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Botão de Busca */}
      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          disabled={loading}
        >
          {loading ? 'Carregando...' : 'Buscar Serviços'}
        </button>
      </div>
    </form>
  );
}
