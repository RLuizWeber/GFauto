// Caminho: /GFauto/app/resultados/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import ResultadosList from '../../components/visitante/ResultadosList';
import LoadingResults from '../../components/visitante/LoadingResults';
import { useState, useEffect } from "react";

export default function ResultadosPage() {
  const searchParams = useSearchParams();
  const estado = searchParams.get("estado");
  const cidade = searchParams.get("cidade");
  const especialidade = searchParams.get("especialidade");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula um tempo de carregamento para mostrar o componente de loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingResults />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Resultados da Busca</h1>
      <div className="mb-4">
        <p className="text-gray-600">
          Filtros aplicados: {estado && `Estado: ${estado}`}{" "}
          {cidade && `| Cidade: ${cidade}`}{" "}
          {especialidade && `| Especialidade: ${especialidade}`}
        </p>
      </div>
      <ResultadosList
        estado={estado}
        cidade={cidade}
        especialidade={especialidade}
      />
    </div>
  );
}
