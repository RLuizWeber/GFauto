// Footer.tsx - Componente Global do Rodapé
// Localização: GFauto/components/global/Footer.tsx
// Baseado nas especificações do README_fluxo_app.md e no modelo original www.gfauto.com.br

'use client';

import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Coluna 1: Sobre o GFauto */}
        <div className="footer-column">
          <h3 className="footer-title">Sobre o GFauto</h3>
          <ul className="footer-links">
            <li>
              <a href="https://www.gfauto.com.br" target="_blank" rel="noopener noreferrer">
                Home
              </a>
            </li>
            <li>
              <a href="https://www.gfauto.com.br/156/156.html" target="_blank" rel="noopener noreferrer">
                Projeto 156
              </a>
            </li>
            <li>
              <a href="https://www.gfauto.com.br/guiasfacil.html" target="_blank" rel="noopener noreferrer">
                Radares
              </a>
            </li>
            <li>
              <a href="https://www.gfauto.com.br/aa_anuncio/form_anuncio.html" target="_blank" rel="noopener noreferrer">
                Anuncie
              </a>
            </li>
            <li>
              <a href="https://www.gfauto.com.br/aa_anuncio/form_atualiza.html" target="_blank" rel="noopener noreferrer">
                Atualize Seus Dados
              </a>
            </li>
          </ul>
        </div>

        {/* Coluna 2: Contato */}
        <div className="footer-column">
          <h3 className="footer-title">Contato</h3>
          <ul className="footer-links">
            <li>
              <a href="https://wa.me/5500000000" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
            <li>
              <a href="https://www.gfauto.com.br/aa_anuncio/form_contato.html" target="_blank" rel="noopener noreferrer">
                Fale Conosco
              </a>
            </li>
            <li>
              <a href="#" onClick={() => alert('Página em desenvolvimento')}>
                Anunciar Serviços
              </a>
            </li>
            <li>
              <a href="#" onClick={() => alert('Página em desenvolvimento')}>
                Planos e Preços
              </a>
            </li>
          </ul>
        </div>

        {/* Coluna 3: Redes Sociais */}
        <div className="footer-column">
          <h3 className="footer-title">Redes Sociais</h3>
          <ul className="footer-links">
            <li>
              <a href="https://twitter.com/Projeto_156" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://www.gfauto.com.br" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" onClick={() => alert('Instagram em breve')}>
                Instagram
              </a>
            </li>
          </ul>
        </div>

        {/* Coluna 4: Legal */}
        <div className="footer-column">
          <h3 className="footer-title">Legal</h3>
          <ul className="footer-links">
            <li>
              <a href="#" onClick={() => alert('Página em desenvolvimento')}>
                Termos de Uso
              </a>
            </li>
            <li>
              <a href="#" onClick={() => alert('Página em desenvolvimento')}>
                Política de Privacidade
              </a>
            </li>
            <li>
              <a href="#" onClick={() => alert('Página em desenvolvimento')}>
                Política de Cookies
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <p>Direitos Reservados - <span className="footer-logo-text">GFauto</span> - 2001-2025</p>
      </div>
    </footer>
  );
};

export default Footer;

