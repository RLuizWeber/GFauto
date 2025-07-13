// W:/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto (OK)
// Este será o único arquivo para definir o Projeto GFauto.

Obrigatório observar: Este conteúdo precisa ser atualizado (isso significa acrescentar itens importantes e só excluir ou subscrever com certeza de obsolescência)

# 📱 PROJETO GFAUTO

## 📅 Última Atualização
29/06/2025

## 🔍 VISÃO GERAL, RESUMO e OBJETIVO DO PROJETO GFAUTO
O Projeto GFauto atualmente na página https://www.gfauto.com.br está sendo reestruturado e implementado no novo projeto iniciando e https://gfauto.vercel.app/ que tem como principal objetivo expor para visitantes da web anunciantes de produtos e serviços automotivos no Brasil.
O Site do Projeto GFauto busca:
- Conectar internautas e usuários de redes sociais, visitantes no site do Projeto GFauto proprietários de veículos automotores (como carros, motos, caminhões, etc.) a fornecedores das mais variadas especialidades do ramo automotivo englobando fabricação, vendas e distribuição, manutenção e serviços especializados, tecnologia e inovação, mobilidade e transporte, na área  em seus Estados e suas cidades com o intuito de facilitar aos internautas/visitantes a pesquisa de serviços automotivos, e de o Cliente/Anunciante ser encontrado. 
Essa conexão se dará quando o internauta estiver procurando na sua cidade um fornecedor para um problema a ser resolvido no veículo dele. Ele vai informar o “Estado” e a “Cidade” onde ele está e “O que procura?” e então será levado para uma página de resultados da especialidade na cidade dele onde estarão figurando os fornecedores para o caso “O que procura?” que ele informou. Por outro lado teremos os Clientes/Anunciantes que serão divididos em duas categorias: "Cortesia" e "Premium" o "Cortesia" poderá figurar na "página de resultados" sem pagar com uma exposição simples, o "Premium" vai ser convidado a efetuar um pagamento escolhido e terá uma exposição privilegiada na "página de resultados".

## 👨‍💻 EQUIPE DO PROJETO
QUEM ESTÁ TRABALHANDO NO PROJETO GFAUTO:

1. O **Desenvolvedor**: Manus Agente(AI) que deve assumir o papel, obter conhecimento e se comportar como um Profissional Sênior Sério e responsável com as habilidades de excelente interpretação de textos, Engenheiro de Software, Analista de Sistemas, Desenvolvedor de Softwares, Web Designer, conhecedor de códigos, Programador de Sistemas. Focado no ambiente de desenvolvimento do Projeto GFauto.

2. O ** Weber**: É o idealizador dono/admin do projeto que vai estar interagindo com o Desenvolvedor, recebendo do Desenvolvedor os códigos e a orientação para enviar os códigos para o GitHub via Git Hash, verificando os Deploys na Vercel e fazendo as checagens via navegador web do resultado obtidos na Vercel.com

O Projeto GFauto está sendo construído desde o início por Manus e Weber no ano de 2025.

DEFINIÇÃO DO AMBIENTE DE DESENVOLVIMENTO E FLUXO: O "AMBIENTE DE TRABALHO" CONSTA DE:

1. Sandbox do Desenvolvedor;
2. "Meu Local" a máquina windows do Weber; W:\GFauto
3. Repositório GigHub público: https://github.com/RLuizWeber/GFauto.git 
4. Hospedagem Vercel.com https://gfauto.vercel.app/

Obs.: Importante: Todas as páginas do domínio www.gfauto.com.br mostradas nesse documento são apenas ilustrativas.

OBRIGATÓRIO:
Antes de o Desenvolvedor fazer qualquer alteração em qualquer Módulo/fluxo deve obter o conhecimento do respectivo README.

