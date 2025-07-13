# README - PÁGINA PRINCIPAL GFAUTO  // GFauto/app/README_pagPrincipal.md

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

## 🔧 FUNCIONAMENTO ATUAL

### **CAMPOS DE BUSCA:**

#### **1. CAMPO ESTADO:**
- **Placeholder:** "Ex: RS ou Rio Grande do Sul"
- **Autocompletar:** ✅ Funciona
- **Fonte de dados:** API `/api/estados`
- **Validação:** ✅ Verifica se preenchido

#### **2. CAMPO CIDADE:**
- **Placeholder:** "Digite o nome da cidade"
- **Autocompletar:** ✅ Funciona (dependente do Estado)
- **Fonte de dados:** API `/api/cidades?estado_id=${estadoId}`
- **Validação:** ✅ Verifica se preenchido

#### **3. CAMPO ESPECIALIDADE:**
- **Placeholder:** "Ex: oficina, autopeças, concessionária"
- **Autocompletar:** ✅ Funciona (dependente da Cidade)
- **Fonte de dados:** API `/api/especialidades?cidade_id=${cidadeId}`
- **Validação:** ✅ Verifica se preenchido

---

## 🚨 PROBLEMAS IDENTIFICADOS

### **PROBLEMA CRÍTICO: VALIDAÇÃO INSUFICIENTE**

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

// PROBLEMA: Não valida se cidade existe no estado!
router.push(`/resultados?estado=${estado}&cidade=${cidade}&especialidade=${especialidade}`);
```

**Resultado do problema:**
- ✅ **Aceita:** "SP" + "São Paulo" (válido)
- ❌ **Aceita:** "MT" + "Erechim" (INVÁLIDO - Erechim é do RS!)
- ❌ **Redireciona sempre** para página de resultados
- ❌ **Mostra "sem resultados"** em vez de impedir busca

---

## 📊 DADOS E APIs

### **FONTE DOS DADOS:**

#### **Estados:**
- **API:** `GET /api/estados`
- **Retorna:** Lista de estados brasileiros
- **Formato:** `[{id, nome, sigla}]`

#### **Cidades:**
- **API:** `GET /api/cidades?estado_id=${estadoId}`
- **Retorna:** Cidades do estado selecionado
- **Formato:** `[{id, nome}]`

#### **Especialidades:**
- **API:** `GET /api/especialidades?cidade_id=${cidadeId}`
- **Retorna:** Especialidades disponíveis na cidade
- **Formato:** `[{id, nome}]`

### **ESPECIALIDADES HARDCODED:**

**Lista padrão (linhas 25-82):**
```javascript
const ESPECIALIDADES_PADRAO = [
  "Acessórios Alarmes e Som",
  "Embreagens",
  "Sistemas Anti-Furto",
  // ... 58 especialidades total
];
```

---

## 🔄 FLUXO DE FUNCIONAMENTO

### **1. CARREGAMENTO INICIAL:**
```
useEffect() → fetchEstados() → Popula dropdown Estados
```

### **2. SELEÇÃO DE ESTADO:**
```
usuário digita → buscarEstados() → filtra lista → selecionarEstado()
→ limpa cidade e especialidade → foca próximo campo
```

### **3. SELEÇÃO DE CIDADE:**
```
usuário digita → buscarCidades() → API /api/cidades → filtra lista
→ selecionarCidade() → limpa especialidade → foca próximo campo
```

### **4. SELEÇÃO DE ESPECIALIDADE:**
```
usuário digita → buscarEspecialidades() → API /api/especialidades
→ combina com ESPECIALIDADES_PADRAO → filtra lista
```

### **5. SUBMISSÃO (PROBLEMÁTICA):**
```
handleSubmit() → valida campos preenchidos → router.push('/resultados')
❌ NÃO valida compatibilidade Estado-Cidade
```

---

## ✅ SOLUÇÃO RECOMENDADA

### **CORREÇÃO NA VALIDAÇÃO:**

**Adicionar em `handleSubmit()` (após linha 350):**

```typescript
// NOVA VALIDAÇÃO: Verificar compatibilidade Estado-Cidade
if (estado && cidade && !cidadeId) {
  setError('Esta cidade não existe no estado selecionado. Por favor, selecione uma cidade da lista.');
  return;
}

