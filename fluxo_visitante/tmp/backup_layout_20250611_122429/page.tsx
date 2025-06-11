// Caminho: /app/pagina-correta/page.tsx
import { Metadata } from 'next';
import HeroSectionCorreto from '../../fluxo_visitante/components/visitante/HeroSectionCorreto';

export const metadata: Metadata = {
  title: 'GFauto - Página Correta com Imagens',
  description: 'Teste da página com as 3 imagens funcionando corretamente.',
};

export default function PaginaCorreta() {
  return (
    <main className="min-h-screen">
      <HeroSectionCorreto />
    </main>
  );
}
