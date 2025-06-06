# Documentação do Componente ResultadosList

## Visão Geral

O componente `ResultadosList` é responsável por exibir a lista de fornecedores nos resultados da busca. Este componente foi projetado para ser flexível, permitindo dois modos de operação:

1. **Modo Direto**: Recebe os fornecedores diretamente como prop
2. **Modo Busca**: Recebe parâmetros para buscar os fornecedores via API

## Props

| Prop | Tipo | Obrigatório | Descrição |
|------|------|------------|-----------|
| `fornecedores` | `Fornecedor[]` | Não | Lista de fornecedores a serem exibidos |
| `cidadeId` | `string` | Não | ID da cidade para busca de fornecedores |
| `especialidadeId` | `string` | Não | ID da especialidade para busca de fornecedores |
| `page` | `number` | Não | Número da página para paginação (padrão: 1) |

## Interface Fornecedor

```typescript
interface Fornecedor {
  id: string;
  nome: string;
  descricao: string;
  endereco: string;
  telefone: string;
  email: string;
  website: string;
  tipo: 'premium' | 'cortesia';
}
```

## Modos de Uso

### Modo Direto

Neste modo, os fornecedores são passados diretamente para o componente:

```jsx
import ResultadosList from '@/components/visitante/ResultadosList';

// Dentro do seu componente
const fornecedores = [/* array de fornecedores */];

return <ResultadosList fornecedores={fornecedores} />;
```

### Modo Busca

Neste modo, o componente busca os fornecedores via API com base nos parâmetros:

```jsx
import ResultadosList from '@/components/visitante/ResultadosList';

// Dentro do seu componente
return (
  <ResultadosList 
    cidadeId="cidade_id" 
    especialidadeId="especialidade_id" 
    page={1} 
  />
);
```

## Comportamento

1. **Carregamento**: Exibe um spinner de carregamento enquanto busca os fornecedores
2. **Erro**: Exibe uma mensagem de erro se a busca falhar
3. **Sem Resultados**: Exibe uma mensagem quando nenhum fornecedor é encontrado
4. **Resultados**: Exibe os fornecedores divididos em duas categorias:
   - **Premium**: Exibidos em destaque no topo
   - **Cortesia**: Exibidos abaixo dos Premium

## Estilização

O componente utiliza Tailwind CSS para estilização:
- Fornecedores Premium: Borda azul, badge "Premium"
- Fornecedores Cortesia: Estilo padrão sem destaque
- Layout responsivo: Grid de 1 coluna em dispositivos móveis, 2 colunas em tablets e 3 colunas em desktops

## Exemplo de Implementação

```jsx
// Na página de resultados
import { useState, useEffect } from 'react';
import ResultadosList from '@/components/visitante/ResultadosList';

export default function ResultadosPage() {
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Buscar fornecedores da API
    // ...
    setFornecedores(data);
    setLoading(false);
  }, []);
  
  if (loading) return <p>Carregando...</p>;
  
  return <ResultadosList fornecedores={fornecedores} />;
}
```
