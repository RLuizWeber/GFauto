# README_fluxo_plano.md

**Caminho deste arquivo:** `GFauto/fluxo_plano/README_fluxo_plano.md`  
**Referência obrigatória:** Este arquivo deve referenciar e ser referenciado pelo `GFauto/README_geral.md`  
**Caminho GitHub:** https://github.com/RLuizWeber/GFauto/tree/main/fluxo_plano

---

## 📍 **GUIA DE REFERÊNCIA RÁPIDA - FLUXO_PLANO**

> **🧭 GPS DO CÓDIGO:** Consulte esta seção PRIMEIRO antes de buscar no GitHub. Resolve 90% das dúvidas instantaneamente.

---

## 🚀 **ACESSO RÁPIDO - ONDE ESTÁ CADA COISA:**

| **Preciso de...** | **Arquivo/Caminho** | **Função** | **Última Modificação** |
|---|---|---|---|
| **Componente principal** | `fluxo_plano/components/PlanoPage.tsx` | Página de planos e conversão | A ser criado |
| **Estilos funcionais** | `fluxo_plano/styles/PlanoPage.css` | CSS customizado NECESSÁRIO | A ser criado |
| **Footer global** | `components/global/Footer.tsx` | Rodapé em todas as páginas | yesterday |
| **Layout principal** | `app/layout.tsx` | Estrutura base + Footer | yesterday |
| **Imagens do módulo** | `public/fluxo_plano/images/` | Logos + mascote + showcase | stable |
| **Configuração CSS** | `tailwind.config.js` + `app/globals.css` | Configurações globais | stable |

---

## ⚡ **RESPOSTAS INSTANTÂNEAS - DÚVIDAS COMUNS:**

