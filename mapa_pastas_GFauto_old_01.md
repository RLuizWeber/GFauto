# MAPA DE PASTAS - PROJETO GFAUTO

## 📁 ESTRUTURA PRINCIPAL

```
GFauto/
├── README_next.js.md                    ← ESTRUTURA OFICIAL NEXT.JS
├── MEMORIADESESSAO.md                   ← MEMÓRIA DE SESSÃO
├── README_geral.md                      ← README GERAL DO PROJETO
├── app/                                 ← ESTRUTURA NEXT.JS APP ROUTER
│   ├── layout.tsx                       ← Layout global
│   ├── page.tsx                         ← Página inicial (/)
│   ├── globals.css                      ← Estilos globais
│   ├── favicon.ico                      ← Ícone do site
│   │
│   ├── admin/                           ← ROTA: /admin
│   │   ├── page.tsx                     ← Painel administrativo
│   │   └── components/                  ← Componentes específicos do admin
│   │
│   ├── anunciante/                      ← ROTA: /anunciante
│   │   ├── [id]/                        ← ROTA DINÂMICA: /anunciante/123
│   │   │   └── page.tsx                 ← Página do anúncio específico
│   │   ├── criar/                       ← ROTA: /anunciante/criar
│   │   │   └── page.tsx                 ← Página de criação de anúncio
│   │   └── components/                  ← Componentes específicos desta rota
│   │
│   ├── cadastro/                        ← ROTA: /cadastro
│   │   ├── page.tsx                     ← Página de cadastro
│   │   └── components/                  ← Componentes específicos do cadastro
│   │       └── CadastroForm.tsx         ← Formulário de cadastro
│   │
│   ├── pagina-correta/                  ← ROTA: /pagina-correta
│   │   └── page.tsx                     ← Página de confirmação
│   │
│   ├── pagtos/                          ← ROTA: /pagtos
│   │   ├── page.tsx                     ← Página de pagamentos
│   │   └── components/                  ← Componentes específicos de pagamento
│   │
│   ├── planos/                          ← ROTA: /planos
│   │   ├── page.tsx                     ← Página de planos
│   │   └── components/                  ← Componentes específicos de planos
│   │
│   ├── resultados/                      ← ROTA: /resultados
│   │   ├── page.tsx                     ← Página de resultados
│   │   └── components/                  ← Componentes específicos de resultados
│   │
│   └── api/                             ← APIs DO SISTEMA
│       ├── admin/
│       │   └── popular-fornecedores/
│       │       └── route.ts             ← API administrativa
│       ├── cadastro/
│       │   └── route.ts                 ← API de cadastro
│       ├── create-payment/
│       │   └── route.ts                 ← API de pagamentos (Mercado Pago)
│       ├── send-email/
│       │   └── route.ts                 ← API de envio de e-mails (Resend)
│       └── webhook/
│           └── mercadopago/
│               └── route.ts             ← Webhook do Mercado Pago
│
├── components/                          ← COMPONENTES GLOBAIS
│   ├── ui/                              ← Componentes de interface
│   └── shared/                          ← Componentes compartilhados
│
├── lib/                                 ← BIBLIOTECAS E UTILITÁRIOS
│   ├── prisma.ts                        ← Configuração do Prisma
│   ├── utils.ts                         ← Funções utilitárias
│   └── validations.ts                   ← Validações
│
├── prisma/                              ← CONFIGURAÇÃO DO BANCO
│   ├── schema.prisma                    ← Schema do banco
│   └── migrations/                      ← Migrações
│
├── public/                              ← ARQUIVOS PÚBLICOS
│   ├── images/                          ← Imagens do site
│   └── icons/                           ← Ícones
│
├── styles/                              ← ESTILOS
│   ├── globals.css                      ← Estilos globais
│   └── components/                      ← Estilos específicos
│
├── types/                               ← TIPOS TYPESCRIPT
│   └── index.ts                         ← Definições de tipos
│
├── .env.local                           ← Variáveis de ambiente
├── .gitignore                           ← Arquivos ignorados pelo Git
├── next.config.js                       ← Configuração do Next.js
├── package.json                         ← Dependências do projeto
├── tailwind.config.js                   ← Configuração do Tailwind
└── tsconfig.json                        ← Configuração do TypeScript
```

## 🎯 OBSERVAÇÕES IMPORTANTES

### **ESTRUTURA NEXT.JS APP ROUTER:**
- Todas as rotas ficam em `app/`
- Cada pasta em `app/` vira uma rota
- `page.tsx` define a página da rota
- `components/` dentro de cada rota para componentes específicos

### **PADRÃO DE ORGANIZAÇÃO:**
- **Componentes globais:** `components/`
- **Componentes específicos:** `app/[rota]/components/`
- **APIs:** `app/api/`
- **Estilos:** `styles/`
- **Tipos:** `types/`

### **CONVENÇÕES:**
- Nomes de pastas em minúsculas
- Componentes em PascalCase
- APIs em kebab-case
- Seguir rigorosamente o `README_next.js.md`

