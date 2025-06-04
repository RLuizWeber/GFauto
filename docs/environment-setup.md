# Guia de Configuração do Ambiente - GFauto

**Última atualização:** 04/06/2025 20:45

## Índice

1. [Requisitos](#requisitos)
2. [Configuração do Ambiente Local](#configuração-do-ambiente-local)
3. [Estrutura de Diretórios](#estrutura-de-diretórios)
4. [Variáveis de Ambiente](#variáveis-de-ambiente)
5. [Comandos Úteis](#comandos-úteis)

## Requisitos

- Node.js 18.x ou superior
- Git
- Ambiente Windows com Git Bash
- Acesso ao GitHub
- Acesso à Vercel

## Configuração do Ambiente Local

1. Clone o repositório:
   ```bash
   git clone https://github.com/RLuizWeber/GFauto.git
   cd GFauto
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env.local
   # Edite o arquivo .env.local com suas configurações
   ```

4. Execute o projeto localmente:
   ```bash
   npm run dev
   ```

## Estrutura de Diretórios

### Ambiente Windows com Git Bash

O projeto está estruturado da seguinte forma no ambiente Windows:

- Diretório base: `W:\A_Weber\Pai\Hostmachine\gfauto\githubVercel\GFauto`
- Diretório de componentes: `W:\A_Weber\Pai\Hostmachine\gfauto\githubVercel\GFauto\components`
- Diretório de páginas: `W:\A_Weber\Pai\Hostmachine\gfauto\githubVercel\GFauto\app`
- Diretório de scripts: `W:\A_Weber\Pai\Hostmachine\gfauto\githubVercel\corrigir`

### Mapeamento para Git Bash

No Git Bash, os caminhos são mapeados da seguinte forma:

- Diretório base: `/w/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto`
- Diretório de componentes: `/w/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto/components`
- Diretório de páginas: `/w/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto/app`
- Diretório de scripts: `/w/A_Weber/Pai/Hostmachine/gfauto/githubVercel/corrigir`

## Variáveis de Ambiente

O projeto utiliza as seguintes variáveis de ambiente:

- `DATABASE_URL`: URL de conexão com o banco de dados
- `NEXTAUTH_SECRET`: Chave secreta para autenticação
- `NEXTAUTH_URL`: URL base da aplicação
- [Adicionar mais variáveis conforme necessário]

## Comandos Úteis

- Iniciar o servidor de desenvolvimento:
  ```bash
  npm run dev
  ```

- Construir o projeto para produção:
  ```bash
  npm run build
  ```

- Executar o projeto em modo de produção:
  ```bash
  npm start
  ```

- Gerar o cliente Prisma:
  ```bash
  npx prisma generate
  ```

- Executar migrações do banco de dados:
  ```bash
  npx prisma migrate dev
  ```
