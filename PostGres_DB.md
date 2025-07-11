# DOCUMENTAÇÃO DO BANCO DE DADOS - GFAUTO

## 📋 INFORMAÇÕES GERAIS

### **Provedor:** Neon PostgreSQL
- **Projeto:** neon-teal-rlw
- **Host:** ep-black-darkness-aciwknn2-pooler.sa-east-1.aws.neon.tech
- **Database:** neondb
- **User:** neondb_owner
- **Região:** sa-east-1 (São Paulo)
- **SSL:** Obrigatório (sslmode=require)
- **Status:** ✅ **FUNCIONANDO** - Conexão estabelecida com sucesso

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
}
```

#### **2. `lib/prisma.ts`**
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

#### **3. `next.config.js`**
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

#### **Causa Raiz Identificada:**
- ✅ Variável DATABASE_URL estava configurada apenas no ambiente do Team
- ✅ Projeto GFauto executa no ambiente específico do projeto
- ✅ Ambientes são isolados na Vercel

#### **Solução Aplicada:**
1. ✅ **Criada DATABASE_URL** no ambiente específico do projeto GFauto
2. ✅ **Usado valor correto** da string de conexão do Neon
3. ✅ **Configurada para** Production, Preview e Development
4. ✅ **Redeploy realizado** para aplicar mudanças

### **Configurações da Vercel:**

#### **Environment Variables (Projeto GFauto) - ATUALIZADAS:**
- **DATABASE_URL:** ✅ **CRIADA E FUNCIONANDO** (147 caracteres)
- **POSTGRES_URL:** ✅ Existente (mas com senha diferente)
- **Múltiplas POSTGRES_*:** ✅ Configuradas

#### **Build Configuration:**
```json
{
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

## 📊 ESTRUTURA DO BANCO

### **Tabelas Existentes (Verificadas via DBeaver):**
1. **_prisma_migrations** - Controle de migrações do Prisma
2. **Payment** - Pagamentos
3. **Anuncio** - Anúncios
4. **estados** - Estados brasileiros
5. **cidades** - Cidades brasileiras
6. **especialidades** - Especialidades profissionais
7. **rotacao_premium** - Rotação de anúncios premium
8. **especialidades_disponiveis** - Especialidades disponíveis
9. **imagens_anuncio** - Imagens dos anúncios
10. **Advertiser** - Anunciantes

### **Tabela User (Planejada/Schema):**
```sql
- id: String (Primary Key)
- email: String (Unique)
- name: String
- telefone: String
- empresa: String
- razaoSocial: String
- cnpj: String
- endereco: String
- cidade: String
- estado: String
- cep: String
- cargo: String
- senha: String (Hash)
- createdAt: DateTime
- updatedAt: DateTime
```

## 🔍 TESTES E VALIDAÇÃO

### **API de Teste:** `/api/test-db`
- **URL:** `https://gfauto.vercel.app/api/test-db`
- **Status:** ✅ **FUNCIONANDO PERFEITAMENTE**
- **Última Verificação:** 10/07/2025

#### **Fluxo de Verificação Implementado:**
1. ✅ **STEP 1: ENV VARS** - Verificar se DATABASE_URL existe (147 chars)
2. ✅ **STEP 2: PRISMA IMPORT** - Validar import do PrismaClient
3. ✅ **STEP 3: CONNECTION** - Estabelecer conexão com banco
4. ✅ **STEP 4: SIMPLE QUERY** - Executar query de teste
5. ✅ **STEP 5: DISCONNECT** - Desconectar do banco

#### **Resposta de Sucesso:**
```json
{
  "status": "success",
  "message": "Conexão com banco de dados bem-sucedida - Todos os passos executados",
  "database": "conectado",
  "debug": {
    "step1": {
      "databaseUrlExists": true,
      "databaseUrlLength": 147,
      "nodeEnv": "production",
      "status": "SUCCESS"
    },
    "step2": {
      "prismaType": "object",
      "hasPrismaConnect": true,
      "status": "SUCCESS"
    }
    // ... demais steps com SUCCESS
  }
}
```

## 📝 PRÓXIMOS PASSOS

1. ✅ ~~Resolver configuração DATABASE_URL na Vercel~~ **CONCLUÍDO**
2. ✅ ~~Testar conexão via API test-db~~ **CONCLUÍDO**
3. 🔄 **Implementar APIs de cadastro e autenticação**
4. 🔄 **Configurar migrações do Prisma para tabela User**
5. 🔄 **Documentar procedures e queries específicas**
6. 🔄 **Remover código de debug da API test-db (opcional)**

## 🔐 SEGURANÇA

### **Configurações SSL:**
- **sslmode=require:** Obrigatório para todas as conexões
- **channel_binding=require:** Proteção adicional contra man-in-the-middle (opcional)

### **Credenciais:**
- ✅ Senhas armazenadas com hash bcrypt (planejado)
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

# Aplicar migrações
npx prisma migrate dev

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

---
**Última Atualização:** 10/07/2025  
**Status:** ✅ **FUNCIONANDO** - Conexão estabelecida e testada com sucesso  
**Responsável:** Equipe de Desenvolvimento GFauto  
**Próxima Revisão:** Após implementação das APIs de cadastro

