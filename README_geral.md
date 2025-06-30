//W:/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto/
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
- **Frontend:** Next.js, React, TailwindCSS
- **Backend:** Prisma
- **Hospedagem:** Vercel (com deploy automático via GitHub).
- **Banco de Dados:** Vercel Postgres com Prisma ORM.
- **Next.js:** Framework de desenvolvimento web 
- **Autenticação:** Senha forte e 2FA para painel admin
APIs Externas Integradas:
- **Resend:** Plataforma de envio de e-mails. Para envio de e-mails transacionais (domínio gfauto.com.br verificado).
- **Mercado Pago** Plataforma de pagamentos digitais. Para processamento de pagamentos (Testado e Ok).

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
O projeto segue uma estrutura modular organizada por páginas/fluxos: (Obs.: Falta o Desenvolvedor ajustar considerando o ambiente GitHub)

## EXISTENTE 

| **COLUNA A:** EXISTE 		+ COMENTÁRIOS |

### **📁 RAIZ DO PROJETO**
| **Existente** (atualizado em: 			|  ** + Comentários**
| data: informar  

| `GFauto/` 											| 
| `├── app/` 										|  Pasta principal do Next.js |
| `├── backups/` 								|  Conforme política do MEMORIADESESSAO |
| `├── components/` 							|  Componentes globais |
| `├── docs/` 										|  Documentação |
| `├── GFauto/` 									| 
| `├── lib/` 											|  Bibliotecas e utilitários |
| `├── memoria/` 								|  Arquivos de memória |
| `├── node_modules` 						| 
| `├── prisma/` 									|  Configuração do banco |
| `├── public/` 									|  Arquivos estáticos |
| `├── scripts/` 									| 
| `├── tmp/` 										|
| `├── utils/` 										|
| `├── gfauto-repo/` 							|
| `├── MEMORIADESESSAO.md` 	| 
| `├── Projeto_GFauto.md` 				| 

### **📁 MÓDULOS/FLUXOS**
| **Existente** | **Ideal + Comentários** |
|---------------|-------------------------|
| `├── fluxo_app/` 								| 
| `├── fluxo_cliente_anunciante/` 		| 
| `├── fluxo_pag_de_resultados/` 		| 
| `├── fluxo_pagto/` 							| 
| `├── fluxo_painel_admin/` 				| 
| `├── fluxo_plano/` 							| 
| `├── fluxo_visitante/` 						| 

### **📁 ESTRUTURA DO FLUXO_APP (DETALHADA)**
| **Existente** | **Ideal + Comentários** |

| `fluxo_app/` 										|  
| `├── components/` 							|  
| `├── styles/` 									|  
| `├── types/` 									| Para definições TypeScript específicas
| `├── utils/`     									| Para utilitários específicos do fluxo |
| `├── README_fluxo_app.md` 		|  

| `fluxo_plano/` 									|  
| `├── components/` 							|  
| `├── styles/` 									|  
| `├── types/` 									| Para definições TypeScript específicas
| `├── utils/`     									| Para utilitários específicos do fluxo |
| `├── README_fluxo_plano.md` 	|  

### **📁 ESTRUTURA DE IMAGENS**
| **Existente** | **Ideal + Comentários** |

| `public/fluxo_app/images/`				| Localização principal |
| `├── image001.jpg` 						| Moto Azul |
| `├── image003.jpg` 						| Carro Vermelho |
| `├── image005.jpg` 						| SUV Branca |
| `├── logo.png` 								| Logo GFauto
| `├── mc4.png` 								| Mascote Manda Chuva |

| `public/fluxo_plano/images/`				| Localização principal |
| `├── carrao.jpg` 								| arte anúncio "Auto Peças Carrão" |
| `├── logo_gf.png` 							| Logo GF |
| `├── mas.jpg` 									| arte anúncio "Mas Auto Peças" |
| `├── mc4.png` 								| Mascote Manda Chuva |

### **📁 ESTRUTURA IDEAL PARA OUTROS FLUXOS**
| **Padrão Recomendado** 				| **Comentários** |

| `fluxo_[nome]/` 									| **Estrutura padrão para todos os fluxos** |
| `├── components/` 							| Componentes específicos do fluxo |
| `├── styles/` 									| Estilos específicos do fluxo |
| `├── types/` 									| Definições TypeScript |
| `├── utils/` 										| Utilitários específicos |
| `├── README_fluxo_[nome].md` 	| Documentação obrigatória |

## **📚 DOCUMENTAÇÃO DOS MÓDULOS/FLUXOS**

> **🎯 CENTRAL DE NAVEGAÇÃO:** Cada módulo/fluxo possui documentação detalhada própria, onde devem estar informadas as dependências, precedências e outras informações pertinentes ao módulo). Consulte os READMEs específicos (fluxo_[Nome]/README_fluxo_[Nome].md) para informações completas sobre implementação, estrutura e manutenção.
- Organização dos arquivos README.md 
Objetivo: é que o Desenvolvedor perca o menor tempo possível buscando o que precisa lendo eles. 
Índice: Todos devem conter um índice no início informativo do conteúdo facilitando a localização da busca. As informações contidas no README obrigatoriamente devem estar no índice.
- README_geral.md (GFauto/): que passa informações gerais e aponta para READMEs específicos (salvos em seu fluxo/módulo específicos) por página. 
- Dependências entre arquivos: os endereços informados nos READMEs devem ser precisos e completos partindo da página principal, no caso GFauto.


