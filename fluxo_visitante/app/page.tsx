// Caminho: /fluxo_visitante/app/page.tsx
import { Metadata } from 'next';
import BuscaForm from '../fluxo_visitante/components/visitante/BuscaForm';
import HeroSection from '../fluxo_visitante/components/visitante/HeroSection';

export const metadata: Metadata = {
  title: 'GFauto - Encontre serviços automotivos na sua cidade',
  description: 'Plataforma para encontrar serviços automotivos como autopeças, autoelétrica e muito mais na sua cidade.',
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Encontre serviços automotivos na sua cidade
          </h2>
          <BuscaForm />
        </div>
        
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Como funciona o GFauto
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Escolha sua localização</h3>
              <p className="text-gray-600">Selecione seu estado e cidade para encontrar serviços próximos a você.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Selecione o serviço</h3>
              <p className="text-gray-600">Escolha entre autopeças, autoelétrica e outras especialidades disponíveis.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Encontre o melhor</h3>
              <p className="text-gray-600">Compare opções e escolha o serviço que melhor atende suas necessidades.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
