# DOCUMENTAÇÃO DO BANCO DE DADOS - GFAUTO

## 📋 INFORMAÇÕES GERAIS

### **Provedor:** Neon PostgreSQL
- **Projeto:** neon-teal-rlw
- **Host:** ep-black-darkness-aciwknn2-pooler.sa-east-1.aws.neon.tech
- **Database:** neondb
- **User:** neondb_owner
- **Região:** sa-east-1 (São Paulo)
- **SSL:** Obrigatório (sslmode=require)
- **Status:** ✅ **FUNCIONANDO** - Conexão com neon estabelecida com sucesso

### **Strings de Conexão:**

#### **Para Prisma (Produção/Aplicação):**
```
postgresql://neondb_owner:[SENHA]@ep-black-darkness-aciwknn2-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require
```

#### **Para DBeaver (Desenvolvimento/Administração):**
```
jdbc:postgresql://ep-black-darkness-aciwknn2-pooler.sa-east-1.aws.neon.tech:5432/neondb
```

#### **Variações de String (Referência):**
- **Neon Console (Completa):**	`postgresql://neondb_owner:[SENHA]@ep-black-darkness-aciwknn2-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
- **Vercel DATABASE_URL:**		`postgresql://neondb_owner:[SENHA]@ep-black-darkness-aciwknn2-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require`
- **Vercel POSTGRES_URL:**		`postgres://neondb_owner:[SENHA]@ep-black-darkness-aciwknn2-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require`

## 🔧 CONFIGURAÇÃO ATUAL

### **Arquivos de Configuração:**

#### **1. `prisma/schema.prisma`**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
  output   = "../node_modules/.prisma/client"
}

model Advertiser {
  id                String    @id @default(cuid())
  
  // === DADOS BÁSICOS (CADASTRO SIMPLES) ===
  email             String    @unique
  nomeResponsavel   String    // Nome do responsável pelo anúncio (era 'name')
  cpf               String    // CPF do responsável
  celContato        String    // Celular principal de contato (era 'telefone')
  senha             String    // Hash bcrypt da senha
  planoEscolhido    String    // 'cortesia', 'premium_1ano', 'premium_2anos', 'premium_3anos'
  
  // === DADOS DA EMPRESA (CONCLUSÃO DO CADASTRO) ===
  razaoSocial       String?   // Razão social
  nomeFantasia      String?   // Nome comercial da empresa (era 'empresa')
  cnpj              String?   // CNPJ da empresa
  cargo             String?   // Cargo do responsável
  
  // === ENDEREÇO DA EMPRESA ===
  enderecoEmpresa   String?   // Rua, número e complemento (era 'endereco')
  bairro            String?   // Bairro da empresa
  cep               String?   // CEP
  cidade            String?   // Cidade
  estado            String?   // Estado
  
  // === DADOS DO ANÚNCIO ===
  especialidade     String?   // Especialidade da empresa
  slogan            String?   // Slogan da empresa
  descricao         String?   // Descrição dos serviços
  celContato2       String?   // Segundo celular (opcional)
  imagemUrl         String?   // URL da imagem da empresa
  nomeParaAnuncio   String?   // 'razaoSocial' ou 'nomeFantasia' - escolha do usuário
  
  // === CONTROLE DO SISTEMA ===
  emailVerificado   Boolean   @default(false)
  statusCadastro    String    @default("cadastro_simples")
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  // === RELACIONAMENTOS ===
  payments          Payment[]
  anuncios          Anuncio[]
}
```

#### **2. `vercel.json`**
```json
{
  "buildCommand": "prisma migrate deploy && prisma generate && next build",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```
#### **3. `app/api/cadastro/route.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Usa os campos corretos da nova estrutura:
// nomeResponsavel, celContato, nomeFantasia, enderecoEmpresa, etc.
```

#### **2. `lib/prisma.ts`**  (**2. checar e apagar)
```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

// CORREÇÃO APLICADA: Instância global para todos os ambientes
globalForPrisma.prisma = prisma

export { prisma }
```

#### **3. `next.config.js`** (**3. checar e apagar)
```javascript
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    turboDeps: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  distDir: '.next',
  // CORREÇÃO APLICADA: Suporte ao Prisma em produção
  serverComponentsExternalPackages: ['@prisma/client'],
}