### **📖 READMEs Disponíveis:**

| **Módulo/Fluxo** 						| **Status** 				| **README** 												| **Propósito** 																		| **Última Atualização** |
|---|---|---|---|---|
| **fluxo_app** 								| ✅ **Funcionando**| `fluxo_app/README_fluxo_app.md) 			| Interface inicial e formulário de busca 									| 26/06/2025 |
| **fluxo_cliente_anunciante** 	| 🔄 **Planejado** 	| `README_fluxo_cliente_anunciante.md` 	| Área do cliente anunciante 													| A definir |
| **fluxo_pag_de_resultados** 	| 🔄 **Planejado** 	| `README_fluxo_pag_de_resultados.md` 	| Página de resultados de busca 											| A definir |
| **fluxo_pagto** 							| 🔄 **Planejado** 	| `README_fluxo_pagto.md` 							| Sistema de pagamentos 														| A definir |
| **fluxo_painel_admin** 				| 🔄 **Planejado** 	| `README_fluxo_painel_admin.md` 			| Painel administrativo 															| A definir |
| **fluxo_plano** 							| ✅ **Funcionando**| `README_fluxo_plano.md` 							| Gestão de planos 																	| A definir |
| **fluxo_visitante** 						| 🔄 **Planejado** 	| `README_fluxo_visitante.md` 					| Experiência do visitante 	 (*Rever)										| A definir |

* O fluxo_visitante foi substituído pelo fluxo_app. Ver se ainda tem algum conteúdo importante utilizável, ou excluir. (O Desenvolvedor vai analisar)

### **🔗 Referenciamento Bidirecional:**

- **Do README_geral.md → READMEs específicos:** Esta tabela referencia todos os módulos
- **Dos READMEs específicos → README_geral.md:** Cada README específico deve referenciar este documento

### **📋 Padrão de Nomenclatura:**

```
GFauto/
├── fluxo_app/
│   └── README_fluxo_app.md
├── fluxo_cliente_anunciante/
│   └── README_fluxo_cliente_anunciante.md
├── fluxo_pag_de_resultados/
│   └── README_fluxo_pag_de_resultados.md
└── [outros módulos]/
    └── README_[nome_do_modulo].md
```

### **🎯 Como Usar Esta Documentação:**

1. **Para visão geral:** Consulte este README_geral.md
2. **Para detalhes específicos:** Acesse o README do módulo correspondente
3. **Para desenvolvimento:** Leia OBRIGATORIAMENTE o README específico antes de alterar qualquer código
4. **Para troubleshooting:** Use o "Guia de Referência Rápida" de cada módulo

### **⚠️ OBRIGATÓRIO:**

> **Antes de fazer qualquer alteração em qualquer Módulo/fluxo, o Desenvolvedor DEVE obter o conhecimento do respectivo README específico. Caso ainda não exista deve criá-lo e se existir mas estiver em branco deve desenvolvê-lo**


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
