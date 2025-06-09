// Caminho Novo: /fluxo_visitante/components/visitante/HeroSection.tsx
'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="relative bg-blue-600 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Encontre os melhores serviços automotivos
            </h1>
            <p className="text-xl mb-6">
              Conectamos você aos melhores profissionais e lojas de autopeças da sua região.
            </p>
            <div className="flex flex-col gap-4">
              {/* Busca rápida e fácil */}
              <div className="flex items-center">
                <div className="bg-white rounded-lg p-2 mr-3 shadow-md">
                  <img 
                    src=""/GFauto/public/images/fluxo_visitante/mc4.png" 
                    alt="Busca rápida e fácil" 
                    className="w-12 h-9 object-cover rounded"
                  />
                </div>
                <span className="text-lg font-medium">Busca rápida e fácil</span>
              </div>
              
              {/* Serviços confiáveis */}
              <div className="flex items-center">
                <div className="bg-white rounded-lg p-2 mr-3 shadow-md">
                  <img 
                    src="/GFauto/public/images/fluxo_visitante/logo_gf.png" 
                    alt="Serviços confiáveis" 
                    className="w-12 h-9 object-cover rounded"
                  />
                </div>
                <span className="text-lg font-medium">Serviços confiáveis</span>
              </div>
              
              {/* Contato direto */}
              <div className="flex items-center">
                <div className="bg-white rounded-lg p-2 mr-3 shadow-md">
                  <img 
                    src="/GFauto/public/images/fluxo_visitante/image001.jpg" 
                    alt="Contato direto" 
                    className="w-12 h-9 object-cover rounded"
                  />
                </div>
                <span className="text-lg font-medium">Contato direto</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-video">
              <div className="absolute inset-0 bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="relative w-full h-full">
                  {/* Imagem ilustrativa principal */}
                  <img 
                    src="/images/fluxo_visitante/logo_gf.png" 
                    alt="GFauto - Serviços Automotivos" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
