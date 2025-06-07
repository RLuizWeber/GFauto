# Populando o Banco de Dados da Vercel

Este diretório contém scripts para popular o banco de dados da aplicação GFauto com dados de exemplo.

## Problema de Acesso Direto ao Banco

Não é possível acessar diretamente o banco de dados da Vercel a partir de scripts locais, pois:

1. O banco de dados está em um ambiente protegido
2. As credenciais não estão disponíveis localmente
3. Há restrições de firewall e rede

## Solução: API Endpoint

Para resolver esse problema, criamos um endpoint de API seguro que pode ser chamado para popular o banco de dados:

```
/api/admin/popular-fornecedores
```

Este endpoint é protegido por uma chave de API e só pode ser acessado com a chave correta.

## Como Popular o Banco de Dados

### Método 1: Usando o Script HTML

1. Faça o deploy da aplicação na Vercel (incluindo o novo endpoint)
2. Abra o arquivo `popular_banco_via_api.html` em um navegador
3. Clique no botão "Popular Banco de Dados"
4. Verifique o resultado na tela

### Método 2: Usando o Navegador Diretamente

1. Faça o deploy da aplicação na Vercel
2. Acesse a URL:
   ```
   https://gfauto.vercel.app/api/admin/popular-fornecedores?key=gfauto-admin-2025
   ```
3. Verifique o resultado JSON retornado

## Verificando os Resultados

Após popular o banco de dados, você pode verificar se os dados foram inseridos corretamente:

1. Acesse a página inicial do GFauto
2. Selecione:
   - Estado: Rio Grande do Sul
   - Cidade: Passo Fundo
   - O que procura?: Auto Elétricas
3. Clique em "Buscar Serviços"
4. Verifique se os fornecedores aparecem nos resultados

## Segurança

Em um ambiente de produção real, recomenda-se:

1. Usar uma chave de API mais complexa
2. Armazenar a chave em variáveis de ambiente
3. Implementar autenticação mais robusta
4. Remover o endpoint após o uso inicial

Este endpoint foi criado apenas para facilitar a população inicial do banco de dados para demonstração.
