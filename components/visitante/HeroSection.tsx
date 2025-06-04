// Caminho: /components/visitante/HeroSection.tsx
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
            <div className="flex flex-col gap-6">
              <div className="flex items-center">
                <div className="mr-4">
                  <Image 
                    src="https://www.gfauto.com.br/aa_anuncio/images/logo_gf.png"
                    alt="Logo GF Auto"
                    width={400}
                    height={200}
                    style={{ height: 'auto' }}
                  />
                </div>
                <span className="text-lg">Busca rápida e fácil</span>
              </div>
              <div className="flex items-center">
                <div className="mr-4">
                  <Image 
                    src="https://www.gfauto.com.br/aa_anuncio/images/mc4.png"
                    alt="Serviços confiáveis"
                    width={400}
                    height={200}
                    style={{ height: 'auto' }}
                  />
                </div>
                <span className="text-lg">Serviços confiáveis</span>
              </div>
              <div className="flex items-center">
                <div className="mr-4">
                  <Image 
                    src="https://gfauto.com.br/image001.jpg"
                    alt="Contato direto"
                    width={400}
                    height={200}
                    style={{ height: 'auto' }}
                  />
                </div>
                <span className="text-lg">Contato direto</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-video">
              <div className="absolute inset-0 bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="relative w-full h-full">
                  {/* Placeholder para imagem */}
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Imagem ilustrativa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
