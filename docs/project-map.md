# Mapa do Projeto GFauto

Este documento mapeia a estrutura do projeto GFauto, mostrando os relacionamentos entre componentes, fluxos de dados e dependências.

## Estrutura de Diretórios

```
GFauto/
├── app/                    # Páginas e rotas da aplicação
│   ├── api/                # Endpoints da API
│   │   ├── admin/          # APIs administrativas
│   │   │   └── popular-fornecedores/  # Endpoint para popular o banco
│   │   ├── cidades/        # API de cidades
│   │   ├── especialidades/ # API de especialidades
│   │   ├── estados/        # API de estados
│   │   └── fornecedores/   # API de fornecedores
│   ├── admin/              # Área administrativa
│   ├── resultados/         # Página de resultados de busca
│   └── page.tsx            # Página inicial com formulário de busca
├── components/             # Componentes reutilizáveis
│   ├── admin/              # Componentes da área administrativa
│   ├── ui/                 # Componentes de interface
│   └── visitante/          # Componentes para visitantes
│       ├── BuscaForm.tsx   # Formulário de busca
│       └── ResultadosList.tsx # Lista de resultados
├── fluxo_visitante/        # Fluxo específico para visitantes
│   └── components/         # Componentes específicos do fluxo
│       └── visitante/      # Componentes para visitantes
│           └── BuscaForm.tsx # Duplicado do componente principal
├── prisma/                 # Configuração e schema do Prisma
│   └── schema.prisma       # Definição dos modelos de dados
├── public/                 # Arquivos estáticos
└── scripts/                # Scripts utilitários
    └── db/                 # Scripts para manipulação do banco de dados
        ├── popular_fornecedores_autoeletricas.js # Script para popular o banco
        └── README.md       # Documentação dos scripts
```

## Fluxos de Dados

### Fluxo de Busca

1. Usuário acessa a página inicial (`app/page.tsx`)
2. Preenche o formulário de busca (`components/visitante/BuscaForm.tsx`)
3. O formulário faz requisições para:
   - `/api/estados` para carregar estados
   - `/api/cidades?estadoId=X` para carregar cidades do estado selecionado
   - `/api/especialidades?termo=Y` para buscar especialidades
4. Ao submeter o formulário, o usuário é redirecionado para:
   - `/resultados?estado=A&cidade=B&especialidade=C`
5. A página de resultados (`app/resultados/page.tsx`) carrega:
   - Parâmetros da URL
   - Fornecedores via `/api/fornecedores?cidadeId=X&especialidadeId=Y`
6. Os resultados são exibidos usando `components/visitante/ResultadosList.tsx`

### Fluxo de População do Banco

1. Acesso ao endpoint `/api/admin/popular-fornecedores?key=gfauto-admin-2025`
2. O endpoint verifica a chave de API
3. Se válida, executa:
   - Verifica/cria estado (Rio Grande do Sul)
   - Verifica/cria cidade (Passo Fundo)
   - Verifica/cria especialidade (Auto Elétricas)
   - Verifica/cria fornecedores Premium e Cortesia

## Dependências entre Arquivos

### BuscaForm.tsx

- **Depende de**:
  - `/api/estados`
  - `/api/cidades`
  - `/api/especialidades`

### ResultadosList.tsx

- **Depende de**:
  - `/api/fornecedores` (no modo busca)

### page.tsx (resultados)

- **Depende de**:
  - `components/visitante/ResultadosList.tsx`
  - `/api/fornecedores`

### route.ts (popular-fornecedores)

- **Depende de**:
  - Prisma Client
  - Modelos: Estado, Cidade, Especialidade, Fornecedores
