# GFauto - Sistema de Busca de Serviços Automotivos

## Visão Geral

O Projeto GFauto atualmente na página https://www.gfauto.com.br está sendo reestruturado e implementado no novo projeto iniciando e https://gfauto.vercel.app/ que tem como principal objetivo expor para visitantes da web anunciantes de produtos e serviços automotivos no Brasil. O visitante na página https://gfauto.verce.app irá buscar pelo Estado / Cidade / O que procura? e será levado para a “página de resultados” onde estarão os anunciantes do Estado/Cidade dele que corresponderem à especialidade da informação que o visitante incluiu no campo “O que procura?”. Por outro lado teremos os Clientes/Anunciantes que serão divididos em duas categorias: “Cortesia” e “Premium” o “Cortesia” poderá figurar na “página de resultados” sem pagar com uma exposição simples, o “Premium” vai ser convidado a efetuar um pagamento escolhido e terá uma exposição privilegiada na “página de resultados”.

## Estrutura do Projeto

O projeto é estruturado da seguinte forma: (obs.: tem que rever isso e ajustar à realidade existente, principalmente na Vercel)

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

## Fluxos

O projeto possui os seguintes fluxos documentados:

1. [Fluxo do Visitante - Integração](./fluxos/fluxo_visitante_integracao.md)
2. [Instruções de Commit e Push](./fluxos/instrucoes_commit_push.md)
3. [Instrucoes de Instalação](./flusos/intrucoes_instalacao.me)

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
   - Cada alteração significativa é documentada no changelog (obs.: acrescentar o caminho real)
   - A documentação é atualizada para refletir as mudanças no sistema (obs.: acrescentar os caminhos reais)
   - Problemas encontrados são registrados para referência futura (obs.: acrescentar o caminho real)

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
   - **/docs/fluxos/**: Documentação dos fluxos de usuário (obs.; pasta fluxos está vazia)
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
   - Não danificar estruturas sobrescrevendo arquivos uteis, modificando aleatoriamente configurações/códigos já consolidados, etc. 
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

## Rotina de Trabalho

### Implementação de Alterações no Sistema

Para garantir consistência e rastreabilidade, todas as alterações no sistema seguem esta rotina:

1. **Criação de Scripts**:
   - Um arquivo script (.sh) é criado para cada alteração/ajuste
   - O script é salvo em `W:/A_Weber/Pai/Hostmachine/gfauto/githubVercel/corrigir/nome_do_arquivo.sh`
   - Cada script contém comentários detalhados explicando seu propósito e funcionamento

2. **Execução via Git Bash**:
   - Na pasta corrigir: `bash nome_do_arquivo.sh`
   - Na pasta GFauto:
     ```bash
     git add .
     git commit -m "Descrição clara da alteração"
     git push origin main
     ```

3. **Documentação**:
   - Todas as alterações são documentadas no changelog
   - As informações históricas são sempre preservadas e nunca substituídas
   - Novas informações são adicionadas às existentes, mantendo o histórico completo

### Padrões de Comunicação e Documentação

1. **Caminhos de Arquivos**:
   - Sempre usar o formato do ambiente Windows local nas comunicações e documentação:
     `W:\A_Weber\Pai\Hostmachine\gfauto\githubVercel\GFauto\...`
   - Evitar usar caminhos do ambiente sandbox nas comunicações
   
 2. **Environent Variables (Vercel)
Chaves implementadas no ambiente Vercel (conferir e ir anotando ao lado se já foi e onde aplicada/testada

1. DATABESE_URL
 - A variável `DATABASE_URL` está corretamente configurada no ambiente da Vercel
   - Esta configuração confere com a chave no arquivo `.env` na raiz do projeto
2. ADMIN_EMAIL (email do yahoo)
3. GF_PRIMARY_ADMIN_EMAIL
4. GFAUTO_TEST_VAR
5. VERCEL_IGNORE_ENV_CACHE = 1
6. MERCADOPAGO_WEBHOOK_SECRET (já testada com pagto efetuado na Vercel https://gfauto.vercel.app/api/webhook/mercadopago)
7. MP_ACCESS_TOKEN (já testada com pagto efetuado na Vercel https://gfauto.vercel.app/api/webhook/mercadopago)
8. BASE_URL
9. RESEND_API_KEY (chave testada e funcionando)
RESEND Implemente o código abaixo para enviar seu primeiro email:
"" import { Resend } from 'resend';
const resend = new Rese4nd('minha chave');

resend.emails.send({
	from: 'onboarding@resend.dev',
	to: rluizweber@yahoo.com.br',
	subject: 'Hello World',
	html: '<p>Congrats on sendingo your <strong>first email</strong>!</p>'
	});  ""

3. **Orientações para Comunicação**:
   - Sempre apresentar a sequência completa de comandos em ordem cronológica
   - Destacar claramente cada etapa da rotina de trabalho
   - Verificar se todas as etapas foram incluídas antes de enviar a mensagem
   - Garantir que o primeiro passo (execução do script na pasta corrigir) seja sempre mencionado

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
   git clone Repositório Gfauto: https://github.com/RLuizWeber/GFauto.git
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

## 🧠 CAMPOS INTELIGENTES - ESPECIFICAÇÕES TÉCNICAS

### **Campo Estado:**
- ✅ **Autocompletar:** Aceita siglas (RS) ou nomes completos (Rio Grande do Sul)
- ✅ **Sugestões:** Filtra em tempo real conforme digitação
- ✅ **Base de dados:** Todos os 27 estados brasileiros
- ✅ **Formato exibição:** "RS - Rio Grande do Sul"

### **Campo Cidade:**
- ✅ **Dependência:** Só ativa após seleção do estado
- ✅ **Filtro:** Mostra apenas cidades do estado selecionado
- ✅ **Validação:** Impede seleção de cidade de outro estado
- ✅ **Erro:** Alerta se cidade não pertence ao estado
- ✅ **Expansão:** Base de dados crescerá conforme demanda

### **Campo "O que Procura":**
- ✅ **Mapeamento inteligente:** "farol quebrado" → "Auto Elétricas"
- ✅ **Opções iniciais:** 10 especialidades principais
- ✅ **Expansível:** Sistema preparado para crescimento diário
- ✅ **Busca flexível:** Aceita termos técnicos e coloquiais

### **Considerações para Grandes Cidades:**
- 🎯 **Cidades > 1.500.000 hab:** Implementar busca por proximidade (10km)
- 🎯 **Geolocalização:** Usar localização do visitante
- 🎯 **Performance:** Otimizar para grandes volumes de dados

### **Página de Resultados:**
- 🔗 **URL:** `/resultados?estado=RS&cidade=Passo+Fundo&especialidade=Auto+Elétricas`
- 🔗 **Parâmetros:** estado (sigla), cidade (nome), especialidade (nome completo)

### **Histórico de Funcionamento:**
- ✅ **CONFIRMADO:** Página com mc4.png já funcionou em https://gfauto.vercel.app/
- ✅ **Objetivo:** Recriar funcionalidade com as 3 imagens (mc4.png, logo_gf.png, image001.jpg)
- ✅ **Status atual:** Página `/pagina-correta` funcionando perfeitamente


## 🎨 NOVO LAYOUT MODERNO - PÁGINA /PAGINA-CORRETA

### **Implementação realizada em:** $(date '+%d/%m/%Y %H:%M:%S')

### **ESTRUTURA DO NOVO LAYOUT:**

#### **1. Header Azul (Seção Superior):**
- ✅ **Logo principal:** `logo.png` (200px altura proporcional)
- ✅ **Texto principal:** "Bem Vindo!" (fonte grande, negrito)
- ✅ **Texto descritivo:** "Acesse recursos exclusivos e informações detalhadas sobre serviços automotivos em sua região."
- ✅ **Background:** Gradiente azul (blue-500 to blue-600)
- ✅ **Layout:** Logo à esquerda, textos à direita (responsivo)

#### **2. Seção Central (Fundo Cinza Claro):**
- ✅ **Título principal:** "Uma Proposta Ganha-Ganha" (azul, grande)
- ✅ **Subtítulo:** "Em que todos os envolvidos ganham." (azul médio)
- ✅ **Texto descritivo:** "Encontre os melhores serviços para seu veículo na sua cidade. Pesquise oficinas, autopeças, concessionárias e muito mais."
- ✅ **3 Veículos lado a lado:**
  - `image001.jpg` (moto azul - 150px)
  - `image003.jpg` (carro vermelho - 150px) 
  - `image005.jpg` (carro branco - 150px)

#### **3. Tarja Verde (Seção do Formulário):**
- ✅ **Background:** Verde (green-500)
- ✅ **Título:** "Começar Agora" (branco, centralizado)
- ✅ **Formulário:** Caixa branca com cantos arredondados (rounded-2xl)
- ✅ **3 Campos na mesma linha:**
  - Estado (autocompletar RS/Rio Grande do Sul)
  - Cidade (habilitado após selecionar estado)
  - O que procura? (mapeamento inteligente)
- ✅ **Botão:** "Buscar Serviços" (verde escuro, hover effects)

### **FUNCIONALIDADES MANTIDAS:**
- ✅ **Autocompletar** funcionando nos 3 campos
- ✅ **Campo cidade** habilitando após selecionar estado
- ✅ **Validação** impedindo erros de cidade/estado
- ✅ **Mapeamento inteligente** de especialidades
- ✅ **Redirecionamento** para página de resultados

### **CARACTERÍSTICAS TÉCNICAS:**
- ✅ **Framework:** Next.js + React + TypeScript
- ✅ **Estilização:** TailwindCSS
- ✅ **Responsividade:** Mobile-first design
- ✅ **Acessibilidade:** Labels adequados, contraste de cores
- ✅ **Performance:** Imagens otimizadas, lazy loading

### **IMAGENS UTILIZADAS:**
- 📁 `/public/images/fluxo_visitante/logo.png` (200px)
- 📁 `/public/images/fluxo_visitante/image001.jpg` (150px)
- 📁 `/public/images/fluxo_visitante/image003.jpg` (150px)
- 📁 `/public/images/fluxo_visitante/image005.jpg` (150px)

### **ARQUIVO MODIFICADO:**
- 📁 `/components/visitante/HeroSectionCorreto.tsx`

### **URL DE TESTE:**
- 🌐 https://gfauto.vercel.app/pagina-correta


## 🎨 LAYOUT FINAL IMPLEMENTADO - $(date +%Y-%m-%d)

### Baseado em AjustesSolicitados.txt:
- ✅ **Header azul** com logo.png (200px) + textos "Bem Vindo!"
- ✅ **Seção central** duas colunas (textos + 3 veículos 150px)
- ✅ **Tarja verde** cantos arredondados + 3 campos linha
- ✅ **Design responsivo** moderno profissional
- ✅ **Funcionalidades mantidas** (autocompletar, validação)

### Imagens utilizadas:
- logo.png (200px altura proporcional)
- image001.jpg (moto azul - 150px)
- image003.jpg (carro vermelho - 150px) 
- image005.jpg (carro branco - 150px)

### Página: https://gfauto.vercel.app/pagina-correta

