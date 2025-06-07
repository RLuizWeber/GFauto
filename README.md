# GFauto - Sistema de Busca de Serviços Automotivos

## Visão Geral

O GFauto é uma plataforma que conecta usuários a fornecedores de serviços automotivos. O sistema permite que os usuários busquem serviços com base em localização (estado e cidade) e tipo de especialidade automotiva necessária.

## Estrutura do Projeto

O projeto é estruturado da seguinte forma:

```
GFauto/
├── app/                    # Páginas e rotas da aplicação
│   ├── api/                # Endpoints da API
│   ├── admin/              # Área administrativa
│   └── resultados/         # Página de resultados de busca
├── components/             # Componentes reutilizáveis
│   ├── admin/              # Componentes da área administrativa
│   ├── ui/                 # Componentes de interface
│   └── visitante/          # Componentes para visitantes
├── fluxo_visitante/        # Fluxo específico para visitantes
├── prisma/                 # Configuração e schema do Prisma
├── public/                 # Arquivos estáticos
└── scripts/                # Scripts utilitários
    └── db/                 # Scripts para manipulação do banco de dados
```

## Metodologia de Trabalho

Este projeto adota uma metodologia de trabalho baseada em scripts para garantir consistência e facilitar a manutenção:

1. **Desenvolvimento via Scripts**:
   - Scripts são criados para implementar novas funcionalidades ou corrigir problemas
   - Os scripts são salvos na pasta `corrigir` para aplicação posterior
   - Cada script inclui comentários detalhados explicando seu propósito e funcionamento

2. **Aplicação via Git Bash**:
   - Os scripts são executados via Git Bash pelo administrador do projeto
   - Após a execução, as alterações são commitadas e enviadas para o GitHub
   - A Vercel realiza o deploy automaticamente após o push

3. **Documentação Contínua**:
   - Cada alteração significativa é documentada no changelog
   - A documentação é atualizada para refletir as mudanças no sistema
   - Problemas encontrados são registrados para referência futura

## Problemas Conhecidos e Soluções

### 1. Problemas de Tipagem no Prisma

**Problema**: Erros de tipagem relacionados aos modelos do Prisma, especialmente:
- Propriedade 'cidadeId' não existe no tipo 'EspecialidadeWhereInput'
- Propriedade 'slug' obrigatória faltando no tipo 'EspecialidadeCreateInput'
- Propriedade 'fornecedor' não existe no tipo 'PrismaClient'

**Solução**: 
- Correção das consultas para remover filtros incompatíveis
- Adição de campos obrigatórios faltantes (como 'slug')
- Correção do nome do modelo (de 'fornecedor' para 'fornecedores')

### 2. Problemas no Formulário de Busca

**Problema**: Campos de texto não permitiam digitação livre e sugestões não apareciam corretamente.

**Solução**:
- Remoção do atributo `disabled={loading}` dos campos
- Implementação de eventos `onClick` e `onFocus` para mostrar sugestões
- Adição de lista completa de especialidades automotivas

### 3. Problemas de Espaçamento nos Filtros

**Problema**: Filtros aplicados na página de resultados não tinham espaçamento adequado.

**Solução**:
- Substituição da concatenação direta por separadores ` | `
- Implementação de `.filter(Boolean).join(' | ')` para garantir formatação consistente

### 4. Problemas de Acesso ao Banco de Dados

**Problema**: Impossibilidade de acessar diretamente o banco de dados da Vercel a partir de scripts locais.

**Solução**:
- Criação de endpoint de API seguro para popular o banco de dados
- Proteção do endpoint com chave de API
- Verificação para evitar duplicação de dados

## Documentação Centralizada

Para garantir um entendimento consistente do projeto, a documentação está organizada da seguinte forma:

