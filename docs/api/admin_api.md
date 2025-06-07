# API de Administração

Esta documentação descreve os endpoints de API disponíveis para administração do sistema GFauto.

## Endpoints Disponíveis

### Popular Banco de Dados

Endpoint para popular o banco de dados com fornecedores de exemplo.

**URL**: `/api/admin/popular-fornecedores`

**Método**: `GET`

**Parâmetros de Query**:
- `key` (obrigatório): Chave de API para autenticação

**Exemplo de Uso**:
```
https://gfauto.vercel.app/api/admin/popular-fornecedores?key=gfauto-admin-2025
```

**Resposta de Sucesso**:
```json
{
  "success": true,
  "estado": {
    "id": "...",
    "nome": "Rio Grande do Sul",
    "sigla": "RS"
  },
  "cidade": {
    "id": "...",
    "nome": "Passo Fundo",
    "estadoId": "..."
  },
  "especialidade": {
    "id": "...",
    "nome": "Auto Elétricas",
    "cidadeId": "..."
  },
  "fornecedoresPremium": [...],
  "fornecedoresCortesia": [...]
}
```

**Resposta de Erro**:
```json
{
  "error": "Mensagem de erro",
  "details": {}
}
```

**Notas**:
- Este endpoint verifica a existência de registros antes de criar novos, evitando duplicações
- A chave de API é necessária para evitar acessos não autorizados
- Em ambiente de produção, recomenda-se usar variáveis de ambiente para a chave de API
