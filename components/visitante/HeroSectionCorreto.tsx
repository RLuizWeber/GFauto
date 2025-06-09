// Caminho: /components/visitante/HeroSectionCorreto.tsx
import React from 'react';

const HeroSectionCorreto: React.FC = () => {
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

      {/* Seção com as 3 imagens */}
      <div className="container mx-auto px-4">
        
        {/* Logo GFauto */}
        <div className="text-center mb-8">
          <img 
            src="/images/fluxo_visitante/logo_gf.png" 
            alt="GFauto - Busca rápida e fácil" 
            className="mx-auto h-20 w-auto"
          />
          <p className="text-sm text-gray-600 mt-2">Busca rápida e fácil</p>
        </div>

        {/* Manda Chuva (mc4.png) */}
        <div className="text-center mb-8">
          <img 
            src="/images/fluxo_visitante/mc4.png" 
            alt="Serviços confiáveis" 
            className="mx-auto h-32 w-auto"
          />
          <p className="text-sm text-gray-600 mt-2">Serviços confiáveis</p>
        </div>

        {/* Moto (image001.jpg) */}
        <div className="text-center mb-8">
          <img 
            src="/images/fluxo_visitante/image001.jpg" 
            alt="Contato direto - Imagem ilustrativa" 
            className="mx-auto h-32 w-auto"
          />
          <p className="text-sm text-gray-600 mt-2">Contato direto</p>
          <p className="text-xs text-gray-500">Imagem ilustrativa</p>
        </div>

      </div>

      {/* Mensagem de erro dos estados */}
      <div className="text-center mb-8">
        <p className="text-red-600 text-sm">
          Não foi possível carregar os estados. Por favor, tente novamente.
        </p>
      </div>

      {/* Formulário de busca */}
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-6">
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Informe o Estado:
            </label>
            <input
              type="text"
              placeholder="Digite o nome ou sigla do estado"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Informe a Cidade:
            </label>
            <input
              type="text"
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
              placeholder="Digite o que você está procurando"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
            Buscar Serviços
          </button>

        </div>
      </div>

    </div>
  );
};

export default HeroSectionCorreto;
