# README - PÁGINA PRINCIPAL GFAUTO
**Localização:** `GFauto/app/README_pagPrincipal.md`

## 📍 LOCALIZAÇÃO E ESTRUTURA

### **Arquivo Principal:**
- **Caminho:** `GFauto/app/page.tsx`
- **Função:** Página inicial do site (rota `/`)
- **Componente:** Importa `HeroSectionCorreto` de `@/components/visitante/HeroSection`

### **Componente de Busca:**
- **Caminho:** `GFauto/components/visitante/BuscaForm.tsx`
- **Função:** Formulário de busca com 3 campos (Estado, Cidade, Especialidade)
- **Linhas de código:** 546 linhas (481 loc)

---

## 🎯 OBJETIVO DA PÁGINA PRINCIPAL

### **FUNÇÃO NO PROJETO GFAUTO:**
A página principal conecta **visitantes** (proprietários de veículos) com **anunciantes** (fornecedores automotivos) através de busca geográfica e por especialidade.

### **FLUXO DO VISITANTE:**
1. **Acessa:** `https://gfauto.vercel.app/`
2. **Informa:** Estado + Cidade + "O que procura?"
3. **Clica:** "Buscar Serviços"
4. **Resultado:** Redirecionado para `/resultados` com anúncios da região

---

## 🔧 FUNCIONAMENTO ATUAL DOS CAMPOS

### **1. CAMPO ESTADO:**
- **Placeholder:** "Ex: RS ou Rio Grande do Sul"
- **Autocompletar:** ✅ **FUNCIONA** (mesmo com tabela `estados` vazia)
- **Aceita:** Sigla (PB) OU nome completo (Paraíba)
- **Fonte de dados:** **MISTÉRIO RESOLVIDO** - Dados hardcoded ou API externa
- **Validação:** ✅ Verifica se preenchido
- **Comportamento:** Ao selecionar, limpa cidade e especialidade

### **2. CAMPO CIDADE:**
- **Placeholder:** "Digite o nome da cidade"
- **Autocompletar:** ✅ **FUNCIONA** (dependente do Estado selecionado)
- **Relacionamento:** **CRÍTICO** - Deve estar relacionada ao Estado
- **Fonte de dados:** **API `/api/cidades` NÃO EXISTE** (retorna 404)
- **Validação:** ✅ Verifica se preenchido, ❌ **NÃO valida compatibilidade**
- **Comportamento:** Ao selecionar, limpa especialidade

### **3. CAMPO "O QUE PROCURA?" (ESPECIALIDADE):**
- **Placeholder:** "Ex: oficina, autopeças, concessionária"
- **Autocompletar:** ❌ **NÃO FUNCIONA** (campo livre)
- **Relacionamento:** **DEVE** estar relacionado com Cidade para mostrar anunciantes
- **Fonte de dados:** Lista hardcoded `ESPECIALIDADES_PADRAO` (58 itens)
- **Validação:** ✅ Verifica se preenchido, ❌ **NÃO valida se existe**

---

## 🚨 PROBLEMAS CRÍTICOS IDENTIFICADOS

### **PROBLEMA 1: VALIDAÇÃO ESTADO-CIDADE INEXISTENTE**

**Localização:** `BuscaForm.tsx` - função `handleSubmit` (linhas 337-359)

**Comportamento atual:**
```typescript
// Validação atual (INSUFICIENTE)
if (!estado.trim()) {
  setError('Por favor, informe o estado.');
  return;
}

if (!cidade.trim()) {
  setError('Por favor, informe a cidade.');
  return;
}

// PROBLEMA CRÍTICO: Permite qualquer combinação!
router.push(`/resultados?estado=${estado}&cidade=${cidade}&especialidade=${especialidade}`);
```

**Exemplos do problema:**
- ✅ **Aceita:** "SP" + "São Paulo" (válido)
- ❌ **Aceita:** "MT" + "Erechim" (INVÁLIDO - Erechim é do RS!)
- ❌ **Aceita:** "PB" + "Seberi" (INVÁLIDO - Seberi é do RS!)

