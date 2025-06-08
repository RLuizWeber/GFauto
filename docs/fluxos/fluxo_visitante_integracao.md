# Documentação da Integração do Fluxo do Visitante - GFauto

## Visão Geral

Este documento descreve a integração completa do fluxo do visitante ao projeto GFauto, incluindo:

1. Modelagem de dados (schema.prisma)
2. APIs para busca dinâmica e rotação de anúncios
3. Componentes frontend
4. Configuração de rotas Next.js

## 1. Alterações no Schema Prisma

O schema.prisma foi estendido para incluir os seguintes modelos:

### Novos Modelos Adicionados:

- **Estado**: Armazena estados brasileiros (id, nome, sigla)
- **Cidade**: Armazena cidades vinculadas a estados (id, nome, estadoId)
- **Especialidade**: Armazena especialidades automotivas (id, nome, descricao, slug, icone)
- **RotacaoPremium**: Controla a rotação circular dos anúncios premium (id, especialidadeId, cidadeId, ultimaPosicao)
- **EspecialidadeDisponivel**: Rastreia especialidades disponíveis em cada cidade (id, cidadeId, especialidadeId)
- **ImagemAnuncio**: Armazena múltiplas imagens para cada anúncio (id, anuncioId, url, ordem)

### Modelo Anuncio Estendido:

O modelo Anuncio existente foi estendido com os seguintes campos:

- titulo, descricao, endereco, telefone, whatsapp, email, site
- plano (premium/cortesia)
- especialidadeId e cidadeId (com relacionamentos)
- imagemPrincipal, latitude, longitude
- dataExpiracao

## 2. APIs Implementadas

Foram implementadas as seguintes APIs:

### `/api/estados`
- **Método**: GET
- **Descrição**: Retorna a lista completa de estados brasileiros ordenados por nome
- **Arquivo**: `/app/api/estados/route.ts`

### `/api/cidades`
- **Método**: GET
- **Parâmetros**: estado_id (obrigatório)
- **Descrição**: Retorna a lista de cidades do estado especificado
- **Arquivo**: `/app/api/cidades/route.ts`

### `/api/especialidades`
- **Método**: GET
- **Parâmetros**: cidade_id (obrigatório)
- **Descrição**: Retorna a lista de especialidades disponíveis na cidade especificada
- **Arquivo**: `/app/api/especialidades/route.ts`

### `/api/anuncios`
- **Método**: GET
- **Parâmetros**: cidade_id, especialidade_id (obrigatórios), page, pageSize (opcionais)
- **Descrição**: Retorna anúncios filtrados por cidade e especialidade, com rotação circular para anúncios premium
- **Arquivo**: `/app/api/anuncios/route.ts`

### `/api/anuncios/[id]`
- **Método**: GET
- **Parâmetros**: id (na rota)
- **Descrição**: Retorna detalhes completos de um anúncio específico
- **Arquivo**: `/app/api/anuncios/[id]/route.ts`

## 3. Componentes Frontend

Foram implementados os seguintes componentes:

### Componentes Principais:

- **BuscaForm**: Formulário de busca em três etapas (Estado > Cidade > Especialidade)
- **HeroSection**: Banner principal da página inicial
- **ResultadosList**: Lista de resultados da busca com paginação
- **AnuncioCard**: Card de anúncio com layout em três colunas
- **Pagination**: Componente de paginação para resultados
- **LoadingResults**: Estado de carregamento para resultados

### Páginas:

- **Página Inicial** (`/app/page.tsx`): Página principal com formulário de busca
- **Página de Resultados** (`/app/resultados/page.tsx`): Exibe resultados da busca
- **Página de Detalhes do Anúncio** (`/app/anuncio/[id]/page.tsx`): Exibe detalhes completos de um anúncio

## 4. Sistema de Rotação Circular

O sistema de rotação circular para anúncios premium foi implementado na API `/api/anuncios` e funciona da seguinte forma:

1. Busca anúncios premium filtrados por cidade_id e especialidade_id
2. Busca ou cria um registro na tabela `rotacao_premium` para a combinação cidade+especialidade
3. Aplica a rotação com base na última posição registrada
4. Atualiza a posição para a próxima consulta
5. Adiciona os anúncios cortesia (sem rotação) após os premium

## 5. Fluxo de Navegação

O fluxo de navegação do visitante funciona da seguinte forma:

1. Usuário acessa a página inicial (`/`)
2. Seleciona estado, cidade e especialidade no formulário de busca
3. É redirecionado para a página de resultados (`/resultados?cidade_id=X&especialidade_id=Y`)
4. Visualiza os anúncios com rotação circular para premium
5. Pode clicar em um anúncio para ver detalhes (`/anuncio/[id]`)
6. Pode navegar entre páginas de resultados usando a paginação

## 6. Próximos Passos

1. Realizar testes completos do fluxo integrado
2. Implementar integração com biblioteca de mapas para exibir localização dos anúncios
3. Importar dados reais de estados e cidades brasileiros
4. Adicionar testes automatizados para garantir a qualidade do código
