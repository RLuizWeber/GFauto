# README NEXT.JS - ESTRUTURA OFICIAL PROJETO GFAUTO (ok)

**Data:** 06/07/2025  
**Projeto:** GFauto  
**Framework:** Next.js 13+ com App Router  
**Objetivo:** Definir estrutura rigorosa para desenvolvimento

---

## 🎯 ESTRUTURA OFICIAL DEFINIDA

### **REGRA FUNDAMENTAL:**
**TUDO relacionado a rotas e páginas DEVE estar dentro de `GFauto/app/`**

---

## 📁 ESTRUTURA COMPLETA DO PROJETO

```
GFauto/
├── app/                          ← CORE DO NEXT.JS (App Router)
│   ├── globals.css              ← Estilos globais
│   ├── layout.tsx               ← Layout raiz da aplicação
│   ├── page.tsx                 ← Página inicial (/)
│   ├── favicon.ico              ← Ícone do site
│   │
│   ├── cadastro/                ← ROTA: /cadastro
│   │   ├── page.tsx            ← Página principal
│   │   ├── components/         ← Componentes específicos desta rota
│   │   │   └── CadastroForm.tsx
│   │   └── loading.tsx         ← (Opcional) Loading UI
│   │
│   ├── planos/                  ← ROTA: /planos
│   │   ├── page.tsx            ← Página principal
│   │   └── components/         ← Componentes específicos desta rota
│   │
│   ├── pagtos/                  ← ROTA: /pagtos (pagamentos)
│   │   ├── page.tsx            ← Página principal
│   │   └── components/         ← Componentes específicos desta rota
│   │
│   ├── anunciante/                 ← ROTA: /anunciante
│   │   ├── [id]/               ← ROTA DINÂMICA: /anunciante/123
│   │   │   └── page.tsx        ← Página do anúncio específico
│   │   ├── criar/              ← ROTA: /anunciante/criar
│   │   │   └── page.tsx        ← Página de criação
│   │   └── components/         ← Componentes específicos desta rota
│   │
│   ├── admin/                   ← ROTA: /admin
│   │   ├── layout.tsx          ← Layout específico do admin
│   │   ├── page.tsx            ← Dashboard admin
│   │   ├── anunciantes/           ← ROTA: /admin/anunciantes
│   │   │   └── page.tsx
│   │   └── components/         ← Componentes específicos do admin
│   │
│   ├── resultados/              ← ROTA: /resultados
│   │   ├── page.tsx            ← Página principal
│   │   └── components/         ← Componentes específicos desta rota
│   │
│   └── api/                     ← APIs DO BACKEND
│       ├── cadastro/
│       │   └── route.ts        ← POST /api/cadastro
│       ├── create-payment/
│       │   └── route.ts        ← POST /api/create-payment
│       ├── send-email/
│       │   └── route.ts        ← POST /api/send-email
│       └── webhook/
│           └── mercadopago/
│               └── route.ts    ← POST /api/webhook/mercadopago
│
├── components/                   ← COMPONENTES GLOBAIS REUTILIZÁVEIS
│   ├── ui/                      ← Componentes de interface básicos
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── layout/                  ← Componentes de layout
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   └── shared/                  ← Componentes compartilhados
│       ├── LoadingSpinner.tsx
│       └── ErrorBoundary.tsx
│
├── lib/                         ← UTILITÁRIOS E CONFIGURAÇÕES
│   ├── prisma.ts               ← Cliente Prisma
│   ├── auth.ts                 ← Configurações de autenticação
│   ├── utils.ts                ← Funções utilitárias
│   └── validations.ts          ← Esquemas de validação
│
├── prisma/                      ← BANCO DE DADOS
│   ├── schema.prisma           ← Schema do banco
│   └── migrations/             ← Migrações
│
├── public/                      ← ARQUIVOS ESTÁTICOS
│   ├── images/
│   ├── icons/
│   └── favicon.ico
│
├── styles/                      ← ESTILOS ADICIONAIS
│   └── components.css
│
├── types/                       ← DEFINIÇÕES TYPESCRIPT
│   ├── index.ts
│   └── api.ts
│
├── utils/                       ← UTILITÁRIOS GERAIS
│   ├── constants.ts
│   └── helpers.ts
│
├── .env.local                   ← Variáveis de ambiente
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## 🔧 REGRAS RIGOROSAS DE ESTRUTURA

### **1. PASTA `app/` - ROTEAMENTO**

#### **ARQUIVOS ESPECIAIS (Next.js):**
- `page.tsx` → Página principal da rota
- `layout.tsx` → Layout específico da rota
- `loading.tsx` → UI de carregamento
- `error.tsx` → UI de erro
- `not-found.tsx` → Página 404
- `route.ts` → API endpoint

#### **PASTAS ESPECIAIS:**
- `[id]/` → Rota dinâmica (ex: `/anunciante/[id]`)
- `(grupo)/` → Agrupamento de rotas (não afeta URL)

#### **REGRA DE COMPONENTES EM ROTAS:**
```
app/cadastro/
├── page.tsx              ← OBRIGATÓRIO (cria a rota)
├── components/           ← PERMITIDO (componentes específicos)
│   └── CadastroForm.tsx
└── styles/               ← PERMITIDO (estilos específicos)
    └── cadastro.css
