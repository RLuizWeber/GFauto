# DOCUMENTAÇÃO DO BANCO DE DADOS - GFAUTO

## 📋 INFORMAÇÕES GERAIS

### **Provedor:** Neon PostgreSQL
- **Host:** ep-black-darkness-aciwknn2-pooler.sa-east-1.aws.neon.tech
- **Database:** neondb
- **User:** neondb_owner
- **Região:** sa-east-1 (São Paulo)
- **SSL:** Obrigatório (sslmode=require)

### **Strings de Conexão:**

#### **Para Prisma (Produção):**
```
- **POSTGRES_URL**
URL ( x ): jdbc:postgresql://ep-black-darkness-aciwknn2-pooler.sa-east-1.aws.neon.tech:5432/neondb

Manus                                 - postgresql://neondb_owner:[SENHA] @ep-black-darkness-aciwknn2-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
Minha anotação no Excel   - postgres://neondb_owner:[SENHA]    @ep-black-darkness-aciwknn2-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require
Vercel                                 - postgres://neondb_owner:[SENHA]    @ep-black-darkness-aciwknn2-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require
Usuário: neondb_owner | Propriedades do driver:  sslmode: require

```

- **DATABASE_URL**
URL ( x ): jdbc:postgresql://ep-black-darkness-aciwknn2-pooler.sa-east-1.aws.neon.tech:5432/neondb

Minha anotação no Excel   - postgresql://neondb_owner:[SENHA]@ep-black-darkness-aciwknn2-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require
Vercel                                 - postgresql://neondb_owner:[SENHA]@ep-black-darkness-aciwknn2-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require
Usuário: neondb_owner | Propriedades do driver:  sslmode: require
#### **Para DBeaver (Desenvolvimento):**
```
jdbc:postgresql://ep-black-darkness-aciwknn2-pooler.sa-east-1.aws.neon.tech:5432/neondb
```

## 🔧 CONFIGURAÇÃO ATUAL

### **Arquivos de Configuração:**

#### **1. `prisma/schema.prisma`**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

#### **2. `lib/prisma.ts`**
- Configuração centralizada do PrismaClient
- Instância global para evitar múltiplas conexões
- **CORREÇÃO APLICADA:** Remover condição de "produção" que impede instância global (não removida ainda)

#### **3. `next.config.js`**
- **CORREÇÃO APLICADA:** Adicionado `serverComponentsExternalPackages: ['@prisma/client']`

## 🚨 PROBLEMAS IDENTIFICADOS E SOLUÇÕES

### **PROBLEMA PRINCIPAL: DATABASE_URL não encontrada na Vercel**

#### **Causa Raiz:**
- Variável DATABASE_URL configurada no ambiente do Team
- Projeto GFauto executa no ambiente específico do projeto
- Ambientes são isolados

#### **Solução Aplicada:**
1. Identificar que DATABASE_URL deve ser criada no ambiente específico do projeto GFauto
2. Usar valor da POSTGRES_URL existente no projeto
3. Configurar para Production, Preview e Development

### **Configurações da Vercel:**

#### **Environment Variables (Projeto GFauto):**
- **POSTGRES_URL:** ✅ Existente
- **DATABASE_URL:** ❌ Ausente (PROBLEMA IDENTIFICADO)
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

### **Tabelas Principais:**

#### **User (Usuários)**
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
- **Função:** Validar conexão com banco
- **Status Atual:** Implementada com debug completo
- **Fluxo de Verificação:**
  1. Verificar variáveis de ambiente
  2. Verificar import do Prisma
  3. Estabelecer conexão
  4. Executar query de teste
  5. Desconectar

### **Logs de Debug Implementados:**
- Verificação de DATABASE_URL
- Validação do PrismaClient
- Teste de conectividade
- Execução de queries

## 📝 PRÓXIMOS PASSOS

1. **Resolver configuração DATABASE_URL na Vercel**
2. **Testar conexão via API test-db**
3. **Implementar APIs de cadastro e autenticação**
4. **Configurar migrações do Prisma**
5. **Documentar procedures e queries específicas**

## 🔐 SEGURANÇA

### **Configurações SSL:**
- **sslmode=require:** Obrigatório
- **channel_binding=require:** Proteção adicional contra man-in-the-middle

### **Credenciais:**
- Senhas armazenadas com hash bcrypt
- Variáveis de ambiente protegidas
- Conexões sempre via SSL

---
**Última Atualização:** 09/07/2025
**Status:** Em configuração - Problema de DATABASE_URL identificado

