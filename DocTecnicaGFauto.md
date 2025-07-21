
# 📄 Documentação Técnica - Projeto GFauto

## 1️⃣ Visão Geral do Projeto

### Nome:
**GFauto**

### Descrição:
O **GFauto** é um sistema digital para anúncio e busca de serviços do setor automotivo por região. Ele conecta prestadores de serviço automotivo com clientes locais, oferecendo anúncios com visibilidade diferenciada por planos (gratuito ou premium). O sistema integra fluxo completo de cadastro, pagamento, publicação e gestão administrativa dos anúncios, com foco em experiência prática tanto para o anunciante quanto para o visitante.

---

## 2️⃣ Objetivos do Sistema

- Conectar clientes com empresas do setor automotivo por cidade e especialidade
- Oferecer um painel administrativo completo e integrado
- Permitir anúncios gratuitos e premium, com destaque e rotação dinâmica
- Gerenciar cadastro, pagamentos, imagens e especialidades de forma centralizada

---

## 3️⃣ Arquitetura do Sistema

### 3.1 Padrão Arquitetural

- Next.js App Router (SSR + API)
- Prisma ORM
- Banco de Dados PostgreSQL (NeonDB)
- Deploy via Vercel
- Frontend, Backend e Admin no mesmo repositório

### 3.2 Estrutura de Pastas

#### 3.2a - Estrutura Atual do GitHub (2025-07)

```
GFauto/
├── app/
│   ├── admin-panel/
│   ├── fluxo_app/
│   ├── fluxo_cadastro/
│   ├── fluxo_plano/
│   ├── fluxo_visitante/
│   ├── planos/
│   ├── pagtos/
│   └── api/
├── prisma/
├── utils/
├── components/
├── public/
├── docs/
├── memoria/
├── package.json
├── .env.local
```

#### 3.2b - Estrutura Após Unificação

```
GFauto/
├── app/
│   ├── admin/                  # Painel Administrativo unificado
│   │   └── dashboard/
│   ├── advertiser/             # Fluxo do Anunciante (novo anúncio, editar, etc)
│   ├── public/                 # Frontend para visitantes
│   ├── planos/
│   ├── pagtos/
│   ├── fluxo_cadastro/
│   ├── fluxo_visitante/
│   └── api/
│       ├── anuncios/
│       ├── advertiser/
│       ├── pagtos/
│       ├── especialidades/
│       ├── cidades/
│       ├── estados/
│       └── rotacao-premium/
├── prisma/                     # Um único schema.prisma
├── utils/                      # Helpers e formatters
├── components/                 # Componentes compartilhados
├── public/                     # Assets
├── docs/
├── package.json                # Dependências unificadas
├── .env.local                  
```

### 3.3 Mapeamento Detalhado de Arquivos e Fluxos

Esta seção detalha os arquivos principais do GFauto após unificação, com sua origem, destino e função.

| Caminho Final 									| Origem 									| Função |
|---------------|--------|--------|
| `GFauto/
| /app/admin/dashboard/page.tsx` 		| gfauto-repo/admin-panel 		| Tela principal do dashboard admin |
| /app/advertiser/page.tsx` 					| Criar novo 								| Painel do anunciante (meus dados, criar anúncio) |
| /app/planos/page.tsx` 						| GFauto-main 						| Página de escolha de plano |
| /app/pagtos/page.tsx` 						| GFauto-main 						| Página de pagamento |
| /app/api/anuncios/route.ts` 				| Precisa ser criado 				| API CRUD dos anúncios |
| /app/api/advertiser/route.ts` 				| Precisa ser criado 				| API CRUD do anunciante |
| /app/api/especialidades/route.ts` 		| Já existe 								| Listagem de especialidades |
| /app/api/cidades/route.ts` 					| Criar 										| Listagem de cidades |
| /app/api/estados/route.ts` 				| Já existe (ajustar) 					| Listagem de estados |
| /app/api/rotacao-premium/route.ts` 	| Criar 										| Gerenciar rotação premium |
| /app/fluxo_cadastro/page.tsx` 			| GFauto-main 						| Fluxo de cadastro de anunciante |
| /app/fluxo_visitante/page.tsx` 			| GFauto-main 						| Tela pública de busca de serviços |
| /prisma/schema.prisma` 					| Consolidar em um só 			| Modelo do banco |
| `GFauto/utils/formatters.ts` 				| Já existe 								| Funções de formatação |
| `GFauto/components/` 						| Unificado 								| Componentes de UI compartilhados |

### Observações:

- Todos os caminhos agora partem de `GFauto/`
- O fluxo do anunciante terá diferença entre cortesia e premium implementada via UI e API
- Essa tabela deve ser mantida atualizada durante o desenvolvimento

---

## 4️⃣ Tecnologias e Ferramentas

| Tecnologia | Uso |
|------------|-----|
| Next.js (App Router) | Frontend + Backend SSR |
| Prisma ORM | Mapeamento do banco de dados |
| PostgreSQL NeonDB | Banco de dados |
| Mercado Pago API | Pagamentos |
| Vercel | Deploy |
| Resend API | Envio de e-mails |
| Tailwind CSS | Estilização |
| React | Componentização |
| Git/GitHub | Controle de versão |
| DBeaver / Prisma Studio | Gestão do banco |

---

## 5️⃣ Banco de Dados

| Nome de Exposição				| Nome no Banco 					| Status 											| Descrição |
|------------------|---------------|--------|------------|
| Anunciantes       					| Advertiser    							| Manter 											| Cadastro de anunciantes |
| Anúncios          						| Anuncio       							| Sugerido mudar para `anuncios` 	| Anúncios cadastrados |
| Pagamentos        					| Payment       							| Manter 											| Registro de pagamentos e status |
| Migrações Prisma  				| _prisma_migrations 				| Manter 											| Controle de versões do banco via Prisma |
| Cidades           						| cidades       							| Manter 											| Base de cidades brasileiras |
| Estados           						| estados       							| Manter 											| Base de estados brasileiros |
| Especialidades    					| especialidades						| Manter 											| Serviços ofertados |
| Especialidades Disponíveis 	| especialidades_disponiveis 	| Manter 											| Relação cidade/especialidade |
| Imagens_Anuncio   				| imagens_anuncio 					| Manter 											| Imagens dos anúncios |
| Rotação Premium   				| rotacao_premium 					| Manter 											| Rodízio de anúncios premium |

---

## 6️⃣ Funcionalidades

### 6.2 Anunciante (Painel e Fluxo)

| Tipo de Anunciante | Fluxo |
|-------------------|--------|
| Cortesia | Cadastro simplificado, senha, anúncio gratuito por 1 ano, renovável, sem imagem |
| Premium  | Cadastro, pagamento, inclusão de imagens, rotação premium com destaque |

Diferenças serão claras na UI após login.

---

## 8️⃣ APIs e Endpoints Planejados

```
GFauto/app/api/
├── anuncios/           # CRUD de anúncios
├── advertiser/         # Cadastro e login de anunciante
├── pagtos/             # Integração com Mercado Pago
├── especialidades/     # Buscar especialidades
├── cidades/            # Buscar cidades
├── estados/            # Buscar estados
├── rotacao-premium/    # Gerenciar rodízio premium
```