1. **README.md**: Documento principal com visão geral do projeto
2. **/docs/**: Diretório com documentação detalhada
   - **/docs/api/**: Documentação das APIs
   - **/docs/componentes/**: Documentação dos componentes
   - **/docs/fluxos/**: Documentação dos fluxos de usuário
   - **/docs/problemas/**: Registro de problemas e soluções

## Referência Central: Resumo 01

O arquivo "Resumo 01" serve como referência central do projeto, contendo informações detalhadas sobre:
- Requisitos do sistema
- Decisões de arquitetura
- Fluxos de usuário
- Modelos de dados

**Importante**: Ao iniciar qualquer nova sessão de trabalho, sempre revisar o Resumo 01 para garantir alinhamento com os objetivos e decisões do projeto.

## Boas Práticas para Continuidade

1. **Revisão de Contexto**:
   - Analisar o Resumo 01 e outros documentos de referência no início de cada sessão
   - Solicitar um resumo do estado atual do projeto e das decisões técnicas já tomadas
   - Confirmar entendimento sobre a arquitetura e objetivos do GFauto

2. **Verificação de Código Existente**:
   - Examinar o schema.prisma atual e outros arquivos fundamentais antes de sugerir novas implementações
   - Confirmar a compatibilidade de qualquer nova sugestão com o código existente
   - Verificar se as sugestões seguem os padrões já estabelecidos no projeto

3. **Justificativas Técnicas**:
   - Explicar o "porquê" de cada abordagem sugerida
   - Fornecer análises de impacto para mudanças significativas
   - Alinhar cada decisão com os objetivos de longo prazo do projeto

4. **Checkpoints de Validação**:
   - Confirmar a consistência do código com o restante do sistema antes de implementar
   - Realizar verificações cruzadas entre componentes relacionados
   - Identificar possíveis pontos de falha ou inconsistências

## Scripts Disponíveis

1. **Correção de Digitação nos Campos**:
   - Arquivo: `corrigir_buscaform_digitacao.sh`
   - Função: Permite digitação livre em todos os campos do formulário

2. **Correção de Espaçamento nos Filtros**:
   - Arquivo: `corrigir_espacamento_filtros.sh`
   - Função: Adiciona espaçamento adequado entre os filtros aplicados

3. **População do Banco de Dados**:
   - Arquivo: `popular_fornecedores_autoeletricas.sh`
   - Função: Popula o banco com fornecedores de auto elétricas em Passo Fundo

4. **Endpoint de API para Popular Banco**:
   - Arquivo: `criar_api_popular_banco.sh`
   - Função: Cria endpoint seguro para popular o banco de dados

5. **Correção de Tipagem no Endpoint**:
   - Arquivo: `corrigir_tipagem_endpoint.sh`
   - Função: Corrige erro de tipagem no endpoint de API

6. **Correção de Tipagem na Especialidade**:
   - Arquivo: `corrigir_tipagem_especialidade.sh`
   - Função: Corrige erro de tipagem na criação de especialidade

7. **Correção de Tipagem no Slug da Especialidade**:
   - Arquivo: `corrigir_tipagem_especialidade_slug.sh`
   - Função: Adiciona campo slug obrigatório na criação de especialidade

8. **Correção de Mensagem de Erro dos Estados**:
   - Arquivo: `corrigir_mensagem_erro_estados.sh`
   - Função: Corrige exibição da mensagem de erro de carregamento dos estados

9. **Correção do Modelo Prisma para Fornecedores**:
   - Arquivo: `corrigir_modelo_prisma_fornecedores.sh`
   - Função: Corrige modelo Prisma no endpoint de API (fornecedor -> fornecedores)

10. **Atualização da Documentação**:
    - Arquivo: `atualizar_documentacao_github_final.sh`
    - Função: Atualiza toda a documentação do projeto no GitHub

## Próximos Passos

1. **Expandir Base de Dados**:
   - Adicionar mais cidades e especialidades
   - Incluir fornecedores reais em diferentes regiões

2. **Melhorar Interface de Resultados**:
   - Implementar paginação para grandes volumes de resultados
   - Adicionar filtros adicionais na página de resultados

3. **Implementar Avaliações de Usuários**:
   - Permitir que usuários avaliem e comentem sobre os fornecedores
   - Exibir média de avaliações na listagem de resultados

4. **Aprimorar Documentação**:
   - Criar documentação específica para cada componente
   - Implementar sistema de geração automática de documentação
   - Manter o Resumo 01 atualizado com as últimas decisões

## Ambiente de Desenvolvimento

Para configurar o ambiente de desenvolvimento:

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/GFauto.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env.local
   ```

4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Deploy

O projeto é automaticamente implantado na Vercel após cada push para a branch principal.

Para acessar a versão em produção, visite [https://gfauto.vercel.app](https://gfauto.vercel.app).
