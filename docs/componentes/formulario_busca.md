# Formulário de Busca

O formulário de busca é um componente central do GFauto, permitindo que os usuários encontrem na "página de resultados" serviços automotivos com base em sua localização e necessidades específicas informadas no campo "O que procura?".

## Localização do Componente

- **Componente Principal**: `components/visitante/BuscaForm.tsx`
- **Componente Duplicado**: `fluxo_visitante/components/visitante/BuscaForm.tsx`

**Importante**: Qualquer alteração deve ser aplicada em ambos os arquivos para manter a consistência.

## Funcionalidades

### 1. Digitação Livre em Todos os Campos

Todos os campos do formulário permitem digitação livre, sem restrições:

```jsx
<input
  type="text"
  value={estadoInput}
  onChange={(e) => setEstadoInput(e.target.value)}
  onClick={() => buscarEstados()}
  onFocus={() => buscarEstados()}
  // Sem atributo disabled
  // ...
/>
```

### 2. Sugestões Inteligentes

As sugestões aparecem automaticamente ao clicar ou focar em qualquer campo:

```jsx
const buscarEstados = async () => {
  setEstadosSugestoes(estados);
  setMostrarSugestoesEstado(true);
};

// Eventos que acionam as sugestões
onClick={() => buscarEstados()}
onFocus={() => buscarEstados()}
```

### 3. Validação do Formulário

O botão "Buscar Serviços" só fica ativo quando todos os campos estão preenchidos:

```jsx
<button
  type="submit"
  className={`w-full py-2 px-4 rounded ${
    estadoInput && cidadeInput && especialidadeInput
      ? 'bg-blue-500 hover:bg-blue-600 text-white'
      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
  }`}
  disabled={!estadoInput || !cidadeInput || !especialidadeInput}
>
  Buscar Serviços
</button>
```

### 4. Lista de Especialidades

O formulário inclui uma lista padrão de 57 especialidades automotivas comuns:

```jsx
const especialidadesPadrao = [
  'Acessórios Alarmes e Som',
  'Embreagens',
  'Sistemas Anti-Furto',
  // ... outras especialidades
];
```

## Estado do Componente

O componente utiliza os seguintes estados:

```jsx
// Estados para os inputs
const [estadoInput, setEstadoInput] = useState('');
const [cidadeInput, setCidadeInput] = useState('');
const [especialidadeInput, setEspecialidadeInput] = useState('');

// Estados para as sugestões
const [mostrarSugestoesEstado, setMostrarSugestoesEstado] = useState(false);
const [mostrarSugestoesCidade, setMostrarSugestoesCidade] = useState(false);
const [mostrarSugestoesEspecialidade, setMostrarSugestoesEspecialidade] = useState(false);

// Estados para os dados
const [estados, setEstados] = useState<Estado[]>([]);
const [cidades, setCidades] = useState<Cidade[]>([]);
const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);

// Estados para as sugestões filtradas
const [estadosSugestoes, setEstadosSugestoes] = useState<Estado[]>([]);
const [cidadesSugestoes, setCidadesSugestoes] = useState<Cidade[]>([]);
const [especialidadesSugestoes, setEspecialidadesSugestoes] = useState<Especialidade[]>([]);

// Estados para controle de carregamento e erro
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [tentouCarregar, setTentouCarregar] = useState<boolean>(false);
```

## Funções Principais

### 1. Carregamento de Estados

```jsx
const carregarEstados = async () => {
  setLoading(true);
  setTentouCarregar(true);
  try {
    const response = await fetch('/api/estados');
    const data = await response.json();
    setEstados(data);
    setEstadosSugestoes(data);
    setError(null);
  } catch (error) {
    setError('Não foi possível carregar os estados. Por favor, tente novamente.');
  } finally {
    setLoading(false);
  }
};
```

### 2. Carregamento de Cidades

```jsx
const carregarCidades = async (estadoId: string) => {
  setLoading(true);
  try {
    const response = await fetch(`/api/cidades?estadoId=${estadoId}`);
    const data = await response.json();
    setCidades(data);
    setCidadesSugestoes(data);
    setError(null);
  } catch (error) {
    setError('Não foi possível carregar as cidades. Por favor, tente novamente.');
  } finally {
    setLoading(false);
  }
};
```

### 3. Busca de Especialidades

```jsx
const buscarEspecialidades = async (termo: string) => {
  setLoading(true);
  try {
    // Combina especialidades da API com a lista padrão
    const response = await fetch(`/api/especialidades?termo=${termo}`);
    const data = await response.json();
    
    // Combina com especialidades padrão
    const todasEspecialidades = [...data];
    
    // Adiciona especialidades padrão que correspondem ao termo
    especialidadesPadrao.forEach(esp => {
      if (esp.toLowerCase().includes(termo.toLowerCase())) {
        // Verifica se já não existe na lista
        if (!todasEspecialidades.some(e => e.nome.toLowerCase() === esp.toLowerCase())) {
          todasEspecialidades.push({ id: `padrao-${esp}`, nome: esp });
        }
      }
    });
    
    setEspecialidades(todasEspecialidades);
    setEspecialidadesSugestoes(todasEspecialidades);
    setError(null);
  } catch (error) {
    // Fallback para especialidades padrão em caso de erro
    const especFiltradas = especialidadesPadrao
      .filter(esp => esp.toLowerCase().includes(termo.toLowerCase()))
      .map(esp => ({ id: `padrao-${esp}`, nome: esp }));
    
    setEspecialidades(especFiltradas);
    setEspecialidadesSugestoes(especFiltradas);
  } finally {
    setLoading(false);
  }
};
```

## Problemas Conhecidos e Soluções

### 1. Problema: Campos não permitiam digitação livre

**Solução**: Remoção do atributo `disabled={loading}` dos campos.

### 2. Problema: Sugestões não apareciam ao clicar nos campos

**Solução**: Adição de eventos `onClick` e melhoria dos eventos `onFocus`.

### 3. Problema: Mensagem de erro aparecendo indevidamente

**Solução**: Adição de estado `tentouCarregar` para controlar quando a mensagem deve ser exibida.

## Scripts de Correção

1. **Correção de Digitação nos Campos**:
   - Arquivo: `corrigir_buscaform_digitacao.sh`

2. **Correção de Mensagem de Erro dos Estados**:
   - Arquivo: `corrigir_mensagem_erro_estados.sh`