module.exports = nextConfig
```

## 🚨 PROBLEMAS RESOLVIDOS

### **PROBLEMA PRINCIPAL: DATABASE_URL não encontrada na Vercel**

#### **Situação Anterior:**
- ❌ Tabela Advertiser com apenas 5 campos (id, email, name, createdAt, updatedAt)
- ❌ Campos antigos incompatíveis com nova estrutura
- ❌ API de cadastro falhando por campos inexistentes

#### **Causa Raiz Identificada (11/07/2025):**
- ✅ Schema Prisma atualizado localmente mas migração nunca foi gerada
- ✅ Arquivo `route.ts` usando nomes de campos antigos
- ✅ `vercel.json` sem comando de migração automática

#### **Solução Aplicada:**
1. ✅ **Gerada migração:** `20250711220033_update_advertiser_table_complete_structure`
2. ✅ **Corrigido route.ts:** Campos name→nomeResponsavel, telefone→celContato, empresa→nomeFantasia, endereco→enderecoEmpresa
3. ✅ **Atualizado vercel.json:** Adicionado `prisma migrate deploy` no buildCommand
4. ✅ **Aplicada migração:** No banco de produção via deploy da Vercel

### **Resultado Final:**
- ✅ **Tabela Advertiser:** 26 campos funcionais
- ✅ **Database Explorer:** Mostra estrutura completa
- ✅ **DBeaver:** Confirma migração aplicada
- ✅ **API de cadastro:** Pronta para usar novos campos


## 📊 ESTRUTURA DO BANCO

### **Tabelas Existentes (Verificadas via DBeaver):**
### **Tabelas Existentes (Verificadas via DBeaver - 14/07/2025):**
1. **_prisma_migrations** - 7 registros (incluindo migração de 11/07/2025)
2. **Payment** - Pagamentos (ok)
3. **Anuncios** - Anúncios são os que irão figurar nas páginas de resultados.
4. **estados** - **27 campos** (estrutura completa)
5. **cidades** - **5571 campos** (estrutura completa)
6. **especialidades** - **56 campos** (estrutura completa)
7. **rotacao_premium** - Rotação de anúncios premium
8  **especialidades_disponíveis** - 
9. **imagens_anuncio** - Imagens dos anúncios
10. **Advertiser** - campos (estrutura completa)

* Especialidades Disponíveis (ver para o que serve)


### **Tabela Advertiser (Estrutura Atual - 26 Campos):**
```sql
-- DADOS BÁSICOS
id                VARCHAR   PRIMARY KEY
email             VARCHAR   UNIQUE
nomeResponsavel   VARCHAR   -- Era 'name'
cpf               VARCHAR
celContato        VARCHAR   -- Era 'telefone'
senha             VARCHAR
planoEscolhido    VARCHAR

-- DADOS DA EMPRESA
razaoSocial       VARCHAR
nomeFantasia      VARCHAR   -- Era 'empresa'
cnpj              VARCHAR
cargo             VARCHAR

-- ENDEREÇO
enderecoEmpresa   VARCHAR   -- Era 'endereco'
bairro            VARCHAR
cep               VARCHAR
cidade            VARCHAR
estado            VARCHAR

-- DADOS DO ANÚNCIO
especialidade     VARCHAR
slogan            VARCHAR
descricao         VARCHAR
celContato2       VARCHAR
imagemUrl         VARCHAR
nomeParaAnuncio   VARCHAR

-- CONTROLE DO SISTEMA
emailVerificado   BOOLEAN   DEFAULT false
statusCadastro    VARCHAR   DEFAULT 'cadastro_simples'
createdAt         TIMESTAMP DEFAULT now()
updatedAt         TIMESTAMP
```

## 🔍 TESTES E VALIDAÇÃO


### **API de Teste:** `/api/test-db`
- **URL:** `https://gfauto.vercel.app/api/test-db`
- **Status:** ✅ **FUNCIONANDO PERFEITAMENTE**
- **Última Verificação:** 11/07/2025

