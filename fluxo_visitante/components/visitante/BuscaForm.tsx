// Caminho: /fluxo_visitante/components/visitante/BuscaForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Componente BuscaForm para a página inicial
export default function BuscaForm() {
  const router = useRouter();
  const [estados, setEstados] = useState<any[]>([]);
  const [cidades, setCidades] = useState<any[]>([]);
  const [especialidades, setEspecialidades] = useState<any[]>([]);
  const [estadoId, setEstadoId] = useState<string>('');
  const [cidadeId, setCidadeId] = useState<string>('');
  const [especialidadeId, setEspecialidadeId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Corrigido para aceitar string ou null

  // Buscar estados ao carregar o componente
  useEffect(() => {
    const fetchEstados = async () => {
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

  // Buscar cidades quando o estado for selecionado
  useEffect(() => {
    if (!estadoId) {
      setCidades([]);
      return;
    }

    const fetchCidades = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/cidades?estado_id=${estadoId}`);
        if (!response.ok) {
          throw new Error('Falha ao buscar cidades');
        }
        const data = await response.json();
        setCidades(data);
      } catch (err) {
        console.error('Erro ao buscar cidades:', err);
        setError('Não foi possível carregar as cidades. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchCidades();
  }, [estadoId]);

  // Buscar especialidades quando a cidade for selecionada
  useEffect(() => {
    if (!cidadeId) {
      setEspecialidades([]);
      return;
    }

    const fetchEspecialidades = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/especialidades?cidade_id=${cidadeId}`);
        if (!response.ok) {
          throw new Error('Falha ao buscar especialidades');
        }
        const data = await response.json();
        setEspecialidades(data);
      } catch (err) {
        console.error('Erro ao buscar especialidades:', err);
        setError('Não foi possível carregar as especialidades. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchEspecialidades();
  }, [cidadeId]);

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!cidadeId || !especialidadeId) {
      setError('Por favor, selecione cidade e especialidade.');
      return;
    }
    
    // Redirecionar para a página de resultados com os parâmetros selecionados
    router.push(`/resultados?cidade_id=${cidadeId}&especialidade_id=${especialidadeId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}
      
      <div>
        <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
          Estado
        </label>
        <select
          id="estado"
          value={estadoId}
          onChange={(e) => {
            setEstadoId(e.target.value);
            setCidadeId('');
            setEspecialidadeId('');
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          disabled={loading || estados.length === 0}
        >
          <option value="">Selecione um estado</option>
          {estados.map((estado) => (
            <option key={estado.id} value={estado.id}>
              {estado.nome}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-1">
          Cidade
        </label>
        <select
          id="cidade"
          value={cidadeId}
          onChange={(e) => {
            setCidadeId(e.target.value);
            setEspecialidadeId('');
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          disabled={loading || !estadoId || cidades.length === 0}
        >
          <option value="">Selecione uma cidade</option>
          {cidades.map((cidade) => (
            <option key={cidade.id} value={cidade.id}>
              {cidade.nome}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="especialidade" className="block text-sm font-medium text-gray-700 mb-1">
          Especialidade
        </label>
        <select
          id="especialidade"
          value={especialidadeId}
          onChange={(e) => setEspecialidadeId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          disabled={loading || !cidadeId || especialidades.length === 0}
        >
          <option value="">Selecione uma especialidade</option>
          {especialidades.map((especialidade) => (
            <option key={especialidade.id} value={especialidade.id}>
              {especialidade.nome}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          disabled={loading || !cidadeId || !especialidadeId}
        >
          {loading ? 'Carregando...' : 'Buscar Serviços'}
        </button>
      </div>
    </form>
  );
}