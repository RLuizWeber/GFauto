# Página de Resultados

A página de resultados exibe os fornecedores encontrados com base nos critérios de busca do usuário.

## Localização do Componente

- **Página**: `app/resultados/page.tsx`
- **Componente de Lista**: `components/visitante/ResultadosList.tsx`

## Funcionalidades

### 1. Exibição de Filtros Aplicados

Os filtros aplicados são exibidos no topo da página com espaçamento adequado:

```jsx
<p className="text-sm text-gray-600 mb-4">
  {[
    estado ? `Estado: ${estado}` : null,
    cidade ? `Cidade: ${cidade}` : null,
    especialidade ? `Especialidade: ${especialidade}` : null
  ].filter(Boolean).join(' | ')}
</p>
```

### 2. Categorização de Fornecedores

Os fornecedores são divididos em duas categorias: Premium e Cortesia.

```jsx
// Separação dos fornecedores por categoria
const fornecedoresPremium = fornecedores.filter(f => f.categoria === 'premium');
const fornecedoresCortesia = fornecedores.filter(f => f.categoria === 'cortesia');

// Exibição separada
<div>
  <h2>Fornecedores Premium</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {fornecedoresPremium.map(fornecedor => (
      <FornecedorCard key={fornecedor.id} fornecedor={fornecedor} />
    ))}
  </div>
</div>

<div className="mt-8">
  <h2>Fornecedores Cortesia</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {fornecedoresCortesia.map(fornecedor => (
      <FornecedorCard key={fornecedor.id} fornecedor={fornecedor} />
    ))}
  </div>
</div>
```

## Componente ResultadosList

O componente ResultadosList pode ser usado de duas maneiras:

### 1. Modo Direto

Recebe diretamente a lista de fornecedores a serem exibidos:

```jsx
<ResultadosList fornecedores={fornecedores} />
```

### 2. Modo Busca

Recebe os IDs de cidade e especialidade e faz a busca internamente:

```jsx
<ResultadosList cidadeId={cidadeId} especialidadeId={especialidadeId} page={1} />
```

## Problemas Conhecidos e Soluções

### 1. Problema: Espaçamento incorreto nos filtros aplicados

**Descrição**: Os filtros aplicados eram exibidos sem espaçamento adequado: "Estado: Rio Grande do SulCidade: Passo FundoEspecialidade: auto elétricas".

**Solução**: Substituição da concatenação direta por separadores ` | ` usando `.filter(Boolean).join(' | ')`.

### 2. Problema: Incompatibilidade de props no ResultadosList

**Descrição**: Erro de tipagem: "Type '{ fornecedores: Fornecedor[]; }' is not assignable to type 'IntrinsicAttributes & ResultadosListProps'".

**Solução**: Atualização do componente ResultadosList para aceitar tanto a prop `fornecedores` diretamente quanto as props `cidadeId` e `especialidadeId`.

## Scripts de Correção

1. **Correção de Espaçamento nos Filtros**:
   - Arquivo: `corrigir_espacamento_filtros.sh`

2. **Correção de Erro de Deploy**:
   - Arquivo: `corrigir_erro_deploy.sh`
