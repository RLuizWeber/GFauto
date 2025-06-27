import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pagamento - GFauto | Em Desenvolvimento',
  description: 'Página de pagamento em desenvolvimento.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PagtosPage() {
  return (
    <div style={{ 
      padding: '4rem 2rem', 
      textAlign: 'center',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Inter, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: '2rem', 
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        Página de Pagamento
      </h1>
      <p style={{ 
        fontSize: '1.1rem',
        color: '#6b7280',
        marginBottom: '2rem'
      }}>
        Em desenvolvimento...
      </p>
      <div style={{
        background: '#f3f4f6',
        padding: '1rem',
        borderRadius: '8px',
        color: '#374151',
        fontSize: '0.9rem'
      }}>
        Esta página será implementada no fluxo_pagto
      </div>
    </div>
  );
}
