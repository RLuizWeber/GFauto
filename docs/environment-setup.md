# Configuração do Ambiente de Desenvolvimento

Este documento descreve como configurar o ambiente de desenvolvimento para o projeto GFauto.

## Requisitos

- Node.js 18.x ou superior
- npm 9.x ou superior
- Git

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/GFauto.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd GFauto
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env.local
   ```

5. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

6. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Estrutura de Diretórios no Ambiente Windows

No ambiente de desenvolvimento Windows, os caminhos são mapeados da seguinte forma:

```
W:/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto/
```

Este é o diretório raiz do projeto, onde todos os arquivos e pastas estão localizados.

### Diretório de Scripts

Os scripts de correção e melhoria são armazenados em:

```
W:/A_Weber/Pai/Hostmachine/gfauto/githubVercel/corrigir/
```

## Fluxo de Trabalho com Git Bash

1. Navegue para a pasta "corrigir":
   ```bash
   cd /w/A_Weber/Pai/Hostmachine/gfauto/githubVercel/corrigir
   ```

2. Execute o script desejado:
   ```bash
   bash nome_do_script.sh
   ```

3. Navegue para a pasta do projeto:
   ```bash
   cd /w/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto
   ```

4. Adicione os arquivos modificados ao commit:
   ```bash
   git add caminho/para/arquivo
   ```

5. Crie o commit com uma mensagem descritiva:
   ```bash
   git commit -m "Descrição das alterações"
   ```

6. Envie as alterações para o GitHub:
   ```bash
   git push origin main
   ```

## Variáveis de Ambiente

As seguintes variáveis de ambiente são necessárias para o funcionamento do projeto:

```
DATABASE_URL="postgresql://usuario:senha@host:porta/banco"
NEXTAUTH_SECRET="chave-secreta-para-autenticacao"
NEXTAUTH_URL="http://localhost:3000"
```

## Banco de Dados

O projeto utiliza o Prisma como ORM para interagir com o banco de dados PostgreSQL.

Para configurar o banco de dados:

1. Certifique-se de que a variável `DATABASE_URL` está configurada corretamente no arquivo `.env.local`

2. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev
   ```

3. Para visualizar o banco de dados, você pode usar o Prisma Studio:
   ```bash
   npx prisma studio
   ```

## Deploy

O projeto é automaticamente implantado na Vercel após cada push para a branch principal.

Para acessar a versão em produção, visite [https://gfauto.vercel.app](https://gfauto.vercel.app).