// NOVA VALIDAÇÃO: Verificar se especialidade existe
if (especialidade && !especialidadeId && !ESPECIALIDADES_PADRAO.includes(especialidade)) {
  setError('Especialidade não encontrada. Por favor, selecione uma opção da lista.');
  return;
}
```

### **MELHORIAS ADICIONAIS:**

1. **Feedback visual:** Desabilitar botão quando combinação inválida
2. **Validação em tempo real:** Verificar compatibilidade ao digitar
3. **Mensagens claras:** Explicar por que busca não é permitida

---

## 🎯 ESTRUTURA DE ARQUIVOS

```
GFauto/
├── app/
│   ├── page.tsx                    ← PÁGINA PRINCIPAL
│   ├── resultados/                 ← Página de resultados
│   └── api/
│       ├── estados/                ← API de estados
│       ├── cidades/                ← API de cidades
│       └── especialidades/         ← API de especialidades
├── components/
│   └── visitante/
│       ├── BuscaForm.tsx          ← COMPONENTE DE BUSCA
│       ├── HeroSection.tsx        ← Seção principal
│       └── ResultadosList.tsx     ← Lista de resultados
```

---

## 📝 NOTAS PARA DESENVOLVEDORES

### **IMPORTANTE SABER:**

1. **Tabelas vazias:** As tabelas `estados` e `cidades` no banco estão vazias, mas as APIs funcionam (fonte não identificada)

2. **Autocompletar funciona:** Mesmo com banco vazio, o autocompletar de Estados e Cidades funciona perfeitamente

3. **Especialidades híbridas:** Combina dados da API com lista hardcoded

4. **Validação crítica:** O problema principal é a falta de validação Estado-Cidade

5. **Página de resultados:** Aceita qualquer parâmetro e mostra "sem resultados" quando inválido

### **ANTES DE MODIFICAR:**

- ✅ Testar autocompletar atual
- ✅ Verificar APIs de dados
- ✅ Entender fluxo completo
- ✅ Implementar validação adequada

### **TESTES RECOMENDADOS:**

1. **Teste válido:** "SP" + "São Paulo" + "Oficina"
2. **Teste inválido:** "MT" + "Erechim" + "Auto Elétricas"
3. **Teste vazio:** Campos em branco
4. **Teste autocompletar:** Verificar sugestões

---

## 🔗 RELACIONAMENTOS

### **PÁGINAS CONECTADAS:**
- **`/`** → Página principal (este arquivo)
- **`/resultados`** → Recebe parâmetros da busca
- **`/planos`** → Link "Anuncie sua Empresa"

### **APIs UTILIZADAS:**
- **`/api/estados`** → Lista de estados
- **`/api/cidades`** → Cidades por estado
- **`/api/especialidades`** → Especialidades por cidade

### **COMPONENTES RELACIONADOS:**
- **`BuscaForm.tsx`** → Formulário principal
- **`ResultadosList.tsx`** → Exibe resultados
- **`HeroSection.tsx`** → Layout da página

---

## 📅 HISTÓRICO DE MODIFICAÇÕES

- **Última atualização:** 07/06/2025 - "Corrige exibição da mensagem de erro de carregamento dos estados"
- **Problema identificado:** 13/07/2025 - Validação Estado-Cidade insuficiente
- **Análise completa:** 13/07/2025 - Mapeamento completo do funcionamento

---

**Este README deve ser consultado por qualquer desenvolvedor antes de modificar a página principal ou o sistema de busca do GFauto.**

