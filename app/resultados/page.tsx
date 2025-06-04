// Caminho: GFauto/app/resultados/page.tsx
import { Metadata } from 'next';
import { prisma } from '../../lib/prisma';
import ResultadosList from '../../fluxo_visitante/components/visitante/ResultadosList';
import LoadingResults from '../../fluxo_visitante/components/visitante/LoadingResults';

export const metadata: Metadata = {
  title: 'Resultados da Busca | GFauto',
  description: 'Resultados da sua busca por serviços automotivos.',
};

export default async function ResultadosPage({
  searchParams,
}: {
  searchParams: { cidade_id: string; especialidade_id: string; page?: string };
}) {
  const { cidade_id, especialidade_id, page = '1' } = searchParams;

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Resultados da Busca
        </h1>
        <Suspense fallback={<LoadingResults />}>
          <ResultadosList 
            cidadeId={cidade_id}
            especialidadeId={especialidade_id}
            page={parseInt(page)}
          />
        </Suspense>
      </div>
    </main>
  );
}