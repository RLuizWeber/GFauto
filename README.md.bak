# GFauto - Guia de Fornecedores Automotivos

GFauto é uma plataforma que conecta usuários a fornecedores de serviços automotivos em sua região.

## Funcionalidades Principais

### Formulário de Busca

O formulário de busca permite que os usuários encontrem serviços automotivos com base em:
- Estado
- Cidade
- Especialidade automotiva

Características:
- Digitação livre em todos os campos
- Sugestões automáticas ao clicar ou focar nos campos
- Lista completa de 57 especialidades automotivas
- Validação de formulário com feedback visual

Para mais detalhes sobre o funcionamento e implementação do formulário de busca, consulte a [documentação completa do formulário](./docs/formulario_busca.md).

### Página de Resultados

A página de resultados exibe os fornecedores encontrados com base nos critérios de busca:
- Filtros aplicados claramente exibidos com separadores visuais
- Fornecedores Premium em destaque
- Fornecedores Cortesia listados abaixo
- Informações completas de contato e serviços

Para mais detalhes sobre a implementação da página de resultados, consulte a [documentação da página de resultados](./docs/pagina_resultados.md).

## Estrutura do Projeto

- `/app`: Páginas e rotas da aplicação Next.js
- `/components`: Componentes React reutilizáveis
- `/fluxo_visitante`: Componentes específicos para o fluxo de visitantes
- `/prisma`: Esquema e configurações do banco de dados
- `/public`: Arquivos estáticos (imagens, ícones, etc.)
- `/scripts`: Scripts utilitários e de população do banco de dados
- `/docs`: Documentação do projeto

## Componentes Principais

### ResultadosList

O componente `ResultadosList` é responsável por exibir a lista de fornecedores nos resultados da busca. Ele pode ser utilizado de duas formas:

1. **Com fornecedores passados diretamente:**
   ```jsx
   <ResultadosList fornecedores={fornecedores} />
   ```

2. **Com parâmetros para busca automática:**
   ```jsx
   <ResultadosList cidadeId="cidade_id" especialidadeId="especialidade_id" page={1} />
   ```

Para mais detalhes, consulte a [documentação do componente ResultadosList](./docs/componentes/resultados_list.md).

## Desenvolvimento

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Banco de dados PostgreSQL

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/RLuizWeber/GFauto.git
   cd GFauto
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env.local
   # Edite .env.local com suas configurações
   ```

4. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

### Scripts Úteis

- `scripts/db/popular_fornecedores_autoeletricas.js`: Popula o banco de dados com fornecedores de auto elétricas em Passo Fundo

## Deployment

O projeto está configurado para deploy automático na Vercel a partir do branch `main`.

## Changelog

Para ver o histórico completo de alterações, consulte o [changelog](./docs/changelog.md).
