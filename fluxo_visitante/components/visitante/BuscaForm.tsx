'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Estado {
  id: number;
  nome: string;
  sigla: string;
}

interface Cidade {
  id: number;
  nome: string;
}

interface Especialidade {
  id: number;
  nome: string;
  slug: string;
  icone?: string;
}

export default function BuscaForm() {
  const router = useRouter();
  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
  const [estadoId, setEstadoId] = useState<string>('');
  const [cidadeId, setCidadeId] = useState<string>('');
  const [especialidadeId, setEspecialidadeId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  // Buscar estados ao carregar o componente
  useEffect(() => {
    const fetchEstados = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/estados');
        const data = await response.json();
        setEstados(data);
      } catch (error) {
        console.error('Erro ao buscar estados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEstados();
  }, []);

  // Buscar cidades quando o estado for selecionado
  useEffect(() => {
    if (!estadoId) return;
    
    const fetchCidades = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/cidades?estado_id=${estadoId}`);
        const data = await response.json();
        setCidades(data);
        setCidadeId('');
        setEspecialidadeId('');
        setEspecialidades([]);
        setStep(2);
      } catch (error) {
        console.error('Erro ao buscar cidades:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCidades();
  }, [estadoId]);

  // Buscar especialidades quando a cidade for selecionada
  useEffect(() => {
    if (!cidadeId) return;
    
    const fetchEspecialidades = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/especialidades?cidade_id=${cidadeId}`);
        const data = await response.json();
        setEspecialidades(data);
        setEspecialidadeId('');
        setStep(3);
      } catch (error) {
        console.error('Erro ao buscar especialidades:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEspecialidades();
  }, [cidadeId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!estadoId || !cidadeId || !especialidadeId) {
      alert('Por favor, preencha todos os campos');
      return;
    }
    
    // Redirecionar para a página de resultados
    router.push(`/resultados?cidade_id=${cidadeId}&especialidade_id=${especialidadeId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" id="busca">
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
            Informe o Estado
          </label>
          <select
            id="estado"
            value={estadoId}
            onChange={(e) => setEstadoId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
            required
          >
            <option value="">Selecione o estado</option>
            {estados.map((estado) => (
              <option key={estado.id} value={estado.id}>
                {estado.nome}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-1">
            Informe a Cidade
          </label>
          <select
            id="cidade"
            value={cidadeId}
            onChange={(e) => setCidadeId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            disabled={!estadoId || loading || step < 2}
            required
          >
            <option value="">Selecione a cidade</option>
            {cidades.map((cidade) => (
              <option key={cidade.id} value={cidade.id}>
                {cidade.nome}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="especialidade" className="block text-sm font-medium text-gray-700 mb-1">
            O que procura?
          </label>
          <select
            id="especialidade"
            value={especialidadeId}
            onChange={(e) => setEspecialidadeId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            disabled={!cidadeId || loading || step < 3}
            required
          >
            <option value="">Selecione o serviço</option>
            {especialidades.map((especialidade) => (
              <option key={especialidade.id} value={especialidade.id}>
                {especialidade.nome}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          disabled={!estadoId || !cidadeId || !especialidadeId || loading}
        >
          {loading ? 'Carregando...' : 'Buscar Serviços'}
        </button>
      </div>
    </form>
  );
}
