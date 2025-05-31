export default function LoadingResults() {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Coluna da Esquerda - Imagem */}
            <div className="bg-gray-200 h-48 md:h-64"></div>
            
            {/* Coluna do Centro - Descrição */}
            <div className="p-4">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
              
              <div className="space-y-2 mt-6">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
            
            {/* Coluna da Direita - Mapa e Ações */}
            <div className="p-4 bg-gray-50">
              <div className="h-32 bg-gray-200 mb-4"></div>
              
              <div className="space-y-2">
                <div className="h-10 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