#### **Fluxo de Verificação Implementado:**
1. ✅ **STEP 1: ENV VARS** - Verificar se DATABASE_URL existe (147 chars)
2. ✅ **STEP 2: PRISMA IMPORT** - Validar import do PrismaClient
3. ✅ **STEP 3: CONNECTION** - Estabelecer conexão com banco
4. ✅ **STEP 4: SIMPLE QUERY** - Executar query de teste
5. ✅ **STEP 5: DISCONNECT** - Desconectar do banco

### **Database Explorer:** `/api/database-explorer`
- **URL:** `https://gfauto.vercel.app/api/database-explorer`
- **Status:** ✅ **FUNCIONANDO** - Mostra 10 tabelas
- **Advertiser:** `https://gfauto.vercel.app/api/database-explorer/Advertiser`
- **Resultado:** ✅ **26 colunas** (estrutura completa)

## 📝 PRÓXIMOS PASSOS

### **✅ CONCLUÍDO:**
1. ✅ ~~Resolver configuração DATABASE_URL na Vercel~~
2. ✅ ~~Testar conexão via API test-db~~
3. ✅ ~~Migrar tabela Advertiser para estrutura completa~~
4. ✅ ~~Corrigir API de cadastro para novos campos~~
5. ✅ ~~Configurar migração automática no deploy~~

### **🔄 PRÓXIMOS PASSOS (12/07/2025):**
1. **Testar fluxo completo de cadastro** com novos campos
2. **Implementar validações** nos novos campos (CPF, CNPJ, etc.)
3. **Configurar upload de imagens** para campo imagemUrl
4. **Implementar lógica de planos** (cortesia vs premium)
5. **Criar APIs de atualização** de dados do advertiser
6. **Documentar fluxo completo** de cadastro em etapas
7. **Limpar conexões duplicadas** no DBeaver (organização)

## 🔐 SEGURANÇA

### **Configurações SSL:**
- **sslmode=require:** Obrigatório para todas as conexões
- **channel_binding=require:** Proteção adicional contra man-in-the-middle (opcional)

### **Credenciais:**
- ✅ Senhas armazenadas com hash bcrypt
- ✅ Variáveis de ambiente protegidas na Vercel
- ✅ Conexões sempre via SSL/TLS
- ✅ Acesso restrito por usuário e senha

### **Ambientes:**
- **Desenvolvimento:** DBeaver com acesso direto
- **Produção:** Vercel com variáveis de ambiente seguras
- **Backup:** Gerenciado automaticamente pelo Neon

## 🛠️ COMANDOS ÚTEIS

### **Prisma:**
```bash
# Gerar cliente Prisma
npx prisma generate

# Criar nova migração
npx prisma migrate dev --name "nome_da_migracao"

# Aplicar migrações em produção
npx prisma migrate deploy

# Visualizar banco
npx prisma studio

# Reset do banco (cuidado!)
npx prisma migrate reset
```
### **Conexão via psql:**
```bash
psql "postgresql://neondb_owner:[SENHA]@ep-black-darkness-aciwknn2-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require"
```

## 📞 SUPORTE E CONTATOS

### **Neon Console:**
- **URL:** `https://console.neon.tech`
- **Projeto:** neon-teal-rlw
- **Plano:** Free Tier

### **Vercel Dashboard:**
- **URL:** `https://vercel.com/robinson-luiz-webers-projects/gfauto`
- **Environment Variables:** Settings → Environment Variables

### **DBeaver (Local):**
- **Conexões:** neon-teal-rlw e postgres (ambas apontam para o mesmo banco)
- **Recomendação:** Manter apenas uma conexão para evitar confusão

---
**Última Atualização:** 11/07/2025  
**Status:** ✅ **FUNCIONANDO** - Migração da tabela Advertiser aplicada com sucesso  
**Responsável:** Equipe de Desenvolvimento GFauto  
**Próxima Revisão:** 12/07/2025 - Teste do fluxo completo de cadastro

