import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="relative bg-blue-700 text-white">
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/images/hero-bg.jpg"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Encontre os melhores serviços automotivos
          </h1>
          <p className="text-xl mb-8">
            Conectamos você aos melhores profissionais e lojas de autopeças da sua região.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#busca"
              className="px-6 py-3 bg-white text-blue-700 font-medium rounded-md hover:bg-gray-100 transition-colors text-center"
            >
              Começar Agora
            </a>
            <a
              href="/anunciar"
              className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-blue-700 transition-colors text-center"
            >
              Anunciar meu Negócio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
