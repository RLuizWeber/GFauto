# Mapa do Projeto GFauto

**Última atualização:** 04/06/2025 20:45

## Índice

1. [Estrutura de Diretórios](#estrutura-de-diretórios)
2. [Componentes Principais](#componentes-principais)
3. [Páginas](#páginas)
4. [Fluxos de Dados](#fluxos-de-dados)
5. [Dependências entre Arquivos](#dependências-entre-arquivos)

## Estrutura de Diretórios

```

/.git
/.next
/.vercel
/GFauto
/GFauto/.git
/GFauto/app
/GFauto/app/api
/GFauto/app/api/create-payment
/GFauto/app/api/send-email
/GFauto/app/api/webhook
/GFauto/app/api/webhook/mercadopago
/GFauto/prisma
/GFauto/prisma/migrations
/GFauto/prisma/migrations/20250505175544_init
/GFauto/prisma/migrations/20250507124049_add_payment_table
/GFauto/prisma/migrations/20250514175358_update_schema_for_webhook_logic
/GFauto/public
/GFauto/public/fonts
/GFauto/public/fonts/geist-font-1.4.2
/GFauto/public/fonts/geist-font-1.4.2/fonts
/GFauto/public/fonts/geist-font-1.4.2/fonts/Geist
/GFauto/public/fonts/geist-font-1.4.2/fonts/Geist/otf
/GFauto/public/fonts/geist-font-1.4.2/fonts/Geist/ttf
/GFauto/public/fonts/geist-font-1.4.2/fonts/Geist/variable
/GFauto/public/fonts/geist-font-1.4.2/fonts/Geist/webfonts
/GFauto/public/fonts/geist-font-1.4.2/fonts/GeistMono
/GFauto/public/fonts/geist-font-1.4.2/fonts/GeistMono/otf
/GFauto/public/fonts/geist-font-1.4.2/fonts/GeistMono/ttf
/GFauto/public/fonts/geist-font-1.4.2/fonts/GeistMono/variable
/GFauto/public/fonts/geist-font-1.4.2/fonts/GeistMono/webfonts
/W:A_WeberPaiHostmachinegfautogithubVercelGFautoappanuncio[id]
/W:A_WeberPaiHostmachinegfautogithubVercelGFautoappresultados
/W:A_WeberPaiHostmachinegfautogithubVercelGFautofluxo_visitanteutils
/app
/app/admin
/app/admin/anuncios
/app/admin/components
/app/admin/components/dashboard
/app/admin/components/layout
/app/admin/components/ui
/app/admin/dashboard
/app/admin/pagamentos
/app/anuncio
/app/anuncio/[id]
/app/api
/app/api/create-payment
/app/api/send-email
/app/api/webhook
/app/api/webhook/mercadopago
/app/resultados
/backups
/backups/20250604
/components
/components/visitante
/docs
/fluxo_visitante
/fluxo_visitante/app
/fluxo_visitante/app/anuncio
/fluxo_visitante/app/anuncio/[id]
/fluxo_visitante/app/api
/fluxo_visitante/app/api/anuncios
/fluxo_visitante/app/api/anuncios/[id]
/fluxo_visitante/app/api/cidades
/fluxo_visitante/app/api/especialidades
/fluxo_visitante/app/api/estados
/fluxo_visitante/app/resultados
/fluxo_visitante/components
/fluxo_visitante/components/visitante
/fluxo_visitante/docs
/fluxo_visitante/prisma
/fluxo_visitante/public
/fluxo_visitante/public/images
/fluxo_visitante/utils
/lib
/node_modules
/prisma
/prisma/migrations
/prisma/migrations/20250505175544_init
/prisma/migrations/20250507124049_add_payment_table
/prisma/migrations/20250514175358_update_schema_for_webhook_logic
/prisma/migrations/20250602214049_adiciona_titulo_descricao
/prisma/migrations/20250603173449_adiciona_modelo_imagem
/prisma/migrations/20250603192202_adiciona_modelos_fluxo_visitante
/public
/public/fonts
/public/fonts/geist-font-1.4.2
/public/fonts/geist-font-1.4.2/fonts
/public/fonts/geist-font-1.4.2/fonts/Geist
/public/fonts/geist-font-1.4.2/fonts/Geist/otf
/public/fonts/geist-font-1.4.2/fonts/Geist/ttf
/public/fonts/geist-font-1.4.2/fonts/Geist/variable
/public/fonts/geist-font-1.4.2/fonts/Geist/webfonts
/public/fonts/geist-font-1.4.2/fonts/GeistMono
/public/fonts/geist-font-1.4.2/fonts/GeistMono/otf
/public/fonts/geist-font-1.4.2/fonts/GeistMono/ttf
/public/fonts/geist-font-1.4.2/fonts/GeistMono/variable
/public/fonts/geist-font-1.4.2/fonts/GeistMono/webfonts
/public/images
/public/images/anuncios
/public/images/fluxo_visitante
/utils
```

## Componentes Principais

### AnuncioCard.tsx

Caminho: `/components/visitante/AnuncioCard.tsx`

Descrição: Componente para [adicionar descrição]

### BuscaForm.tsx

Caminho: `/components/visitante/BuscaForm.tsx`

Descrição: Componente para [adicionar descrição]

### HeroSection.tsx

Caminho: `/components/visitante/HeroSection.tsx`

Descrição: Componente para [adicionar descrição]

### LoadingResults.tsx

Caminho: `/components/visitante/LoadingResults.tsx`

Descrição: Componente para [adicionar descrição]

### Pagination.tsx

Caminho: `/components/visitante/Pagination.tsx`

Descrição: Componente para [adicionar descrição]

### ResultadosList.tsx

Caminho: `/components/visitante/ResultadosList.tsx`

Descrição: Componente para [adicionar descrição]

## Páginas

### page.tsx

Caminho: `/app/admin/anuncios/page.tsx`

Descrição: Página para [adicionar descrição]

### MetricCard.tsx

Caminho: `/app/admin/components/dashboard/MetricCard.tsx`

Descrição: Página para [adicionar descrição]

### RecentItemsTable.tsx

Caminho: `/app/admin/components/dashboard/RecentItemsTable.tsx`

Descrição: Página para [adicionar descrição]

### TrendChart.tsx

Caminho: `/app/admin/components/dashboard/TrendChart.tsx`

Descrição: Página para [adicionar descrição]

### AdminLayout.tsx

Caminho: `/app/admin/components/layout/AdminLayout.tsx`

Descrição: Página para [adicionar descrição]

### Header.tsx

Caminho: `/app/admin/components/layout/Header.tsx`

Descrição: Página para [adicionar descrição]

### Sidebar.tsx

Caminho: `/app/admin/components/layout/Sidebar.tsx`

Descrição: Página para [adicionar descrição]

### DataTable.tsx

Caminho: `/app/admin/components/ui/DataTable.tsx`

Descrição: Página para [adicionar descrição]

### FilterBar.tsx

Caminho: `/app/admin/components/ui/FilterBar.tsx`

Descrição: Página para [adicionar descrição]

### FunnelChart.tsx

Caminho: `/app/admin/components/ui/FunnelChart.tsx`

Descrição: Página para [adicionar descrição]

### MetricCard.tsx

Caminho: `/app/admin/components/ui/MetricCard.tsx`

Descrição: Página para [adicionar descrição]

### TrendChart.tsx

Caminho: `/app/admin/components/ui/TrendChart.tsx`

Descrição: Página para [adicionar descrição]

### page.tsx

Caminho: `/app/admin/dashboard/page.tsx`

Descrição: Página para [adicionar descrição]

### layout.tsx

Caminho: `/app/admin/layout.tsx`

Descrição: Página para [adicionar descrição]

### page.tsx

Caminho: `/app/admin/pagamentos/page.tsx`

Descrição: Página para [adicionar descrição]

### page.tsx

Caminho: `/app/anuncio/[id]/page.tsx`

Descrição: Página para [adicionar descrição]

### layout.tsx

Caminho: `/app/layout.tsx`

Descrição: Página para [adicionar descrição]

### page.tsx

Caminho: `/app/page.tsx`

Descrição: Página para [adicionar descrição]

### page.tsx

Caminho: `/app/resultados/page.tsx`

Descrição: Página para [adicionar descrição]

## Fluxos de Dados

### Fluxo do Visitante

1. Usuário acessa a página inicial
2. Preenche o formulário de busca com estado, cidade e especialidade
3. Sistema redireciona para a página de resultados
4. Usuário visualiza os anúncios correspondentes
5. Usuário pode entrar em contato com o anunciante

### Fluxo do Administrador

[Adicionar descrição do fluxo do administrador]

## Dependências entre Arquivos

### Componentes do Fluxo do Visitante

- `BuscaForm.tsx` - Formulário de busca na página inicial
  - Depende de: estados, cidades e especialidades do banco de dados
  - Utilizado em: `app/page.tsx`

- `ResultadosList.tsx` - Lista de resultados da busca
  - Depende de: `AnuncioCard.tsx`, `Pagination.tsx`, `LoadingResults.tsx`
  - Utilizado em: `app/resultados/page.tsx`

- `AnuncioCard.tsx` - Card de anúncio individual
  - Depende de: `utils/formatters.ts` para formatação de telefone
  - Utilizado em: `ResultadosList.tsx`

[Adicionar mais dependências conforme necessário]
