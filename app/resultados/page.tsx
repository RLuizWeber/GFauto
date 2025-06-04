// Caminho: /app/resultados/page.tsx
import { Suspense } from 'react';
import ResultadosList from '@/components/visitante/ResultadosList';

// Função para buscar ID do estado pela sigla ou nome
async function buscarEstadoId(estadoTexto: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/estados`);
    if (!response.ok) {
      throw new Error('Falha ao buscar estados');
    }
    const estados = await response.json();
    
    const estadoLowerCase = estadoTexto.toLowerCase();
    const estado = estados.find(
      (e: any) => 
        e.nome.toLowerCase().includes(estadoLowerCase) || 
        e.sigla.toLowerCase().includes(estadoLowerCase)
    );
    
    return estado?.id || null;
  } catch (error) {
    console.error('Erro ao buscar estado:', error);
    return null;
  }
}

// Função para buscar ID da cidade pelo nome
async function buscarCidadeId(cidadeTexto: string, estadoId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cidades?estado_id=${estadoId}`);
    if (!response.ok) {
      throw new Error('Falha ao buscar cidades');
    }
    const cidades = await response.json();
    
    const cidadeLowerCase = cidadeTexto.toLowerCase();
    const cidade = cidades.find(
      (c: any) => c.nome.toLowerCase().includes(cidadeLowerCase)
    );
    
    return cidade?.id || null;
  } catch (error) {
    console.error('Erro ao buscar cidade:', error);
    return null;
  }
}

// Função para buscar ID da especialidade pelo nome
async function buscarEspecialidadeId(especialidadeTexto: string, cidadeId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/especialidades?cidade_id=${cidadeId}`);
    if (!response.ok) {
      throw new Error('Falha ao buscar especialidades');
    }
    const especialidades = await response.json();
    
    const especialidadeLowerCase = especialidadeTexto.toLowerCase();
    const especialidade = especialidades.find(
      (e: any) => e.nome.toLowerCase().includes(especialidadeLowerCase)
    );
    
    return especialidade?.id || null;
  } catch (error) {
    console.error('Erro ao buscar especialidade:', error);
    return null;
  }
}

export default async function ResultadosPage({ 
  searchParams 
}: { 
  searchParams: { 
    cidade_id?: string; 
    especialidade_id?: string;
    estado?: string;
    cidade?: string;
    especialidade?: string;
    page?: string;
  } 
}) {
  let { cidade_id, especialidade_id, estado, cidade, especialidade, page = '1' } = searchParams;
  
  // Se temos os parâmetros de texto, mas não os IDs, tentamos buscar os IDs
  if (!cidade_id && !especialidade_id && estado && cidade && especialidade) {
    const estadoId = await buscarEstadoId(estado);
    if (estadoId) {
      cidade_id = await buscarCidadeId(cidade, estadoId);
      if (cidade_id) {
        especialidade_id = await buscarEspecialidadeId(especialidade, cidade_id);
      }
    }
  }
  
  // Filtros aplicados para exibição
  const filtros = [];
  if (estado) filtros.push(`Estado: ${estado}`);
  if (cidade) filtros.push(`Cidade: ${cidade}`);
  if (especialidade) filtros.push(`Especialidade: ${especialidade}`);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Resultados da Busca</h1>
      
      {filtros.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-medium mb-2">Filtros aplicados:</h2>
          <div className="flex flex-wrap gap-2">
            {filtros.map((filtro, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {filtro}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <Suspense fallback={<div>Carregando resultados...</div>}>
        {cidade_id && especialidade_id ? (
          <ResultadosList 
            cidadeId={cidade_id} 
            especialidadeId={especialidade_id} 
            page={parseInt(page)} 
          />
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
            <p>Não foi possível encontrar resultados para esta busca.</p>
            <p className="mt-2">Por favor, verifique os termos da busca e tente novamente.</p>
          </div>
        )}
      </Suspense>
    </div>
  );
}
