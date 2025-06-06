# Documentação da Página de Resultados

## Visão Geral

A página de resultados exibe os fornecedores encontrados com base nos critérios de busca do usuário. Os resultados são organizados por categoria (Premium e Cortesia) e apresentam informações detalhadas sobre cada fornecedor.

## Funcionalidades

### Exibição de Filtros Aplicados

- Os filtros aplicados são exibidos no topo da página com espaçamento adequado
- Formato: "Estado: Rio Grande do Sul | Cidade: Passo Fundo | Especialidade: auto elétricas"
- Facilita a visualização dos critérios de busca utilizados

### Categorização de Fornecedores

- Os fornecedores são divididos em duas categorias:
  - **Premium**: Fornecedores que pagam pelo destaque
  - **Cortesia**: Fornecedores com listagem básica gratuita
- Fornecedores Premium aparecem em destaque no topo da lista
- Fornecedores Cortesia aparecem abaixo dos Premium

### Informações Exibidas

Para cada fornecedor, são exibidas as seguintes informações:
- Nome do fornecedor
- Descrição dos serviços
- Endereço completo
- Telefone de contato
- Email (quando disponível)
- Website (apenas para fornecedores Premium)

### Estados de Exibição

A página de resultados possui diferentes estados de exibição:
- **Carregando**: Exibido enquanto os resultados estão sendo buscados
- **Erro**: Exibido quando ocorre um erro na busca
- **Sem Resultados**: Exibido quando nenhum fornecedor é encontrado
- **Resultados**: Exibido quando fornecedores são encontrados

## Implementação Técnica

### Componentes React

- `ResultadosPage`: Componente principal da página de resultados
- `ResultadosList`: Componente que renderiza a lista de fornecedores

### Fluxo de Dados

1. A página recebe parâmetros de busca via URL (query params)
2. Os parâmetros são extraídos usando `useSearchParams` do Next.js
3. Uma requisição é feita à API para buscar fornecedores
4. Os resultados são processados e exibidos na página

### Filtros e Parâmetros

A página aceita os seguintes parâmetros de busca:
- `estado`: Nome ou sigla do estado
- `cidade`: Nome da cidade
- `especialidade`: Nome da especialidade
- `cidade_id`: ID da cidade (alternativa ao nome)
- `especialidade_id`: ID da especialidade (alternativa ao nome)

## Manutenção e Atualizações

Para modificar o comportamento da página de resultados, edite os arquivos:
- `/app/resultados/page.tsx`: Componente principal da página
- `/components/visitante/ResultadosList.tsx`: Componente de listagem de fornecedores

Para alterar o estilo visual, modifique as classes Tailwind CSS nos componentes.
