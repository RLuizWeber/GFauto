Este README serve apenas para orientar o DESENVOLVEDOR quando for necessário criar um novo README para algum fluxo novo.

ORIENTAÇÃO COMPLETA PARA CRIAÇÃO DO README_fluxo_cliente_anunciante.md

Baseado no Modelo do /fluxo_app/README_fluxo_app.md e Diretrizes do GFauto/MEMORIADESESSAO.md

Weber, com base na análise que fiz do fluxo_cliente_anunciante no GitHub e usando o README_fluxo_app.md como modelo de referência, aqui está a orientação completa e estruturada para criar o README_fluxo_cliente_anunciante.md com as mesmas características de qualidade e abrangência.

ESTRUTURA OBRIGATÓRIA A SEGUIR

1. CABEÇALHO OBRIGATÓRIO

Markdown

// Caminho desse arquivo: W:/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto/fluxo_fluxo_cliente_anunciante
** Este arquivo tem que ser referenciado e referenciar o GFauto/README_geral.md

Leitura obrigatória: Leia todo o conteúdo desse README para obter um entendimento abrangente do fluxo_app/ e facilitar em atualizações de códigos de arquivos existentes e eventuais novos códigos.
Após a leitura total e com bastante atenção deste README_fluxo_app.md/ o Desenvolvedor verá que está num mundo tão pequeno que será quase impossível cometer erros. Por esse motivo deve ser continuamente atualizado.

O page.tsx na raíz /GFauto/app é a página index do Projeto GFauto. 

# README_fluxo_cliente_anunciante.md


2. SEÇÕES PRINCIPAIS OBRIGATÓRIAS

2.1 Propósito Principal do Módulo

O que documentar:

• Definir claramente que o fluxo_cliente_anunciante é responsável pela experiência dos Clientes/Anunciantes (fornecedores de serviços automotivos)
• Explicar as duas categorias: "Cortesia" e "Premium"
• Detalhar como os anunciantes se cadastram, gerenciam seus anúncios e aparecem na página de resultados
• Mencionar a integração com o sistema de pagamentos (Mercado Pago) para anunciantes Premium

2.2 Relação com a Estrutura Principal do Projeto

Verificações necessárias:

• Verificar se existe integração com /app/admin/ (painel administrativo)
• Verificar se há páginas específicas em /app/anuncio/
• Documentar a relação com a página de resultados (/app/resultados/)
• Verificar se há integração com APIs de pagamento (/api/create-payment)

2.3 Estrutura de Alto Nível

Investigar e documentar:

• Subpastas existentes dentro de fluxo_cliente_anunciante/
• Componentes específicos para cadastro e gerenciamento de anúncios
• Formulários de cadastro de anunciantes
• Interfaces de gerenciamento de anúncios
• Páginas de upgrade para Premium

3. COMPONENTES CHAVE A INVESTIGAR E DOCUMENTAR

3.1 Componentes de Cadastro

Buscar por:

• Formulários de cadastro de anunciantes
• Validação de dados empresariais
• Upload de imagens/logos
• Seleção de especialidades automotivas
• Definição de área de atuação (Estado/Cidade)

3.2 Componentes de Gerenciamento

Buscar por:

• Dashboard do anunciante
• Edição de informações do anúncio
• Gerenciamento de imagens
• Estatísticas de visualizações
• Controle de status (ativo/inativo)

3.3 Componentes de Pagamento

Buscar por:

• Seleção de planos (Cortesia vs Premium)
• Integração com Mercado Pago
• Processamento de pagamentos
• Confirmação de upgrade para Premium

4. RECURSOS DE IMAGEM E LOCALIZAÇÃO

4.1 Imagens Específicas do Módulo

Verificar em /public/images/:

• pag_anuncio/ - Imagens para páginas de anúncios
• logos_marcas/ - Logos de empresas anunciantes
• ui_elementos/ - Ícones para interface de anunciantes
• Imagens padrão para anunciantes sem logo próprio

4.2 Estrutura de Upload

Documentar:

• Como são armazenadas as imagens enviadas pelos anunciantes
• Validações de formato e tamanho
• Otimização automática de imagens
• Backup e versionamento de imagens

5. ESTILOS ASSOCIADOS

5.1 Arquivos CSS Específicos

Buscar por:

• Estilos para formulários de cadastro
• Estilos para dashboard do anunciante
• Estilos para exibição de anúncios na página de resultados
• Responsividade para dispositivos móveis

6. DEPENDÊNCIAS EXTERNAS E PRECEDÊNCIAS

6.1 Dependências do Projeto

Documentar:

• Dependências do Next.js e React (mesmas do fluxo_app)
• Prisma ORM para gerenciamento de dados de anunciantes
• Integração com Mercado Pago SDK
• Resend para emails transacionais (confirmações, notificações)

6.2 Dependências de Banco de Dados

Verificar no schema.prisma:

• Modelo Advertiser (já identificado)
• Relacionamentos com outras tabelas
• Campos obrigatórios e opcionais
• Índices para otimização de consultas

7. FLUXO DE NAVEGAÇÃO E INTERAÇÃO