### **PROBLEMA 2: APIs INEXISTENTES**

**APIs que o código tenta usar mas NÃO EXISTEM:**
- ❌ `GET /api/estados` → **404 Not Found**
- ❌ `GET /api/cidades?estado_id=${estadoId}` → **404 Not Found**
- ❌ `GET /api/especialidades?cidade_id=${cidadeId}` → **404 Not Found**

**Consequência:** Autocompletar funciona por fonte desconhecida (dados hardcoded?)

### **PROBLEMA 3: RELACIONAMENTOS NÃO IMPLEMENTADOS**

**Estado ↔ Cidade:**
- **Problema:** Sistema não valida se cidade pertence ao estado
- **Impacto:** Permite buscas geograficamente impossíveis

**Cidade ↔ Especialidade:**
- **Problema:** Não relaciona especialidades com cidades específicas
- **Impacto:** Pode mostrar especialidades inexistentes na cidade

**Especialidade ↔ Anunciantes:**
- **Problema:** Não garante que há anunciantes da especialidade na cidade
- **Impacto:** Página de resultados vazia sem feedback adequado

---

## 📊 ESTRUTURA DE DADOS NECESSÁRIA

### **TABELAS DO BANCO (EXISTEM MAS VAZIAS):**

#### **Tabela `estados`:**
```sql
-- Estrutura confirmada (5 campos, 0 registros)
id (text, PK)
nome (varchar) -- "Paraíba"
sigla (char) -- "PB"  
created_at (timestamp)
updated_at (timestamp)
```

#### **Tabela `cidades`:**
```sql
-- Estrutura confirmada (existente mas vazia)
id (text, PK)
nome (varchar) -- "João Pessoa"
estado_id (text, FK) -- Relaciona com estados.id
created_at (timestamp)
updated_at (timestamp)
```

### **RELACIONAMENTOS NECESSÁRIOS:**

```
Estado (PB) → Cidades (João Pessoa, Campina Grande, ...)
Cidade (João Pessoa) → Especialidades disponíveis
Especialidade + Cidade → Anunciantes (tabela Anuncio)
```

---

## 🔄 FLUXO REAL DE FUNCIONAMENTO

### **FLUXO ATUAL (PROBLEMÁTICO):**

1. **Carregamento inicial:**
   ```
   useEffect() → fetchEstados() → ❌ API não existe → Dados de onde?
   ```

2. **Seleção de Estado:**
   ```
   usuário digita "PB" → autocompletar funciona → ✅ Seleciona
   ```

3. **Seleção de Cidade:**
   ```
   usuário digita "Seberi" → ❌ Não valida se existe em PB → ✅ Aceita
   ```

4. **Submissão:**
   ```
   handleSubmit() → ❌ Não valida compatibilidade → router.push('/resultados')
   ```

5. **Resultado:**
   ```
   /resultados?estado=PB&cidade=Seberi → "Não foi possível encontrar resultados"
   ```

### **FLUXO IDEAL (A IMPLEMENTAR):**

1. **Carregamento inicial:**
   ```
   useEffect() → API /api/estados → Popula lista de estados
   ```

2. **Seleção de Estado:**
   ```
   usuário digita "PB" → Valida se existe → Define estadoId
   ```

3. **Seleção de Cidade:**
   ```
   usuário digita "Seberi" → API /api/cidades?estado_id=PB → ❌ Não encontra
   → Mostra erro: "Cidade não existe em PB"
   ```

4. **Validação antes de submissão:**
   ```
   handleSubmit() → Verifica cidadeId existe → ✅ Permite busca
   ```

---

## ✅ IMPLEMENTAÇÃO NECESSÁRIA

### **ETAPA 1: CRIAR APIs FALTANTES**