```

### **2. PASTA `components/` - COMPONENTES GLOBAIS**

#### **ORGANIZAÇÃO:**
- `ui/` → Componentes básicos reutilizáveis
- `layout/` → Componentes de layout (Header, Footer)
- `shared/` → Componentes compartilhados entre rotas

#### **REGRA DE NOMENCLATURA:**
- PascalCase: `CadastroForm.tsx`
- Descritivo: `UserProfileCard.tsx`
- Específico: `PaymentMethodSelector.tsx`

### **3. PASTA `lib/` - CONFIGURAÇÕES**

#### **CONTEÚDO:**
- Clientes de serviços (Prisma, APIs)
- Configurações de autenticação
- Utilitários específicos do projeto
- Validações e schemas

---

## 🚀 FLUXO DE ROTEAMENTO

### **COMO O NEXT.JS CRIA ROTAS:**

```
app/cadastro/page.tsx        → https://gfauto.vercel.app/cadastro
app/planos/page.tsx          → https://gfauto.vercel.app/planos
app/anunciante/criar/page.tsx   → https://gfauto.vercel.app/anunciante/criar
app/anunciante/[id]/page.tsx    → https://gfauto.vercel.app/anunciante/123
app/admin/page.tsx           → https://gfauto.vercel.app/admin
```

### **COMO O NEXT.JS CRIA APIs:**

```
app/api/cadastro/route.ts           → POST /api/cadastro
app/api/create-payment/route.ts     → POST /api/create-payment
app/api/webhook/mercadopago/route.ts → POST /api/webhook/mercadopago
```

---

## 📋 PADRÕES DE IMPLEMENTAÇÃO

### **1. ESTRUTURA DE UMA PÁGINA:**

```typescript
// app/cadastro/page.tsx
import CadastroForm from './components/CadastroForm'

export default function CadastroPage() {
  return (
    <div>
      <CadastroForm />
    </div>
  )
}
```

### **2. ESTRUTURA DE UM COMPONENTE:**

```typescript
// app/cadastro/components/CadastroForm.tsx
'use client'

import { useState } from 'react'

export default function CadastroForm() {
  // Lógica do componente
  return (
    <form>
      {/* JSX do formulário */}
    </form>
  )
}
```

### **3. ESTRUTURA DE UMA API:**

```typescript
// app/api/cadastro/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Lógica da API
  return NextResponse.json({ success: true })
}
```

---

## 🔄 FLUXO DE DESENVOLVIMENTO

### **PARA CRIAR UMA NOVA FUNCIONALIDADE:**

1. **Definir a rota:** `app/nova-funcionalidade/`
2. **Criar página:** `app/nova-funcionalidade/page.tsx`
3. **Criar componentes:** `app/nova-funcionalidade/components/`
4. **Criar API (se necessário):** `app/api/nova-funcionalidade/route.ts`
5. **Testar localmente:** `npm run dev`
6. **Fazer deploy:** `git push` (Vercel automático)

### **PARA MODIFICAR FUNCIONALIDADE EXISTENTE:**

1. **Localizar arquivos:** Sempre em `app/funcionalidade/`
2. **Modificar componentes:** Em `components/` da rota
3. **Testar mudanças:** Localmente primeiro
4. **Fazer deploy:** Após confirmação

---

## ⚠️ REGRAS CRÍTICAS

### **NUNCA FAZER:**
- ❌ Criar rotas fora de `app/`
- ❌ Misturar lógica de diferentes rotas
- ❌ Colocar componentes globais em rotas específicas
- ❌ Ignorar a estrutura de pastas definida

### **SEMPRE FAZER:**
- ✅ Seguir a estrutura definida rigorosamente
- ✅ Documentar mudanças significativas
- ✅ Testar localmente antes do deploy
- ✅ Usar nomenclatura consistente

---

## 🎯 APLICAÇÃO NO PROJETO GFAUTO

### **ESTRUTURA ATUAL CORRETA:**

```
GFauto/app/
├── cadastro/
│   ├── page.tsx                 ← Integra CadastroForm
│   └── components/
│       └── CadastroForm.tsx     ← Movido de fluxo_cadastro/
├── api/
│   └── cadastro/
│       └── route.ts             ← Já existe no "Meu Local"
└── ...outras rotas
```

### **IMPORTS CORRETOS:**

```typescript
// app/cadastro/page.tsx
import CadastroForm from './components/CadastroForm'  // ✅ CORRETO

// NÃO usar:
import CadastroForm from '../../fluxo_cadastro/components/CadastroForm'  // ❌ ERRADO
```

---

## 📚 REFERÊNCIAS OFICIAIS

- **Next.js App Router:** https://nextjs.org/docs/app
- **File Conventions:** https://nextjs.org/docs/app/api-reference/file-conventions
- **Routing:** https://nextjs.org/docs/app/building-your-application/routing

---

## ✅ CHECKLIST DE CONFORMIDADE

Antes de implementar qualquer funcionalidade:

- [ ] A rota está em `app/`?
- [ ] Os componentes específicos estão em `components/` da rota?
- [ ] Os componentes globais estão em `components/` raiz?
- [ ] As APIs estão em `app/api/`?
- [ ] A nomenclatura está consistente?
- [ ] A estrutura segue este README?

---

**IMPORTANTE:** Este documento é a **FONTE DA VERDADE** para estrutura do projeto GFauto. Qualquer desvio deve ser documentado e aprovado.

**Status:** ✅ **APROVADO PARA USO RIGOROSO**  
**Próxima revisão:** Quando necessário  
**Responsável:** Weber + Desenvolvedor

