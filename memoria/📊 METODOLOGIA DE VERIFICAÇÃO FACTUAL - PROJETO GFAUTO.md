# 📊 METODOLOGIA DE VERIFICAÇÃO FACTUAL - PROJETO GFAUTO

## 📅 Data de Criação
11/06/2025 - 19:24

## 🎯 OBJETIVO
Estabelecer um protocolo rigoroso para evitar suposições sem base em fatos reais, garantindo que todas as ações e decisões sejam fundamentadas em evidências verificáveis do projeto GFauto.

## 📋 PROTOCOLO COMPLETO

### **1. Sincronização Obrigatória com GitHub**
- ✅ **Início de cada sessão:** `git pull origin main` para garantir código atualizado
- ✅ **Verificação periódica:** A cada 30 minutos repetir sincronização
- ✅ **Registro de timestamp:** Documentar quando foi a última sincronização
- ✅ **Comando padrão:**
  ```bash
  cd /home/ubuntu/GFauto
  git pull origin main
  echo "Última sincronização: $(date)" >> /home/ubuntu/memoria/ultima_sincronizacao.log
  ```

### **2. Protocolo de Três Fontes**
Para qualquer afirmação sobre o projeto, verificar SEMPRE em três fontes:
- ✅ **README principal:** Visão oficial documentada
- ✅ **Código fonte atual:** Implementação real no GitHub
- ✅ **Histórico de commits:** Evolução e mudanças recentes

### **3. Documentação de Evidências**
- ✅ **Citar explicitamente:** "Conforme arquivo X, linha Y"
- ✅ **Incluir trechos relevantes:** Mostrar o código/texto exato
- ✅ **Registrar caminho completo:** Localização exata do arquivo
- ✅ **Exemplo:**
  ```
  Conforme /home/ubuntu/GFauto/README.md (linhas 5-10):
  
  > O Projeto GFauto atualmente na página https://www.gfauto.com.br está sendo 
  > reestruturado e implementado no novo projeto iniciando e https://gfauto.vercel.app/...
  ```

### **4. Confirmação Explícita**
- ✅ **Antes de qualquer ação:** "Baseado no arquivo X, entendo que..."
- ✅ **Solicitar validação:** "Esta interpretação está correta?"
- ✅ **Documentar decisões:** Registrar confirmações no arquivo de memória
- ✅ **Exemplo de fluxo:**
  1. "Baseado no README.md, entendo que o projeto visa expor anunciantes de serviços automotivos."
  2. Aguardar confirmação do usuário
  3. Registrar no arquivo de memória: "CONFIRMADO: Objetivo do projeto é expor anunciantes (validado em 11/06/2025)"

### **5. Atualização do Arquivo de Memória**
- ✅ **Seção de Fatos Verificados:** Lista de informações confirmadas
- ✅ **Seção de Pendências:** Questões que precisam de verificação
- ✅ **Seção de Fontes:** Links para arquivos consultados
- ✅ **Formato padrão:**
  ```markdown
  ## FATOS VERIFICADOS
  - [🟢] Objetivo do projeto: expor anunciantes de serviços automotivos
    - Fonte: README.md (linha 5)
    - Confirmado em: 11/06/2025
  
  ## PENDÊNCIAS
  - [🔴] Funcionamento do campo cidade - precisa verificar implementação atual
  
  ## FONTES CONSULTADAS
  - /home/ubuntu/GFauto/README.md (11/06/2025)
  - /home/ubuntu/GFauto/components/visitante/HeroSectionCorreto.tsx (11/06/2025)
  ```

### **6. Marcadores de Confiança**
Para cada informação no arquivo de memória:
- 🟢 **Verificado:** Confirmado em múltiplas fontes
- 🟡 **Parcial:** Verificado em uma fonte apenas
- 🔴 **Não verificado:** Precisa de confirmação

## 🚨 REGRAS ABSOLUTAS

1. **NUNCA fazer suposições** sem verificação nas três fontes
2. **NUNCA implementar soluções** sem confirmação explícita do usuário
3. **NUNCA criar resumos próprios** baseados apenas em interpretação
4. **SEMPRE documentar** a fonte exata de cada informação
5. **SEMPRE atualizar** o arquivo de memória após cada verificação
6. **SEMPRE sincronizar** com o GitHub antes de qualquer análise

## 📈 BENEFÍCIOS DA METODOLOGIA

- **Eliminação de suposições** infundadas
- **Decisões baseadas** em evidências verificáveis
- **Rastreabilidade** de todas as informações
- **Transparência** no processo de trabalho
- **Confiabilidade** nas soluções implementadas

## 🔄 PROCESSO DE REVISÃO DA METODOLOGIA

Esta metodologia deve ser revisada:
1. Após cada sessão de trabalho
2. Quando novos tipos de erros forem identificados
3. Quando o usuário sugerir melhorias
4. A cada 5 sessões de trabalho (revisão periódica)

## 📝 REGISTRO DE ATUALIZAÇÕES

- **11/06/2025 - 19:24:** Criação inicial da metodologia
