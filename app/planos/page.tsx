import PlanoPage from '../../fluxo_plano/components/PlanoPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Planos de Anúncios - GFauto | Anuncie seu Serviço Automotivo',
  description: 'Escolha o melhor plano para anunciar seu serviço ou produto automotivo no GFauto. Planos a partir de R$ 36/ano com destaque garantido.',
  keywords: 'planos gfauto, anunciar autopeças, serviços automotivos, oficina mecânica, anúncios premium',
  openGraph: {
    title: 'Planos de Anúncios - GFauto',
    description: 'Anuncie seu serviço automotivo e conecte-se com milhares de clientes. Planos a partir de R$ 36/ano.',
    url: 'https://gfauto.vercel.app/planos',
    siteName: 'GFauto',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Planos de Anúncios - GFauto',
    description: 'Anuncie seu serviço automotivo e conecte-se com milhares de clientes.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://gfauto.vercel.app/planos',
  },
};

export default function PlanosPage() {
  return <PlanoPage />;
}