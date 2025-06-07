# API de Administração

Este documento descreve os endpoints de API disponíveis para administração do GFauto.

## Endpoint para Popular o Banco de Dados

### `GET /api/admin/popular-fornecedores`

Este endpoint permite popular o banco de dados com fornecedores de exemplo para demonstração e testes.

#### Parâmetros

| Nome | Tipo | Descrição |
|------|------|-----------|
| key  | string | Chave de API para autenticação. Valor: `gfauto-admin-2025` |

#### Exemplo de Uso

```
https://gfauto.vercel.app/api/admin/popular-fornecedores?key=gfauto-admin-2025
```

#### Resposta de Sucesso

```json
{
  "success": true,
  "message": "Banco de dados populado com sucesso",
  "data": {
    "estado": {
      "id": "clq1a2b3c4d5e6f7g8h9i0",
      "nome": "Rio Grande do Sul",
      "sigla": "RS"
    },
    "cidade": {
      "id": "clq1a2b3c4d5e6f7g8h9i1",
      "nome": "Passo Fundo",
      "estadoId": "clq1a2b3c4d5e6f7g8h9i0"
    },
    "especialidade": {
      "id": "clq1a2b3c4d5e6f7g8h9i2",
      "nome": "Auto Elétricas",
      "slug": "auto-eletricas"
    },
    "fornecedoresPremium": 3,
    "fornecedoresCortesia": 4
  }
}
```

#### Resposta de Erro

```json
{
  "error": "Chave de API inválida"
}
```

#### Notas de Segurança

- Este endpoint é protegido por uma chave de API simples
- Em um ambiente de produção real, seria recomendável implementar um sistema de autenticação mais robusto
- O endpoint verifica a existência de registros antes de criar novos, evitando duplicação de dados

#### Implementação

O endpoint está implementado em `app/api/admin/popular-fornecedores/route.ts` e utiliza o Prisma para interagir com o banco de dados.

```typescript
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');
  
  if (key !== 'gfauto-admin-2025') {
    return NextResponse.json({ error: 'Chave de API inválida' }, { status: 401 });
  }
  
  try {
    // Código para popular o banco de dados
    // ...
    
    return NextResponse.json({
      success: true,
      message: 'Banco de dados populado com sucesso',
      data: {
        estado,
        cidade,
        especialidade,
        fornecedoresPremium: 3,
        fornecedoresCortesia: 4
      }
    });
  } catch (error) {
    console.error('Erro ao popular banco de dados:', error);
    return NextResponse.json({ error: 'Erro ao popular banco de dados' }, { status: 500 });
  }
}
```
