# 📱 PROJETO GFAUTO

## 📅 Última Atualização
12/06/2025

## 🔍 VISÃO GERAL
O Projeto GFauto atualmente na página https://www.gfauto.com.br está sendo reestruturado e implementado no novo projeto iniciando e https://gfauto.vercel.app/ que tem como principal objetivo expor para visitantes da web anunciantes de produtos e serviços automotivos no Brasil. O visitante na página https://gfauto.verce.app irá buscar pelo Estado / Cidade / O que procura? e será levado para a "página de resultados" onde estarão os anunciantes do Estado/Cidade dele que corresponderem à especialidade da informação que o visitante incluiu no campo "O que procura?". Por outro lado teremos os Clientes/Anunciantes que serão divididos em duas categorias: "Cortesia" e "Premium" o "Cortesia" poderá figurar na "página de resultados" sem pagar com uma exposição simples, o "Premium" vai ser convidado a efetuar um pagamento escolhido e terá uma exposição privilegiada na "página de resultados".

## 👨‍💻 EQUIPE DO PROJETO
- **Weber:** Dono do Projeto GFauto
- **Manus:** Sênior Analista, Desenvolvedor e Programador de Sistemas, Engenheiro de Software e de Infraestrutura

O Projeto GFauto está sendo construído por Manus e Weber no ano de 2025.

## 🚀 TECNOLOGIAS UTILIZADAS
- **Frontend:** Next.js, React, TailwindCSS
- **Backend:** Prisma
- **Hospedagem:** Vercel
- **Autenticação:** Senha forte e 2FA para painel admin

## 📋 ESTRUTURA DO PROJETO

### Estrutura Modular por Páginas
O projeto segue uma estrutura modular organizada por páginas/fluxos:

```
GFauto/
├── app/                      # Páginas do Next.js
│   └── page.tsx              # Página principal (raiz do site)
├── fluxo_app/                # Módulo da página principal
│   ├── components/           # Componentes específicos
│   ├── styles/               # Estilos específicos
│   └── README.md             # Documentação específica
├── fluxo_anunciante/         # Módulo da página do anunciante
├── fluxo_admin/              # Módulo do painel administrativo
├── backups/                  # Backups e exclusões
│   └── exclusoes/            # Arquivos excluídos organizados por data
└── README.md                 # Documentação geral do projeto
```

## 📝 REGRAS DO PROJETO

### 1. Estrutura Modular por Páginas
- Cada página tem sua própria pasta com todos os componentes necessários
- Exemplo: `fluxo_app`, `fluxo_anunciante`, `fluxo_admin`
- Componentes específicos ficam dentro da pasta do fluxo: `fluxo_app/components/`
- CSS deve ficar dentro da pasta do módulo correspondente

### 2. Independência entre Fluxos
- Sem componentes compartilhados entre fluxos
- Cada fluxo deve ser independente para facilitar manutenção

### 3. Página Principal na Raiz
- A página principal do site fica em `app/page.tsx`
- Importa componentes do fluxo correspondente

### 4. Processo de Trabalho
- Priorizar diálogo e alinhamento conceitual antes de implementação
- Implementar apenas após total clareza e consenso
- Revisão só é possível após deploy na Vercel

### 5. Gestão de Arquivos Obsoletos em "Nossos Ambientes"
- "Nossos Ambientes" refere-se a: GitHub, Local, Vercel e Sandbox
- Arquivos obsoletos devem ser identificados, verificados, documentados e excluídos
- Usar pasta central para exclusões: `/backups/exclusoes/YYYYMMDD_HHMMSS/`
- Confirmar exclusão em todos os ambientes

### 6. Estrutura e Atualização de READMEs
- Cabeçalho com metadados (nome, data, responsáveis)
- Seção de histórico no final com atualizações datadas
- READMEs departamentais para cada fluxo
- Revisão e limpeza periódica de informações obsoletas

## 📅 HISTÓRICO DE ATUALIZAÇÕES

### 12/06/2025
- Implementada estrutura modular por páginas
- Definidas regras para gestão de arquivos obsoletos
- Padronizada estrutura de READMEs
- Criada pasta central para exclusões

### 11/06/2025
- Criado sistema de memória de sessão
- Implementada metodologia de verificação factual
- Corrigido resumo do projeto baseado na documentação oficial
