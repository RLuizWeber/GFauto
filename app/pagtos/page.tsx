import PagtoPage from '../../fluxo_pagto/components/PagtoPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pagamento - GFauto | Finalizar Assinatura do Plano Premium',
  description: 'Finalize o pagamento do seu plano Premium GFauto de forma segura. Aceite cartão de crédito, PIX e boleto bancário.',
  keywords: 'pagamento gfauto, plano premium, cartão crédito, pix, boleto, assinatura',
  openGraph: {
    title: 'Pagamento - GFauto',
    description: 'Finalize o pagamento do seu plano Premium de forma segura e comece a anunciar hoje mesmo.',
    url: 'https://gfauto.vercel.app/pagtos',
    siteName: 'GFauto',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pagamento - GFauto',
    description: 'Finalize o pagamento do seu plano Premium de forma segura.',
  },
  robots: {
    index: false, // Página de pagamento não deve ser indexada
    follow: false,
  },
  alternates: {
    canonical: 'https://gfauto.vercel.app/pagtos',
  },
};

export default function PagtosPage() {
  return <PagtoPage />;
}