7.1 Jornada do Cliente/Anunciante

Documentar o fluxo completo:

1.Descoberta: Como o anunciante chega ao GFauto
2 Cadastro: Processo de registro inicial (Cortesia)
3.Configuração: Preenchimento de dados do anúncio
4.Publicação: Anúncio ativo na página de resultados
5.Upgrade: Processo de upgrade para Premium (opcional)
6.Gerenciamento: Edição e manutenção do anúncio

7.2 Integração com Outros Módulos

Documentar conexões:

• Como anúncios aparecem no fluxo_pag_de_resultados
• Integração com fluxo_painel_admin para moderação
• Conexão com fluxo_pagto para processamento de pagamentos

8. FUNCIONALIDADES ESPECÍFICAS A DOCUMENTAR

8.1 Sistema de Categorização

Baseado no Projeto_GFauto.md:

• Especialidades automotivas disponíveis
• Sistema de tags e categorias
• Filtros por tipo de serviço
• Geolocalização (Estado/Cidade)

8.2 Sistema de Monetização

Documentar diferenças:

• Cortesia: Exposição simples, gratuita
• Premium: Exposição privilegiada, paga
• Valores e formas de pagamento
• Benefícios de cada categoria

9. VERIFICAÇÕES TÉCNICAS OBRIGATÓRIAS

9.1 No GitHub - Estrutura de Arquivos

Comandos para verificar:

Bash


# Listar estrutura completa
find fluxo_cliente_anunciante -type f -name "*.tsx" -o -name "*.ts" -o -name "*.css" -o -name "*.md"

# Verificar componentes
ls -la fluxo_cliente_anunciante/components/ 2>/dev/null || echo "Pasta components não encontrada"

# Verificar estilos
ls -la fluxo_cliente_anunciante/styles/ 2>/dev/null || echo "Pasta styles não encontrada"


9.2 No Banco de Dados - Schema Prisma

Verificar:

Bash


# Examinar modelo Advertiser
grep -A 20 "model Advertiser" prisma/schema.prisma

# Verificar relacionamentos
grep -B 5 -A 5 "Advertiser" prisma/schema.prisma


9.3 APIs Relacionadas

Verificar em /app/api/:

• Endpoints para CRUD de anunciantes
• API de upload de imagens
• API de processamento de pagamentos
• API de estatísticas para anunciantes

10. TEMPLATE DE SEÇÕES ESPECÍFICAS

10.1 Seção "Categorias de Anunciantes"

Markdown


## Categorias de Anunciantes

### Anunciante Cortesia
**Características:**
- Cadastro gratuito
- Exposição simples na página de resultados
- Informações básicas: nome, endereço, telefone
- Uma imagem/logo
- Posicionamento padrão nos resultados

### Anunciante Premium
**Características:**
- Cadastro pago (via Mercado Pago)
- Exposição privilegiada na página de resultados
- Informações completas: descrição detalhada, múltiplas imagens
- Posicionamento prioritário nos resultados
- Destaque visual diferenciado
- Estatísticas de visualizações


10.2 Seção "Integração com Pagamentos"

Markdown


## Integração com Sistema de Pagamentos

### Mercado Pago Integration
**Endpoint:** `/api/create-payment`
**Funcionalidade:** Processamento de upgrades para Premium
**Fluxo:**
1. Anunciante seleciona plano Premium
2. Sistema gera preferência de pagamento
3. Redirecionamento para Mercado Pago
4. Confirmação de pagamento
5. Upgrade automático do status do anunciante


11. OBSERVAÇÕES IMPORTANTES PARA O DESENVOLVEDOR

11.1 Diferenças do fluxo_app

• O fluxo_app foca no visitante (quem busca serviços)
• O fluxo_cliente_anunciante foca no fornecedor (quem oferece serviços)
• Ambos se conectam na página de resultados

11.2 Consistência com MEMORIADESESSAO.md

• Seguir exatamente a mesma estrutura do README_fluxo_app.md
• Incluir todas as seções obrigatórias
• Manter o mesmo nível de detalhamento
• Documentar dependências externas
• Incluir verificações no GitHub

11.3 Pontos de Atenção

• O arquivo atual no GitHub está vazio (0 bytes)
• Será necessário criar todo o conteúdo do zero
• Usar as informações do Projeto_GFauto.md como referência
• Verificar implementações existentes antes de documentar

12. CHECKLIST FINAL ANTES DA ENTREGA

- Linha obrigatória de leitura no início
- Todas as seções do modelo README_fluxo_app.md adaptadas
- Verificações técnicas realizadas no GitHub
- Dependências externas documentadas
- Relações com outros módulos explicadas
- Fluxo de navegação detalhado
- Diferenças Cortesia vs Premium explicadas
- Integração com pagamentos documentada
- Consistência com MEMORIADESESSAO.md mantida
- Data de atualização incluída
- Notas de manutenção adicionadas

Esta orientação garante que o README_fluxo_cliente_anunciante.md terá a mesma qualidade, abrangência e utilidade do README_fluxo_app.md, seguindo rigorosamente as diretrizes do MEMORIADESESSAO.md.

