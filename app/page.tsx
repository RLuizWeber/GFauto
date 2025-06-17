// Caminho : /app/page.tsx
import { Metadata } from 'next';
import HeroSectionCorreto from '../fluxo_app/components/HeroSectionCorreto';

export const metadata: Metadata = {
  title: 'GFauto - Serviços Automotivos',
  description: 'Encontre os melhores serviços automotivos na sua região.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSectionCorreto />
    </main>
  );
}