#### **1.1 API Estados:**
```typescript
// GFauto/app/api/estados/route.ts
export async function GET() {
  const estados = await prisma.estado.findMany({
    select: { id: true, nome: true, sigla: true }
  });
  return Response.json(estados);
}
```

#### **1.2 API Cidades:**
```typescript
// GFauto/app/api/cidades/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const estadoId = searchParams.get('estado_id');
  
  const cidades = await prisma.cidade.findMany({
    where: { estadoId },
    select: { id: true, nome: true }
  });
  return Response.json(cidades);
}
```

### **ETAPA 2: POPULAR TABELAS**

#### **2.1 Popular Estados:**
```sql
INSERT INTO estados (id, nome, sigla) VALUES
('AC', 'Acre', 'AC'),
('AL', 'Alagoas', 'AL'),
('AP', 'Amapá', 'AP'),
-- ... todos os 26 estados + DF
```

#### **2.2 Popular Cidades:**
```sql
INSERT INTO cidades (id, nome, estado_id) VALUES
('joao-pessoa', 'João Pessoa', 'PB'),
('campina-grande', 'Campina Grande', 'PB'),
-- ... principais cidades de cada estado
```

### **ETAPA 3: CORRIGIR VALIDAÇÃO**

#### **3.1 Validação no handleSubmit:**
```typescript
// Adicionar após linha 350 em BuscaForm.tsx
if (estado && cidade && !cidadeId) {
  setError('Esta cidade não existe no estado selecionado. Por favor, selecione uma cidade da lista.');
  return;
}
```

#### **3.2 Validação em tempo real:**
```typescript
// Atualizar useEffect formValido (linha 153)
const isValid = estado.trim() !== '' && 
                cidade.trim() !== '' && 
                especialidade.trim() !== '' &&
                cidadeId !== ''; // ADICIONAR esta linha
```

---

## 🎯 ESPECIALIDADES E RELACIONAMENTOS

### **LISTA ATUAL (HARDCODED):**
```javascript
const ESPECIALIDADES_PADRAO = [
  "Acessórios Alarmes e Som",
  "Embreagens", 
  "Sistemas Anti-Furto",
  "Carrocerias",
  "Placas Automotivas",
  // ... 58 especialidades total (linhas 25-82)
];
```

### **RELACIONAMENTO COM ANUNCIANTES:**
```
Visitante busca: "PB" + "João Pessoa" + "Oficina"
↓
Sistema consulta: tabela Anuncio
WHERE cidade = "João Pessoa" AND especialidade LIKE "%Oficina%"
↓
Retorna: Anunciantes Premium (primeiro) + Cortesia (depois)
```

### **DIFERENCIAÇÃO PREMIUM vs CORTESIA:**
- **Premium:** Com imagem + layout completo + posição privilegiada
- **Cortesia:** Sem imagem + layout simples + posição posterior

---

## 📝 NOTAS CRÍTICAS PARA DESENVOLVEDORES

### **⚠️ ANTES DE MODIFICAR QUALQUER CÓDIGO:**

1. **Ler MEMORIADESESSAO.md** - Contexto completo do projeto
2. **Verificar APIs no navegador** - Confirmar se existem (404 = não existe)
3. **Testar autocompletar atual** - Entender fonte real dos dados
4. **Não assumir que arquivos existem** - Verificar no GitHub primeiro

### **🔍 MISTÉRIOS A INVESTIGAR:**

1. **Como autocompletar funciona** se APIs não existem?
2. **Onde estão os dados** de Estados e Cidades?
3. **Por que tabelas estão vazias** mas sistema funciona?

### **✅ TESTES OBRIGATÓRIOS:**

#### **Teste 1 - Combinação Válida:**
- Estado: "SP" 
- Cidade: "São Paulo"
- Especialidade: "Oficina"
- **Resultado esperado:** Botão habilitado, busca permitida

#### **Teste 2 - Combinação Inválida:**
- Estado: "PB"
- Cidade: "Seberi" (é do RS!)
- Especialidade: "Auto Elétricas"
- **Resultado esperado:** Botão desabilitado, erro mostrado