## 🚀 TECNOLOGIAS UTILIZADAS
- **Frontend:** Next.js 14+ com App Router, React 18+, TypeScript, Tailwind CSS
- **Backend:** Prisma
- **Hospedagem:** Vercel (com deploy automático via GitHub).
- **Banco de Dados:** Vercel Postgres com Prisma ORM.
- **Next.js:**  Framework de desenvolvimento web com App Router (estrutura definida em README_next.js.md) 
- **Autenticação:** Senha forte e 2FA para painel admin
APIs Externas Integradas:
- **Resend:** Plataforma de envio de e-mails. Para envio de e-mails transacionais (domínio gfauto.com.br verificado).
- **Mercado Pago** Plataforma de pagamentos digitais. Para processamento de pagamentos (Testado e Ok).

**ESTRUTURA NEXT.JS APP ROUTER:**
O projeto segue rigorosamente a estrutura definida no README_next.js.md localizado na raiz do projeto. TODAS as rotas e páginas DEVEM estar dentro de GFauto/app/ seguindo as convenções do Next.js 14+ App Router.

## Progresso
•	Projeto Next.js no GitHub (RLuizWeber/GFauto) com deploy na Vercel (https://gfauto.vercel.app) .
•	Conexão com Vercel Postgres via Prisma estabelecida.
•	Modelo Advertiser definido no schema.prisma e migrações aplicadas.
•	Rotas de API funcionais:
	•	/api/send-email (Resend).
	•	/api/create-payment (Mercado Pago).
•	Variáveis de ambiente para chaves de API e URLs base configuradas e funcionando na Vercel.
•	Environment Variables (Variáveis de Ambiente)
	•	DATABASE_URL										- conferido e validado
	•	ADMIN_EMAIL											- rluizweber@yahoo.com.br
	•	GF_PRIMARY_ADMIN_EMAIL					- rluizweber@yahoo.com.br
	•	GFAUTO_TEST_VAR									- "test ok"
	•	VERCEL_IGNORE_ENV_CACHE				- 1
	•	MERCADOPAGO_WEBHOOK_SECRET	- conferido e validado
	•	MP_ACCESS_TOKEN								- conferido e validado
	•	BASE_URL													- https://gfauto.vercel.app
	•	RESEND_API_KEY									- conferido e validado

## Segurança
•	Uso de PATs para GitHub e variáveis de ambiente seguras na Vercel.
•	SSL fornecido pela Vercel.
•	Pontos para atenção futura: Autenticação de usuários na aplicação, autorização detalhada, proteção contra vulnerabilidades web comuns (XSS, CSRF), rate limiting.

## 📋 ESTRUTURA DO PROJETO

A Estrutura de Pastas pode ser encontrada em:
1. Completo: 
- W:\A_Weber\Pai\Hostmachine\gfauto\githubVercel\GFauto/mapa_pastas_GFauto.md
- W:\A_Weber\Pai\Hostmachine\gfauto\githubVercel\gfauto-repo/mapa_pastas_gfauto_repo.md

### Estrutura Modular por Páginas
O projeto segue uma estrutura modular organizada por páginas seguindo App Router: (Obs.: Verificar e ajustar conforme GFauto/README_next.js.md)
- Nomes de tabelas, campos, etc.. devem seguir o padrão Língua Brasileira.para qualqer nova implementação a partir de 12/07/2025. Os anteriores podem permanecer até resolvermos manter.

## EXISTENTE, Obrigatório: (Verificar e se ajustar ao GFauto/README_next.js.md)

| **COLUNA A:** EXISTE 		+ COMENTÁRIOS |

### **📁 RAIZ DO PROJETO**
| **Existente** (atualizado em: 07/07/2025)		|  ** + Comentários**

| `GFauto/` 											| 
| `├── README_next.js.md`				|  **ESTRUTURA OFICIAL Next.js App Router** ⭐ |
| `├── app/` 										|  Pasta principal do Next.js App Router |
| `│   ├── cadastro/`						|  ROTA: /cadastro |
| `│   ├── planos/`							|  ROTA: /planos |
| `│   ├── pagtos/`							|  ROTA: /pagtos (pagamentos) |
| `│   ├── anunciante/`					|  ROTA: /anunciante | (está "anuncio" no gitHub, podemos alterar para "anunciante"?
| `│   ├── admin/`							|  ROTA: /admin |
| `│   ├── resultados/`					|  ROTA: /resultados |
| `│   ├── api/`								|  APIs do backend |
| `│   └── pagina-correta/`				|  Ver se está funcional ou não |
| `├── backups/` 								|  Conforme política do MEMORIADESESSAO |
| `├── components/` 							|  Componentes globais |
| `├── docs/` 										|  Documentação |
| `├── GFauto/` 										|  Ver se é útil ou não |
| `├── lib/` 											|  Bibliotecas e utilitários |
| `├── memoria/` 								|  Arquivos de memória |
| `├── node_modules` 						| 
| `├── prisma/` 									|  Configuração do banco |
| `├── public/` 									|  Arquivos estáticos e imagens |
| `├── styles/` 									|  Estilos globais |
| `├── types/` 									|  Tipos TypeScript |
| `├── middleware/` 							|  Middlewares |
| `├── .env.local` 								|  Variáveis de ambiente |
| `├── next.config.js` 						|  Configurações Next.js |
| `├── package.json` 						|  Dependências |
| `├── tailwind.config.js` 					|  Configurações Tailwind |
| `├── tsconfig.json` 						|  Configurações TypeScript |
| `├── README_geral.md` 					|  Documentação principal |
| `├── mapa_pastas_GFauto.md` 					|  Visão geral do projeto |
| `├── plano_maior.md` 					|  Visão geral do projeto |
| `└── MEMORIADESESSAO.md` 		|  Memória de desenvolvimento |

### **🎯 CONVENÇÕES APP ROUTER:**
- ✅ **Rotas automáticas:** Pastas em `app/` viram rotas
- ✅ **Arquivos especiais:** `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`
- ✅ **Componentes por rota:** Cada rota pode ter sua pasta `components/`
- ✅ **APIs em app/api:** Seguem padrão `route.ts`

### **📋 REGRAS DE DESENVOLVIMENTO:**
- 🚫 **PRESSA É PROIBIDA** - Sempre seguir processo completo
- ✅ **Seguir README_next.js.md** rigorosamente
- ✅ **Backup antes de mudanças** importantes
- ✅ **Testar localmente** só testamos após o deploy via web, não localmente.
- ✅ **Documentar alterações** no MEMORIADESESSAO.md

| `├── scripts/` 									| 
| `├── tmp/` 										|
| `├── utils/` 										|
| `├── gfauto-repo/` 							|
| `├── MEMORIADESESSAO.md` 	| 
| `├── README_geral.md` 				| 

### **📁 MÓDULOS/"FLUXOS"** (a verificar, ver o que pode aproveitar e depois excluir. - Tem módulos (terão que migrar) e que ainda estão em GFauto/ e gfauto-repo e os definitivos estão em GFauto/app/
| **Existente** | **Ideal + Comentários** |
|---------------|-------------------------|
| `GFauto/` 										| 
| `├── app/`
| `├── fluxo_app/` 			| (conferir se não precisa mudar de nome: retirar o fluxo_)
	| `├── anunciante/` 					| 
	| `├── resultados/` 					| 
	| `├── pagtos/` 							| 
	| `├── fluxo_painel_admin/` 		| acho que está em gfauto-repo (conferir)
	| `├── planos/` 							| 
	| `├── visitante/` 						|

### **📁 ESTRUTURA DO FLUXO_APP (DETALHADA)**
| **Existente** | **Ideal + Comentários** |
| `GFauto/` 										| 
| `├── app/`
		| `fluxo_app/` 										|  (ver se não precisa mudar de nome, etc)
		| `├── components/` 							|  
		| `├── styles/` 									|  
		| `├── types/` 									| Para definições TypeScript específicas
		| `├── utils/`     									| Para utilitários específicos do fluxo |
		| `├── README_fluxo_app.md` 		|  

		| `fluxo_cadastro/` 										|  
		| `├── components/` 							|  
		| `├── pages/` 									|  
		| `├── styles/` 									| 
		| `├── README_fluxo_cadastro.md` 		| 

		| `plano/` 									|  
		| `├── components/` 							|  
		| `├── styles/` 									|  
		| `├── types/` 									| Para definições TypeScript específicas
		| `├── utils/`     									| Para utilitários específicos do fluxo |
		| `├── README_planos.md` 	|  
		
		| `fluxo_visitante/` 								|  (ver se não precisa mudar o nome, etc)
		| `├── app/` 							|
			| `├── anuncio/` 							|	
				| `├── [id]/`									| page.tsx
			| `├── api/` 									| 	
				| `├── anuncio/` 						| 
					| `├── [id]/` 							| route.ts		
				| `├── cidades/` 							| route.ts
				| `├── especialidades/` 				| route.ts
				| `├── estados/` 						| route.ts
			| `├── resultados/` 						| page.tsx					| 				
		| `├── components/` 							| 
				| `├── visitantes/`						| AnuncioCard.tsx, BuscaForm.tsx, HeroSection.tsx, HeroSectionCorreto.tsx, LoadingResults.tsx, Pagination.tsx, ResultadosList.tsx
		| `├── docs/` 										|  
		| `├── lib/` 											| prisma.ts
		| `├── prisma/` 									| schema.prisma
		| `├── public/` 									| 
		| `├── types/` 									| 
		| `├── utils/` 										| formatters.ts		
		| `├── README_fluxo_visitante.md` | 		

### **📁 ESTRUTURA DE IMAGENS**
| **Existente** | **Ideal + Comentários** |

| `public/fluxo_app/images/`				| Localização principal | temos que ver como ficará o nome de "fluxo_app"
| `├── image001.jpg` 						| Moto Azul |
| `├── image003.jpg` 						| Carro Vermelho |
| `├── image005.jpg` 						| SUV Branca |
| `├── logo.png` 								| Logo GFauto
| `├── mc4.png` 								| Mascote Manda Chuva |

| `public/fluxo_plano/images/`				| Localização principal | temos que mudar para public/planos/images
| `├── carrao.jpg` 								| arte anúncio "Auto Peças Carrão" |
| `├── logo_gf.png` 							| Logo GF |
| `├── mas.jpg` 									| arte anúncio "Mas Auto Peças" |
| `├── mc4.png` 								| Mascote Manda Chuva |

## **📚 DOCUMENTAÇÃO DOS MÓDULOS/FLUXOS**

> **🎯 CENTRAL DE NAVEGAÇÃO:** Cada módulo possui documentação detalhada própria, onde devem estar informadas as dependências, precedências e outras informações pertinentes ao módulo). Consulte os READMEs específicos (ex.: GFauto/app/planos/README_planos.md, etc..)para informações completas sobre implementação, estrutura e manutenção.
- Organização dos arquivos README.md 
Objetivo: é que o Desenvolvedor perca o menor tempo possível buscando o que precisa lendo eles. 
Índice: Todos devem conter um índice no início informativo do conteúdo facilitando a localização da busca. As informações contidas no README obrigatoriamente devem estar no índice.
- README_geral.md (GFauto/): que passa informações gerais e aponta para READMEs específicos (salvos em seus módulos específicos) por página. 
- Dependências entre arquivos: os endereços informados nos READMEs devem ser precisos e completos partindo da página principal, no caso GFauto.


### **📖 READMEs Disponíveis:** (temos que rever e ajustar)

| **Módulo/Fluxo** 						| **Status** 				| **README** 												| **Propósito** 																		| **Última Atualização** |
|---|---|---|---|---|
| **fluxo_app** 								| ✅ **Funcionando**| `fluxo_app/README_fluxo_app.md) 			| Interface inicial e formulário de busca 									| 26/06/2025 |
| **app/anuncio (p/anunciante)** 	| 🔄 **Planejado** 	| `README_anunciante.md` 	| Área do cliente anunciante 													| A definir | (trocar nome p/anunciante)
| **app/resultados** 						| 🔄 **Planejado** 	| `README_resultados.md` 	| Página de resultados de busca 											| A definir |
| **app/pagtos** 							| 🔄 **Planejado** 	| `README_pagtos.md` 							| Sistema de pagamentos 														| A definir |
| **fluxo_painel_admin** 				| 🔄 **Planejado** 	| `README_fluxo_painel_admin.md` 			| Painel administrativo 															| A definir |
| **app/planos** 							| ✅ **Funcionando**| `README_plano.md` 							| Gestão de planos 																	| A definir |
| **fluxo_visitante (p/visitante)** 						| 🔄 **Planejado** 	| `README_fluxo_visitante.md` 					| Experiência do visitante 	 (*Rever)										| A definir |

* O fluxo_visitante foi substituído pelo fluxo_app. Ver se ainda tem algum conteúdo importante utilizável, ou excluir. (O Desenvolvedor vai analisar)

### **🔗 Referenciamento Bidirecional:**

- **Do README_geral.md → READMEs específicos:** Esta tabela referencia todos os módulos
- **Dos READMEs específicos → README_geral.md:** Cada README específico deve referenciar este documento

### **🎯 Arguivos importantes:**

- **GFauto/MEMORIADESESSAO.md** - Contexto e diretrizes do projeto
- **GFauto/README_geral.md** - Visão geral e estrutura
- **GFauto/Estudo.md** - Análise técnica e decisões
- **GFauto/mapa_pastas_GFauto.md** - estrutura de pastas do GFauto
- **gfauto-repo/mapa_pastas_gfauto_repo.md** - estrutura de pastas do GFauto
- **GFauto/plano_maior.md** - estrutura de pastas do GFauto
- **GFauto/README_next.js.md** - estrutura oficial do GFauto
- **PostGres_DB.md** - Configuração Banco de Dados, executa no ambiente específico

### **📋 Padrão de Nomenclatura:**

```
GFauto/app
├── fluxo_app/
│   └── README_fluxo_app.md
├── anunciante/
│   └── README_anunciante.md
├── cadastro/
│   └── README_cadastro.md
├── planos/
│   └── README_planos.md
├── pagtos/
│   └── README_pagtos.md
├── fluxo_cliente_anunciante/
│   └── README_fluxo_cliente_anunciante.md
├── anunciante/
│   └── README_anunciante.md
├── resultados/
│   └── README_resultados.md
└── [outros módulos]/
    └── README_[nome_do_modulo].md
```

### **⚠️ OBRIGATÓRIO:**

> **Antes de fazer qualquer alteração em qualquer Módulo, o Desenvolvedor DEVE obter o conhecimento do respectivo README específico. Caso ainda não exista deve criá-lo e se existir mas estiver em branco deve desenvolvê-lo**


### **🔄 Processo de Atualização:**

1. **Desenvolvedor:** Atualiza README específico durante desenvolvimento
2. **Weber:** Valida e aprova alterações
3. **Desenvolvedor:** Atualiza esta tabela no README_geral.md
4. **Commit:** Ambos os arquivos são commitados juntos

## **🎯 PRÓXIMOS PASSOS**

### **📋 Tarefas Pendentes:**

1. **Completar READMEs faltantes** para módulos planejados
2. **Revisar fluxo_visitante** - verificar se pode ser removido
3. **Atualizar datas** de última atualização conforme desenvolvimento
4. **Implementar sistema** de versionamento para READMEs

### **🔧 Melhorias Futuras:**

- Automatizar geração de índices nos READMEs
- Implementar validação de links entre documentos
- Criar template padrão para novos READMEs de módulos

## 📝 REGRAS DO PROJETO

### 1. Estrutura Modular por Páginas
- Cada página tem sua própria pasta/módulo com todos os componentes necessários
- Exemplo: `fluxo_app`, `app/anunciante`, `fluxo_admin`, `app/cadastro`, `app/pagtos`, `app/planos` ....
- Componentes específicos de cada pasta módulo ficam dentro da pasta do módulo: ex.: `fluxo_app/components/`, `app/pagtos/components/`, `app/planos/components/`....
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

### 02/07/2025
- Criado sistema de memória de sessão (MEMORIADESESSAO.md)
- Implementada metodologia de verificação factual na construção de códigos
- Corrigido resumo do projeto baseado na documentação oficial
- Ainda não está terminado e precisa de ajustes
