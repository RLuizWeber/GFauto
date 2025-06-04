// Caminho: /app/page.tsx
import BuscaForm from '../components/visitante/BuscaForm';
import HeroSection from '../components/visitante/HeroSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <BuscaForm />
        </div>
      </div>
    </main>
  );
}