#### **Teste 3 - APIs:**
- **Testar:** `https://gfauto.vercel.app/api/estados`
- **Resultado atual:** 404 Not Found
- **Resultado esperado:** Lista de estados

---

## 🔗 ARQUIVOS E RELACIONAMENTOS

### **ESTRUTURA DE ARQUIVOS:**
```
GFauto/
├── app/
│   ├── page.tsx                    ← PÁGINA PRINCIPAL
│   ├── resultados/                 ← Página de resultados
│   └── api/
│       ├── estados/                ← ❌ NÃO EXISTE (criar)
│       ├── cidades/                ← ❌ NÃO EXISTE (criar)
│       └── especialidades/         ← ❌ NÃO EXISTE (criar)
├── components/
│   └── visitante/
│       ├── BuscaForm.tsx          ← COMPONENTE DE BUSCA
│       ├── HeroSection.tsx        ← Seção principal
│       └── ResultadosList.tsx     ← Lista de resultados
```

### **PÁGINAS CONECTADAS:**
- **`/`** → Página principal (este arquivo)
- **`/resultados`** → Recebe parâmetros da busca
- **`/planos`** → Link "Anuncie sua Empresa"

### **TABELAS DO BANCO:**
- **`estados`** → Estados brasileiros (vazia)
- **`cidades`** → Cidades por estado (vazia)  
- **`Anuncio`** → Anúncios dos anunciantes (21 campos)
- **`Advertiser`** → Dados dos anunciantes (26 campos)

---

## 📅 HISTÓRICO E PRÓXIMOS PASSOS

### **DESCOBERTAS DESTA ANÁLISE (13/07/2025):**
- ✅ **Problema identificado:** Validação Estado-Cidade inexistente
- ✅ **APIs faltantes:** /api/estados, /api/cidades, /api/especialidades
- ✅ **Tabelas vazias:** estados e cidades existem mas sem dados
- ✅ **Autocompletar funciona:** Fonte desconhecida (investigar)

### **PRÓXIMOS PASSOS DEFINIDOS:**
1. **Criar APIs** `/api/estados`, `/api/cidades`, `/api/especialidades`
2. **Popular tabelas** `estados` e `cidades` com dados brasileiros
3. **Implementar validação** Estado-Cidade no frontend
4. **Testar fluxo completo** de busca válida e inválida
5. **Documentar fonte** real do autocompletar atual

### **PRIORIDADE ALTA:**
- **Validação Estado-Cidade** - Impede buscas geograficamente impossíveis
- **APIs de dados** - Base para validação funcionar
- **População do banco** - Dados reais para consulta

---

## 🎯 OBJETIVO FINAL

### **COMPORTAMENTO ESPERADO APÓS CORREÇÕES:**

1. **Visitante acessa** página principal
2. **Digita "PB"** → Autocompletar mostra "Paraíba"
3. **Digita "Seberi"** → ❌ **Sistema impede:** "Cidade não existe em PB"
4. **Digita "João Pessoa"** → ✅ **Sistema aceita**
5. **Digita "Oficina"** → ✅ **Sistema aceita**
6. **Clica "Buscar"** → ✅ **Redireciona para resultados válidos**

### **RESULTADO:**
- ✅ **Apenas buscas geograficamente válidas** são permitidas
- ✅ **Feedback claro** quando combinação é inválida  
- ✅ **Página de resultados** sempre mostra dados relevantes
- ✅ **Experiência do usuário** melhorada significativamente

---

**⚠️ IMPORTANTE:** Este README deve ser consultado por qualquer desenvolvedor antes de modificar a página principal ou o sistema de busca do GFauto. Contém todas as informações necessárias para entender o funcionamento atual e implementar as correções necessárias.

**📋 LEMBRETE:** Sempre verificar MEMORIADESESSAO.md para contexto completo do projeto antes de qualquer alteração.

