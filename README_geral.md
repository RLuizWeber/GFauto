//W:/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto/

Obrigatório observar: Este conteúdo precisa ser atualizado (isso significa acrescentar itens importantes e só excluir ou subscrever com certeza de obsolescência)

# 📱 PROJETO GFAUTO

## 📅 Última Atualização
12/06/2025

## 🔍 VISÃO GERAL
O Projeto GFauto atualmente na página https://www.gfauto.com.br está sendo reestruturado e implementado no novo projeto iniciando e https://gfauto.vercel.app/ que tem como principal objetivo expor para visitantes da web anunciantes de produtos e serviços automotivos no Brasil.

O SITE DO PROJETO GFAUTO BUSCA:

• Conectar internautas e usuários de redes sociais, visitantes no site do Projeto GFauto proprietários de veículos automotores (como carros, motos, caminhões, etc.) a fornecedores das mais variadas especialidades do ramo automotivo englobando fabricação, vendas e distribuição, manutenção e serviços especializados, tecnologia e inovação, mobilidade e transporte, na área  em seus Estados e suas cidades com o intuito de facilitar aos internautas/visitantes a pesquisa de serviços automotivos, e de o Cliente/Anunciante ser encontrado.
Essa conexão se dará quando o internauta estiver procurando na sua cidade um fornecedor para um problema a ser resolvido no veículo dele. Ele vai informar o “Estado” e a “Cidade” onde ele está e “O que procura?” e então será levado para uma página de resultados da especialidade na cidade dele onde estarão figurando os fornecedores para o caso “O que procura?” que ele informou. Por outro lado teremos os Clientes/Anunciantes que serão divididos em duas categorias: "Cortesia" e "Premium" o "Cortesia" poderá figurar na "página de resultados" sem pagar com uma exposição simples, o "Premium" vai ser convidado a efetuar um pagamento escolhido e terá uma exposição privilegiada na "página de resultados".

## 👨‍💻 EQUIPE DO PROJETO
QUEM ESTÁ TRABALHANDO NO PROJETO GFAUTO:

1. O **Desenvolvedor**: Manus Agente(AI) que deve assumir o papel, obter conhecimento e se comportar como um Profissional Sênior com as habilidades de Engenheiro de Software, Analista de Sistemas, Desenvolvedor de Softwares, Programador de Sistemas. Focado no ambiente de desenvolvimento do Projeto GFauto.

2. O ** Weber**: É o dono/admin do projeto que vai estar interagindo com o Desenvolvedor, recebendo do Desenvolvedor a orientação para enviar os códigos para o GitHub via Git Hash, verificando os Deploys na Vercel e fazendo as checagens via navegador web do resultado obtidos na Vercel.com

O Projeto GFauto está sendo construído desde o início por Manus e Weber no ano de 2025.

DEFINIÇÃO DO AMBIENTE DE DESENVOLVIMENTO E FLUXO: O "AMBIENTE DE TRABALHO" CONSTA DE:

1. Sandbox do Desenvolvedor;
2. "Meu Local" a máquina windows do Weber; W:\GFauto
3. Repositório GigHub público: https://github.com/RLuizWeber/GFauto.git 
4. Hospedagem Vercel.com https://gfauto.vercel.app/

OBRIGATÓRIO:
Antes de o Desenvolvedor fazer qualquer alteração em qualquer Módulo/fluxo deve obter o conhecimento do respectivo README

## 🚀 TECNOLOGIAS UTILIZADAS
- **Frontend:** Next.js, React, TailwindCSS
- **Backend:** Prisma
- **Hospedagem:** Vercel
- **Next.js:** Framework de desenvolvimento web 
- **Autenticação:** Senha forte e 2FA para painel admin
- **Resend:** Plataforma de envio de e-mails
- **Mercado Pago** Plataforma de pagamentos digitais

## 📋 ESTRUTURA DO PROJETO

### Estrutura Modular por Páginas
O projeto segue uma estrutura modular organizada por páginas/fluxos: (Obs.: Falta o Desenvolvedor ajustar considerando o ambiente GitHub)

```
GFauto/
├── app/                      # Páginas do Next.js
│   └── page.tsx              # Página principal (raiz do site)
├── fluxo_app/                # Módulo da página principal
│   ├── components/           # Componentes específicos
│   ├── styles/               # Estilos específicos
│   └── README_fluxo_app.md             # Documentação específica
├── fluxo_anunciante/         # Módulo da página do anunciante
├── fluxo_admin/              # Módulo do painel administrativo
├── backups/                  # Backups e exclusões
│   └── exclusoes/            # Arquivos excluídos organizados por data
└── README_geral.md                 # Documentação geral do projeto
```

## 📝 REGRAS DO PROJETO

### 1. Estrutura Modular por Páginas
- Cada página tem sua própria pasta/módulo com todos os componentes necessários
- Exemplo: `fluxo_app`, `fluxo_anunciante`, `fluxo_admin`
- Componentes específicos de cada pasta módulo/fluxo  ficam dentro da pasta do fluxo: ex.: `fluxo_app/components/`
- CSS deve ficar dentro da pasta do módulo correspondente

### 2. Independência entre Fluxos
- Sem componentes compartilhados entre fluxos
- Cada fluxo deve ser independente para facilitar manutenção

### 3. Página Principal na Raiz
- A página principal do site fica em `app/page.tsx`
- Importa componentes do fluxo correspondente

### 4. Processo de Trabalho
- Priorizar diálogo e alinhamento conceitual antes de implementação
- Implementar apenas após total clareza e consenso
- Revisão só é possível após deploy na Vercel

### 5. Gestão de Arquivos Obsoletos em "Nossos Ambientes"
- "Nossos Ambientes" refere-se a: "Meu Local", GitHub, Vercel e Sandbox 
- Arquivos obsoletos devem ser identificados, verificados, documentados e excluídos
- Usar pasta central para exclusões: `/backups/exclusoes/YYYYMMDD_HHMMSS/`
- Confirmar exclusão em todos os ambientes

### 6. Estrutura e Atualização de READMEs
- Cabeçalho com metadados (nome, data, responsáveis)
- Seção de histórico no final com atualizações datadas
- READMEs departamentais para cada módulofluxo
- Revisão e limpeza periódica de informações obsoletas

## 📅 HISTÓRICO DE ATUALIZAÇÕES

### 12/06/2025
- Implementada estrutura modular por páginas
- Definidas regras para gestão de arquivos obsoletos
- Padronizada estrutura de READMEs do Projeto GFauto
- Criada pasta central para exclusões

### 11/06/2025
- Criado sistema de memória de sessão (MEMORIADESESSAO.md)
- Implementada metodologia de verificação factual
- Corrigido resumo do projeto baseado na documentação oficial
