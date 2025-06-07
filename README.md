# GFauto - Sistema de Busca de Serviços Automotivos

GFauto é uma plataforma que conecta usuários a serviços automotivos em sua região. O sistema permite buscar por especialidades automotivas em diferentes cidades e estados.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
GFauto/
├── app/                    # Páginas e rotas da aplicação
│   ├── api/                # Endpoints de API
│   │   └── admin/          # Endpoints administrativos
│   ├── resultados/         # Página de resultados da busca
│   └── page.tsx            # Página inicial
├── components/             # Componentes reutilizáveis
│   ├── admin/              # Componentes do painel administrativo
│   └── visitante/          # Componentes para visitantes
│       ├── BuscaForm.tsx   # Formulário de busca
│       └── ResultadosList.tsx # Lista de resultados
├── fluxo_visitante/        # Fluxo específico para visitantes
├── prisma/                 # Configuração do Prisma ORM
├── public/                 # Arquivos estáticos
└── scripts/                # Scripts utilitários
    └── db/                 # Scripts para o banco de dados
```

## Principais Funcionalidades

### Formulário de Busca
O formulário de busca permite aos usuários encontrar serviços automotivos por:
- Estado
- Cidade
- Especialidade

O formulário inclui autocomplete para todos os campos e validação para garantir que todos os campos sejam preenchidos antes da busca.

### Página de Resultados
A página de resultados exibe os fornecedores encontrados para a busca realizada, organizados por categoria:
- Fornecedores Premium (destacados)
- Fornecedores Cortesia (listagem padrão)

### API para População do Banco
O sistema inclui um endpoint de API para popular o banco de dados com fornecedores de exemplo:
```
/api/admin/popular-fornecedores?key=gfauto-admin-2025
```

## Documentação Detalhada

- [Formulário de Busca](./docs/formulario_busca.md)
- [Página de Resultados](./docs/pagina_resultados.md)
- [API de Administração](./docs/api/admin_api.md)
- [Changelog](./docs/changelog.md)

## Tecnologias Utilizadas

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL (via Neon)
- Vercel (hospedagem)

## Desenvolvimento

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
# Clonar o repositório
git clone https://github.com/RLuizWeber/GFauto.git

# Instalar dependências
cd GFauto
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local com suas configurações

# Iniciar servidor de desenvolvimento
npm run dev
```

## Deploy

O projeto está configurado para deploy automático na Vercel a partir do branch `main`.
