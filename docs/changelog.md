# Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [0.4.0] - 2025-06-07

### Adicionado
- Endpoint de API para popular o banco de dados com fornecedores de exemplo
- Documentação detalhada da API de administração
- Suporte para dois modos de uso no componente ResultadosList

### Corrigido
- Erro de tipagem no endpoint de API para popular o banco de dados
- Problema que impedia a digitação nos campos de texto do formulário de busca
- Espaçamento incorreto nos filtros aplicados na página de resultados

## [0.3.0] - 2025-06-06

### Adicionado
- Lista completa de 57 especialidades automotivas nas sugestões
- Sugestões imediatas ao clicar ou focar nos campos
- Documentação do componente ResultadosList

### Corrigido
- Erro de tipagem que causava falha no deploy
- Refatoração da página de resultados para melhor manutenibilidade

## [0.2.0] - 2025-06-05

### Adicionado
- Formulário de busca com autocomplete para todos os campos
- Validação do formulário para garantir preenchimento de todos os campos
- Página de resultados com exibição de fornecedores

### Corrigido
- Problemas de responsividade em dispositivos móveis
- Melhorias de acessibilidade nos campos de formulário

## [0.1.0] - 2025-06-01

### Adicionado
- Estrutura inicial do projeto
- Configuração do Next.js e Prisma
- Integração com banco de dados PostgreSQL via Neon
- Configuração de deploy automático na Vercel
