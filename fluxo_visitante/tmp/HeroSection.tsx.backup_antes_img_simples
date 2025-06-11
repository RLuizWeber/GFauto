// Rebuild forçado em 20250608_230426
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
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="bg-white rounded-lg p-2 mr-3 shadow-lg">
                  <Image
                    src="/images/pag_principal/mc4.png"
                    alt="Busca rápida e fácil"
                    width={180}
                    height={135}
                    className="w-24 h-18 object-cover rounded-md"
                    priority
                    unoptimized
                  />
                </div>
                <span className="text-lg font-medium">Busca rápida e fácil</span>
              </div>
              
              <div className="flex items-center">
                <div className="bg-white rounded-lg p-2 mr-3 shadow-lg">
                  <Image
                    src="/images/pag_principal/logo_gf.png"
                    alt="Serviços confiáveis"
                    width={180}
                    height={135}
                    className="w-24 h-18 object-cover rounded-md"
                    priority
                    unoptimized
                  />
                </div>
                <span className="text-lg font-medium">Serviços confiáveis</span>
              </div>
              
              <div className="flex items-center">
                <div className="bg-white rounded-lg p-2 mr-3 shadow-lg">
                  <Image
                    src="/images/pag_principal/image001.jpg"
                    alt="Contato direto"
                    width={180}
                    height={135}
                    className="w-24 h-18 object-cover rounded-md"
                    priority
                    unoptimized
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
                  <Image
                    src="/images/pag_principal/logo_gf.png"
                    alt="Serviços automotivos - GF Auto"
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                  Imagem ilustrativa
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
