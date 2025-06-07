# Problemas Conhecidos e Soluções

Este documento registra os problemas encontrados durante o desenvolvimento do GFauto e as soluções aplicadas.

## 1. Problemas de Tipagem no Prisma

### Problema: Propriedade 'cidadeId' não existe no tipo 'EspecialidadeWhereInput'

**Descrição**: Ao tentar filtrar especialidades por cidadeId, o Prisma gerou um erro de tipagem porque o modelo Especialidade não tem uma relação direta com Cidade que permita esse tipo de filtro.

**Solução**:
```javascript
// Antes (com erro):
let especialidade = await prisma.especialidade.findFirst({
  where: {
    nome: 'Auto Elétricas',
    cidadeId: cidade.id  // Este campo causa o erro de tipagem
  }
});

// Depois (corrigido):
let especialidade = await prisma.especialidade.findFirst({
  where: {
    nome: 'Auto Elétricas'
  }
});
```

**Script de Correção**: `corrigir_tipagem_endpoint.sh`

### Problema: Propriedade 'slug' obrigatória faltando no tipo 'EspecialidadeCreateInput'

**Descrição**: Ao tentar criar uma especialidade, o Prisma gerou um erro porque o campo 'slug' é obrigatório no modelo Especialidade, mas não estava sendo fornecido.

**Solução**:
```javascript
// Antes (com erro):
await prisma.especialidade.create({
  data: {
    nome: 'Auto Elétricas',
    // Falta o campo slug obrigatório
  }
});

// Depois (corrigido):
await prisma.especialidade.create({
  data: {
    nome: 'Auto Elétricas',
    slug: 'auto-eletricas',
  }
});
```

**Script de Correção**: `corrigir_tipagem_especialidade_slug.sh`

### Problema: Propriedade 'fornecedor' não existe no tipo 'PrismaClient'

**Descrição**: O código estava tentando acessar `prisma.fornecedor` (singular), mas o modelo correto no schema do Prisma é `prisma.fornecedores` (plural).

**Solução**:
```javascript
// Antes (com erro):
const fornecedorExistente = await prisma.fornecedor.findFirst({
  // ...
});

// Depois (corrigido):
const fornecedorExistente = await prisma.fornecedores.findFirst({
  // ...
});
```

**Script de Correção**: `corrigir_modelo_prisma_fornecedores.sh`

## 2. Problemas no Formulário de Busca

### Problema: Campos não permitiam digitação livre

**Descrição**: Os campos de Cidade e Especialidade estavam sendo desabilitados durante o carregamento (`disabled={loading}`), mas não estavam sendo habilitados corretamente após o carregamento.

**Solução**:
```jsx
// Antes (com erro):
<input
  type="text"
  disabled={loading}
  // ...
/>

// Depois (corrigido):
<input
  type="text"
  // Removido o atributo disabled
  // ...
/>
```

**Script de Correção**: `corrigir_buscaform_digitacao.sh`

### Problema: Sugestões não apareciam ao clicar nos campos

**Descrição**: As sugestões só apareciam após digitar algo, não ao clicar ou focar nos campos.

**Solução**:
```jsx
// Antes:
<input
  type="text"
  onFocus={() => {
    if (inputValue) {
      // Só mostra sugestões se já houver texto
      // ...
    }
  }}
  // ...
/>

// Depois:
<input
  type="text"
  onClick={() => {
    // Mostra sugestões ao clicar, mesmo sem texto
    // ...
  }}
  onFocus={() => {
    // Mostra sugestões ao focar, mesmo sem texto
    // ...
  }}
  // ...
/>
```

**Script de Correção**: `corrigir_buscaform_digitacao.sh`

## 3. Problemas de Espaçamento nos Filtros

### Problema: Filtros aplicados sem espaçamento adequado

**Descrição**: Os filtros aplicados na página de resultados eram exibidos sem espaçamento adequado: "Estado: Rio Grande do SulCidade: Passo FundoEspecialidade: auto elétricas".

**Solução**:
```jsx
// Antes:
<p>
  {estado ? `Estado: ${estado}` : ''}
  {cidade ? `Cidade: ${cidade}` : ''}
  {especialidade ? `Especialidade: ${especialidade}` : ''}
</p>

// Depois:
<p>
  {[
    estado ? `Estado: ${estado}` : null,
    cidade ? `Cidade: ${cidade}` : null,
    especialidade ? `Especialidade: ${especialidade}` : null
  ].filter(Boolean).join(' | ')}
</p>
```

**Script de Correção**: `corrigir_espacamento_filtros.sh`

## 4. Problemas de Acesso ao Banco de Dados

### Problema: Impossibilidade de acessar diretamente o banco da Vercel

**Descrição**: Não era possível acessar diretamente o banco de dados da Vercel a partir de scripts locais, gerando o erro: "Can't reach database server at 'ep-black-darkness-aciwkm2-pooler.sa-east-1.aws.neon.tech':5432".

**Solução**: Criação de um endpoint de API seguro que pode ser chamado para popular o banco de dados diretamente no ambiente da Vercel:
```typescript
// Endpoint de API seguro
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');
  
  // Verificação de segurança
  if (key !== 'gfauto-admin-2025') {
    return new Response(JSON.stringify({ error: 'Chave de API inválida' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Código para popular o banco de dados
  // ...
}
```

**Script de Criação**: `criar_api_popular_banco.sh`

## 5. Problemas de Mensagem de Erro

### Problema: Mensagem de erro aparecendo indevidamente

**Descrição**: A mensagem de erro "Não foi possível carregar os estados. Por favor, tente novamente." aparecia antes mesmo de qualquer tentativa de carregamento dos estados.

**Solução**:
```jsx
// Antes:
const [error, setError] = useState<string | null>(null);

// Depois:
const [error, setError] = useState<string | null>(null);
const [tentouCarregar, setTentouCarregar] = useState<boolean>(false);

// E na função de carregamento:
const carregarEstados = async () => {
  setTentouCarregar(true);
  try {
    // ...
  } catch (error) {
    setError('Não foi possível carregar os estados. Por favor, tente novamente.');
  }
};

// E na renderização:
{tentouCarregar && error && <p className="text-red-500">{error}</p>}
```

**Script de Correção**: `corrigir_mensagem_erro_estados.sh`
