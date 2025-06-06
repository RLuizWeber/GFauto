# Instruções para Popular o Banco de Dados

Este diretório contém scripts para popular o banco de dados com dados de exemplo para o GFauto.

## Script de Fornecedores de Auto Elétricas em Passo Fundo

### Opção 1: Usando Prisma (Recomendado)

Para executar o script usando Prisma, siga os passos abaixo:

1. Navegue até a pasta raiz do projeto:
   ```bash
   cd /w/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto
   ```

2. Execute o script usando o Node.js:
   ```bash
   node scripts/db/popular_fornecedores_autoeletricas.js
   ```

### Opção 2: Usando SQL Diretamente

Se preferir executar o SQL diretamente no banco de dados:

1. Acesse o banco de dados usando a ferramenta de sua preferência
2. Execute o conteúdo do arquivo `scripts/db/popular_fornecedores_autoeletricas.sql`

## Verificação

Após executar o script, você pode verificar se os dados foram inseridos corretamente:

1. Acesse a aplicação em [https://gfauto.vercel.app/](https://gfauto.vercel.app/)
2. Busque por "Auto Elétricas" em "Passo Fundo"
3. Verifique se os fornecedores premium e cortesia aparecem nos resultados