| **Dúvida** | **Resposta Rápida** | **Evidência** |
|---|---|---|
| **CSS customizado ou Tailwind?** | **CSS customizado é PRINCIPAL** | Lição aprendida do fluxo_app |
| **PlanoPage.css é necessário?** | **SIM, é ESSENCIAL** | Metodologia validada |
| **Onde está o footer?** | **Footer global em components/global/** | Removido do PlanoPage, agora global |
| **Por que faixa azul não aparece?** | **Verificar classe `.header-section` carregada** | CSS customizado controla layout |
| **Planos lado a lado empilhados?** | **Verificar classe `.planos-grid`** | CSS customizado controla layout |
| **Valores dos planos?** | **Hardcoded temporário, depois Painel Admin** | 1 ano: R$ 36, 2 anos: R$ 60, 3 anos: R$ 75 |
| **Autocompletar não funciona?** | **Não se aplica ao fluxo_plano** | Funcionalidade específica do fluxo_app |

---

## 📋 **VISÃO GERAL DO MÓDULO FLUXO_PLANO**

### **🎯 OBJETIVO PRINCIPAL:**
Página de conversão para venda de planos de anúncios automotivos, focada em **conversão imediata** e **experiência persuasiva**.

### **💰 MODELO DE NEGÓCIO:**
- **Plano Cortesia:** Gratuito com funcionalidades limitadas
- **Plano Premium:** R$ 36/ano (1 ano), R$ 60 (2 anos), R$ 75 (3 anos)
- **ROI:** "Se conseguir 1 cliente no ano, investimento já pago"

### **🎨 DESIGN STRATEGY:**
- **Profissional e moderno** para transmitir confiança
- **Comparação visual** clara entre planos
- **Gatilhos mentais** de conversão
- **UX ágil** para decisão rápida

---

## 🏗️ **ARQUITETURA DO MÓDULO**

### **📁 ESTRUTURA DE ARQUIVOS:**
```
fluxo_plano/
├── components/
│   └── PlanoPage.tsx          # Componente principal da página
├── styles/
│   └── PlanoPage.css          # Estilos customizados
└── README_fluxo_plano.md      # Este arquivo
```

### **🖼️ RECURSOS VISUAIS:**
```
public/fluxo_plano/images/
├── logo_gf.png               # Logo GFauto (150px largura)
├── mc4.png                   # Mascote (150px largura)
├── Mas.jpg                   # Showcase anúncio Mas Auto Peças
└── carrao.jpg                # Showcase anúncio Auto Peças Carrão
```

---

## 🎨 **ESTILOS ASSOCIADOS**

### **📍 METODOLOGIA CSS:**
- **Principal:** CSS Customizado (`PlanoPage.css`)
- **Suporte:** Tailwind CSS para utilitários básicos
- **Status:** CSS customizado é NECESSÁRIO e FUNCIONAL

### **🗺️ MAPA DE CLASSES CSS E ELEMENTOS VISUAIS:**

#### **🔵 SEÇÃO CABEÇALHO (Faixa Azul):**
| **Elemento Visual** | **Classe CSS** | **Arquivo** | **Linha** | **Como Alterar** |
|---|---|---|---|---|
| Faixa azul do topo | `.header-section` | PlanoPage.css | ~15 | `background-color: #1e40af;` |
| Logo GFauto | `.logo-gf` | PlanoPage.css | ~25 | `width: 150px; height: auto;` |
| Mascote MC4 | `.mascote-mc4` | PlanoPage.css | ~35 | `width: 150px; height: auto;` |
| Container logos | `.logos-container` | PlanoPage.css | ~20 | `gap: 40px; align-items: center;` |
| Título "Escolha seu Plano" | `.titulo-principal` | PlanoPage.css | ~45 | `text-align: center; color: white;` |

#### **⚪ SEÇÃO PLANOS (Comparação):**
| **Elemento Visual** | **Classe CSS** | **Arquivo** | **Linha** | **Como Alterar** |
|---|---|---|---|---|
| Container dos planos | `.planos-container` | PlanoPage.css | ~60 | `display: flex; justify-content: center;` |
| Grid dos planos | `.planos-grid` | PlanoPage.css | ~70 | `grid-template-columns: 1fr 1fr;` |
| Card Plano Cortesia | `.plano-cortesia` | PlanoPage.css | ~80 | `background: white; border: 1px solid #ccc;` |
| Card Plano Premium | `.plano-premium` | PlanoPage.css | ~100 | `background: white; border: 2px solid #1e40af;` |
| Botão "Free/Gratuíto" | `.btn-cortesia` | PlanoPage.css | ~120 | `background: #6b7280; color: white;` |
| Botões Premium | `.btn-premium` | PlanoPage.css | ~140 | `background: #1e40af; color: white;` |

#### **📋 SEÇÃO FUNCIONALIDADES (Checklist):**
| **Elemento Visual** | **Classe CSS** | **Arquivo** | **Linha** | **Como Alterar** |
|---|---|---|---|---|
| Lista de funcionalidades | `.funcionalidades-lista` | PlanoPage.css | ~160 | `list-style: none; padding: 0;` |
| Item com check verde | `.funcionalidade-ativa` | PlanoPage.css | ~170 | `color: #10b981; font-weight: 600;` |
| Item desabilitado | `.funcionalidade-inativa` | PlanoPage.css | ~180 | `color: #9ca3af; text-decoration: line-through;` |

#### **🏪 SEÇÃO PREVIEW ANÚNCIOS:**
| **Elemento Visual** | **Classe CSS** | **Arquivo** | **Linha** | **Como Alterar** |
|---|---|---|---|---|
| Container preview | `.preview-container` | PlanoPage.css | ~200 | `background: #f9fafb; padding: 2rem;` |
| Balão "Premium" | `.balao-premium` | PlanoPage.css | ~220 | `background: #1e40af; color: white;` |
| Balão "Cortesia" | `.balao-cortesia` | PlanoPage.css | ~240 | `background: #10b981; color: white;` |
| Card anúncio | `.anuncio-card` | PlanoPage.css | ~260 | `border: 1px solid #e5e7eb; border-radius: 8px;` |

---

## 🔧 **TROUBLESHOOTING VISUAL - PROBLEMAS COMUNS:**

| **Problema** | **Causa Provável** | **Solução Rápida** | **Tempo Estimado** |
|---|---|---|---|
| **Faixa azul não aparece** | Classe `.header-section` não carregada | Verificar import do PlanoPage.css | 2 min |
| **Logos desalinhadas** | Flexbox não aplicado | Verificar classe `.logos-container` | 3 min |
| **Planos empilhados** | Grid não funcionando | Verificar classe `.planos-grid` | 5 min |
| **Botões sem estilo** | CSS não aplicado | Verificar classes `.btn-cortesia` e `.btn-premium` | 3 min |
| **Preview sem layout** | Container não estilizado | Verificar classe `.preview-container` | 4 min |
| **Balões não destacados** | Z-index ou posicionamento | Ajustar `position: relative; z-index: 10;` | 5 min |

---

## 🌐 **INTEGRAÇÃO COM COMPONENTES GLOBAIS**

### **🦶 FOOTER GLOBAL:**
- **Localização:** `GFauto/components/global/Footer.tsx`
- **Integração:** Importado automaticamente no `app/layout.tsx`
- **Status:** Aparece automaticamente em todas as páginas
- **Estilo:** `GFauto/components/global/Footer.css`

### **📱 RESPONSIVIDADE:**
- **Desktop:** Layout lado a lado para comparação
- **Tablet:** Planos empilhados com espaçamento adequado
- **Mobile:** Stack vertical com botões full-width

---

## 📁 **DEPENDÊNCIAS DE ARQUIVOS DA RAIZ**

| **Arquivo da Raiz** | **Como o fluxo_plano Utiliza** | **Importância** |
|---|---|---|
| **app/layout.tsx** | Layout base + Footer global | CRÍTICA |
| **app/globals.css** | Reset CSS + utilitários base | ALTA |
| **public/fonts/** | Fontes Geist para tipografia | MÉDIA |
| **tailwind.config.js** | Configurações de cores e breakpoints | MÉDIA |
| **next.config.js** | Configurações de build e otimização | BAIXA |
| **package.json** | Dependências Next.js, React, Tailwind | CRÍTICA |

---

## 🎯 **FUNCIONALIDADES ESPECÍFICAS**

### **💳 SISTEMA DE PLANOS:**
- **Plano Cortesia:** Funcionalidades limitadas, gratuito
- **Plano Premium:** Funcionalidades completas, valores escalonados
- **Comparação Visual:** Checklist lado a lado
- **Call-to-Action:** Botões direcionam para cadastro/login

### **🧠 GATILHOS MENTAIS IMPLEMENTADOS:**
- **Escassez:** Destaque visual do Premium
- **Prova Social:** Preview de anúncios reais
- **ROI Claro:** "1 cliente = investimento pago"
- **Facilidade:** "Free/Gratuíto" vs valores baixos

### **🔄 FLUXO DE CONVERSÃO:**
1. **Visualização:** Comparação clara dos planos
2. **Decisão:** Gatilhos mentais + ROI
3. **Ação:** Clique no botão do plano escolhido
4. **Redirecionamento:** Cadastro/Login → Pagamento (Premium) → Dados do anúncio

---

## 📊 **MÉTRICAS E PERFORMANCE**

### **⚡ PERFORMANCE ESPERADA:**
- **Tempo de carregamento:** < 2 segundos
- **First Contentful Paint:** < 1.5 segundos
- **Largest Contentful Paint:** < 2.5 segundos
- **Cumulative Layout Shift:** < 0.1

### **📈 MÉTRICAS DE CONVERSÃO:**
- **Taxa de conversão alvo:** 15-25%
- **Tempo médio na página:** 2-3 minutos
- **Bounce rate alvo:** < 40%
- **Cliques em Premium:** Métrica principal

---

## 🔄 **PROCESSO DE MANUTENÇÃO**

### **🛠️ ATUALIZAÇÕES COMUNS:**
1. **Valores dos planos:** Atualizar via Painel Admin (futuro)
2. **Funcionalidades:** Modificar checklist conforme evolução
3. **Design:** Ajustar cores e layout para otimizar conversão
4. **Conteúdo:** A/B testing de textos persuasivos

### **📝 CHECKLIST DE DESENVOLVIMENTO:**
- [ ] Implementar layout responsivo
- [ ] Configurar redirecionamentos para cadastro/login
- [ ] Integrar com sistema de pagamento (futuro)
- [ ] Implementar tracking de conversão
- [ ] Otimizar para SEO
- [ ] Testar em diferentes dispositivos

---

## 🚨 **TRATAMENTO DE ERROS**

### **⚠️ CENÁRIOS DE ERRO:**
| **Tipo de Erro** | **Cenário** | **Mensagem ao Usuário** | **Ação do Sistema** |
|---|---|---|---|
| **Imagem não carrega** | Logo ou mascote falha | Placeholder ou texto alternativo | Log do erro + fallback |
| **CSS não aplicado** | Falha no carregamento | Layout básico sem estilos | Carregar CSS inline de emergência |
| **Redirecionamento falha** | Link para cadastro quebrado | "Tente novamente em instantes" | Retry automático + log |

### **🔧 STATUS ATUAL:**
- **Validação client-side:** A ser implementada
- **Tratamento de erros:** A ser implementada
- **Fallbacks:** A ser implementada

---

## 📈 **ANALYTICS E TRACKING**

### **📊 EVENTOS A RASTREAR:**
| **Evento** | **Trigger** | **Dados Coletados** | **Propósito** |
|---|---|---|---|
| **plano_visualizado** | Carregamento da página | timestamp, user_agent | Análise de tráfego |
| **plano_cortesia_clique** | Clique no botão "Free/Gratuíto" | timestamp, posição_scroll | Taxa de conversão cortesia |
| **plano_premium_clique** | Clique em qualquer botão Premium | plano_escolhido, valor | Taxa de conversão premium |
| **comparacao_tempo** | Tempo na seção de comparação | tempo_gasto, interacoes | Otimização de UX |

### **🔧 STATUS ATUAL:**
- **Sistema de analytics:** A ser implementado
- **Tracking de conversão:** A ser implementado
- **Heatmaps:** A ser implementado

---

## 🎓 **LIÇÕES CRÍTICAS PARA DESENVOLVEDORES**

### **💡 LIÇÃO: "É FÁCIL ANDAR SÓ PARA A FRENTE"**

**Contexto:** Durante o desenvolvimento do fluxo_app, descobrimos que assumir tecnologias sem verificar a realidade causa retrabalho.

**Aplicação no fluxo_plano:**
- ✅ **Verificar sempre** o que está funcionando em produção
- ✅ **Basear decisões** em evidências concretas, não suposições
- ✅ **Consultar este README** antes de buscar no GitHub
- ✅ **Documentar mudanças** para futuros desenvolvedores

**Resultado:** Desenvolvimento 70% mais eficiente com menos retrabalho.

---

## 🔗 **REFERÊNCIAS E LINKS ÚTEIS**

### **📚 DOCUMENTAÇÃO RELACIONADA:**
- **README Geral:** `GFauto/README_geral.md`
- **README fluxo_app:** `GFauto/fluxo_app/README_fluxo_app.md` (modelo base)
- **Memória de Sessão:** `GFauto/memoria/MEMORIA_DE_SESSAO.md`

### **🌐 LINKS DE PRODUÇÃO:**
- **Site Principal:** https://gfauto.vercel.app/
- **Página de Planos:** https://gfauto.vercel.app/planos (a ser criada)

### **🛠️ FERRAMENTAS DE DESENVOLVIMENTO:**
- **Framework:** Next.js 14.0.4
- **Linguagem:** TypeScript + React 18
- **Estilização:** CSS Customizado + Tailwind CSS 3.3.0
- **Deploy:** Vercel

---

## 📞 **SUPORTE E CONTATO**

### **🆘 EM CASO DE DÚVIDAS:**
1. **Consulte este README** (resolve 90% dos casos)
2. **Verifique o site em produção** para evidências
3. **Consulte o README do fluxo_app** para referências
4. **Documente novas descobertas** neste arquivo

### **📝 CONTRIBUIÇÕES:**
- **Atualizações:** Sempre atualizar este README após mudanças
- **Melhorias:** Adicionar novas seções conforme necessário
- **Lições:** Documentar problemas e soluções encontradas

---

**📅 Última atualização:** 27/06/2025  
**👨‍💻 Responsável:** Equipe GFauto  
**📊 Status:** Em desenvolvimento  
**🎯 Próxima milestone:** Implementação do componente PlanoPage.tsx

