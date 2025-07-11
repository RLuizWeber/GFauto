// Local desse arquivo: GFauto/app/cadastro
# README_fluxo_cadastro.md (ok)

**Módulo de Cadastro e Autenticação - Projeto GFauto**  
**Data de Criação:** 04/07/2025  
**Responsável:** Desenvolvedor sob orientação de Weber  
**Baseado em:** Estudo.md e diretrizes do MEMORIADESESSAO.md

---

## 🎯 OBJETIVO DO FLUXO

O **app/cadastro** é responsável por gerenciar todo o processo de cadastro de novos anunciantes, autenticação de usuários existentes e validação de dados no Projeto GFauto.

### **Funcionalidades Principais:**
- Escolha do Plano, app/planos
- *Cadastro simples* de novos anunciantes (Cortesia e Premium)
- Sistema de login e autenticação (ao logar aparece as opções para direcioná- lo: Novo anúncio - atualizar dados - efetuar pagto - status pagto, etc
- Validação da senha por e-mail obrigatória
- Redirecionamento inteligente baseado no plano escolhido
- *conclusão do cadastro* para Cortesia e para Premium → Publicar
- Gestão de sessões de usuário

---

## 🔄 FLUXO COMPLETO DE CADASTRO

2. **Fluxo do Anunciante**
   - Orígem: https://gfauto.vercel.app/   (após clicar em "Anuncie sua Empresa" vai para "planos" https://gfauto.vercel.app/planos qualquer dos planos escolhidos, 1 ano, 2 anos e 3 anos vai para o "cadastro simples" levando a informação do plano clicado para saber quanto vai pagar e segue o fluxo.)
   - Escolha do Plano (**Premium** → *cadastro simples* (nome do responsável, cpf, principal e-mail e Celular de Contato) e login → pagtos (com a inormação do valor do Plano vai para o pagamento → *conclusão do cadastro* (Razão Social, Nome de Fantasia, CNPJ, nome do responsável (já vem preenchido do cadastro simples), cpf (também já vem preenchido) Celular de Contato (também já vem preenchido), Endereço da Empresa, Bairro, CEP, Cidade, Estado, Seu Cargo), inserir imagem).  → *criação e ativação (botão "Publicar") do anúncio* (deve ser na mesma página *conclusão do cadastro* pois o anúncio vai sendo preenchido conforme o anunciante informa os dados da *conclusão do cadastro*.  | **Cortesia** → *cadastro simples* (nome do responsável, cpf, principal e-mail e telefone) e login → *conclusão do cadastro* (Razão Social, Nome de Fantasia, CNPJ, nome do responsável (já vem preenchido do cadastro simples), cpf (também já vem preenchido) Celular de Contato (também já vem preenchido), Endereço da Empresa, Bairro, CEP, Cidade, Estado, Seu Cargo) criação e ativação (botão "publicar") do anúncio)
== Anúncio Premium modelo: página: https://gfauto.vercel.app/plano logo depois da frase "Como seu anúncio vai aparecer". (o anunciante vai optar através de checkbox no formulário qual ele quer que figure Razão Social ou Nome de Fantasia).
== Anúncio Cortesia modelo: página: https://gfauto.vercel.app/plano logo depois das amostras de Anúncios Premium. Vai figurar a Razão Social ou Nome de Fantasia e endereço completo. (o anunciante vai optar através de checkbox no formulário qual ele quer que figure).

### **ENTRADA NO SISTEMA:**
```
Página Principal → "Anuncie sua Empresa" → Página de Planos → Escolha do Plano → CADASTRO
```

### **FLUXOS POR TIPO DE PLANO:**

#### **CORTESIA (Gratuito):**
```
1. Página de Planos (/planos?plano=cortesia)
2. Cadastro simples (/cadastro?plano=cortesia)
3. Sistema Login e autenticação (criar)
4. Validação de E-mail
5. Conclusão do cadastro Dados do Anúncio (/anunciante/criar) (com visualização prévia)
6. Publicação Imediata  - link para conferir.
7. E-mail de Confirmação/Parabenização
```

#### **PREMIUM (Pago):**
```
1. Página de Planos (/planos?plano=premium)
2. Cadastro (/cadastro?plano=premium)
3. Validação de E-mail
4. Pagamento (/pagamento) ← LÓGICA WEBER: Pagar antes de criar anúncio
5. Conclusão do cadastro Dados do Anúncio (/anuncio/criar) (com visualização prévia)
6. Publicação Imediata Condicionada ao Pagamento - link para conferir
7. E-mail de Confirmação/Parabenização
```

---

## 📋 ESTRUTURA DE DADOS

### **Campos do Formulário de Cadastro (baseado no Estudo.md):**

#### **PARTE 1: Dados Básicos ("cadastro simples" para o Cadastro e Dados de Acesso ( A confirmação do cadastro e login deverá ser feita pelo e-mail do cadastro)
- **Nome do Responsável** (obrigatório)
- **CPF** (obrigatório)
- **Cel. de Contato** (obrigatório)
- **Seu Principal E-mail** (obrigatório)
- **Senha** (mínimo 8 caracteres)
- **Confirmar Senha**

#### **PARTE 2: Dados complementares ("conclusão do cadastro") para formar o anúncio que será publicado)

- **Razão Social** (obrigatório)
- **Nome de Fantasia**(obrigatório)
- **CNPJ** (obrigatório)
- **Nome do Responsável** (obrigatório, já puxa da (PARTE 1 informada antes) 
- **CPF** (obrigatório, já puxa da (PARTE 1 informada antes)
- **Cel. de Contato** (obrigatório, já puxa da (PARTE 1 informada antes)
- **Seu Principal E-mail** (obrigatório, já puxa da (PARTE 1 informada antes)
- **Endereço da Empresa** (obrigatório)
- **Bairro** (obrigatório)
- **CEP** (obrigatório)
- **Cidade** (obrigatório)
- **Estado** (obrigatório)
- **Seu Cargo** (obrigatório)
- **Inserir Imagem** 

#### **PARTE 3: Criando o Anúncio
- **Novo Anúncio** O "Cortesia" depois do cadastro e logado já vai para "Criar Anúncio" e o "premium" depois do pagamento já vai para "Criar Anúncio", ambos quando chegare na página "Criar Anúncio" ela já estará preenchida com os dados do cadastro faltando (slogam, especialidade, descrição, etc.) ele completar e ver seu anúncio enquanto completa, até clicar em "publicar"

### **Modelo Prisma (Advertiser):** (conferir com Estrutura de Dados e FLUXO COMPLETO DE CADASTRO)
```prisma
model Advertiser {
  id                String    @id @default(cuid())
  email             String    @unique
  nome              String?   // Nome/Razão Social
  empresa           String?   // Nome de Fantasia
  telefone          String?   // Cel. de Contato
  endereco          String?
  cidade            String?
  estado            String?
  cep               String?
  cnpj              String?
  pessoaResponsavel String?
  cpf               String?
  celContato        String?
  cargo             String?
  senha             String    // Hash bcrypt
  planoEscolhido    String?   // 'cortesia' ou 'premium'
  emailVerificado   Boolean   @default(false)
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  payments          Payment[]
  anuncios          Anuncio[]
}
```

---

## 🎨 INTERFACE E DESIGN

### **Cabeçalho da Página (baseado em /planos):**
- **Título Principal:** "Anuncie seu serviço/produto automotivo no GFauto" (30% menor que /planos)
- **Título Secundário:** "Faça seu Cadastro" (substitui "Escolha seu Plano")
- **Subtítulo:** "Conecte-se com milhares de clientes que procuram serviços automotivos na sua região" (mantém igual)

### **Layout do Formulário:**
- **Design responsivo** (desktop e mobile)
- **Validação em tempo real** (frontend)
- **Feedback visual** para erros
- **Progress indicator** mostrando plano escolhido
- **Botão principal:** "Criar Cadastro"

### **Estados do Formulário:**
- **Loading:** "Criando Cadastro..."
- **Sucesso:** Redirecionamento automático
- **Erro:** Mensagens específicas por campo

---

## 🔐 VALIDAÇÕES E SEGURANÇA

### **Validações Frontend:**
- **Campos obrigatórios:** (veja: Parte 1 e Parte 2 de Dados complementares
- **Formato de e-mail:** Regex validation
- **Força da senha:** Mínimo 8 caracteres - letras e números no mínimo:1 maiúscula, 1 minúscula e 1 caracter especial [* # & $ ( ! ]
- **Confirmação de senha:** Deve ser igual à senha
- **CNPJ/CPF:** Formato brasileiro 

### **Validações Backend:**
- **E-mail único:** Verificar se já existe no banco para cada especialidade
- **CNPJ único:** Verificar se já existe no banco para cada especialidade
- **Sanitização:** Limpar dados de entrada
- **Hash de senha:** bcrypt com salt
- **Rate limiting:** Prevenir spam de cadastros

### **Segurança:**
- **Senhas hasheadas** com bcrypt
- **Validação de e-mail obrigatória**
- **Sessões seguras** com JWT ou similar
- **Proteção CSRF**

---

## 📧 SISTEMA DE E-MAILS

### **E-mail de Verificação (Resend.com):**
```
Assunto: "Confirme seu e-mail - GFauto"
Conteúdo:
- Boas-vindas ao GFauto
- Link de confirmação
- Instruções claras
- Suporte de contato
```

### **E-mail de Boas-vindas (pós-confirmação):**
```
Assunto: "Bem-vindo ao GFauto!"
Conteúdo:
- Confirmação de cadastro
- Próximos passos baseados no plano
- Links úteis (painel, suporte)
```

---

## 🔄 REDIRECIONAMENTOS

### **Após Cadastro Bem-sucedido:**

#### **CORTESIA:**
```
/cadastro → Validação E-mail → /anuncio/criar?advertiser_id={id}
```

#### **PREMIUM:**
```
/cadastro → Validação E-mail → /pagamento?advertiser_id={id} → /anuncio/criar?advertiser_id={id}
```

### **Usuários Existentes (Login):**
```
/login → Dashboard Pessoal → Opções:
├── Criar Novo Anúncio
├── Gerenciar Anúncios Existentes
├── Atualizar Dados Cadastrais
├── Renovar Plano
└── Upgrade para Premium
```

---

## 🛠️ ARQUIVOS E COMPONENTES

### **Estrutura do Módulo:**
```
app/cadastro/
├── components/
│   ├── CadastroForm.tsx           # Formulário principal
│   ├── LoginForm.tsx              # Formulário de login
│   ├── EmailVerification.tsx      # Componente de verificação
│   └── PasswordStrength.tsx       # Indicador de força da senha
├── pages/
│   ├── cadastro.tsx               # Página de cadastro
│   ├── login.tsx                  # Página de login
│   └── verificar-email.tsx        # Página de verificação
├── styles/
│   └── cadastro.module.css        # Estilos específicos
└── README_cadastro.md       # Este arquivo
``` 

### **APIs Necessárias:**
```
app/api/
├── cadastro/route.ts              # POST - Criar novo cadastro
├── login/route.ts                 # POST - Autenticar usuário
├── verificar-email/route.ts       # GET - Confirmar e-mail
└── resend-verification/route.ts   # POST - Reenviar verificação
```

---

## 📊 MÉTRICAS E MONITORAMENTO

### **KPIs do Fluxo de Cadastro:**
- **Taxa de conversão:** Visitantes → Cadastros
- **Taxa de verificação:** Cadastros → E-mails verificados
- **Taxa de abandono:** Por etapa do processo
- **Tempo médio:** Para completar cadastro
- **Erros mais comuns:** Validações que falham

### **Logs Importantes:**
- Tentativas de cadastro
- E-mails duplicados
- Falhas de validação
- Problemas de envio de e-mail

---

## 🚨 TRATAMENTO DE ERROS

### **Erros Comuns e Soluções:**

#### **E-mail já cadastrado:**
```
Mensagem: "Este e-mail já está cadastrado. Deseja fazer login?"
Ação: Link para página de login
```

#### **Falha no envio de e-mail:**
```
Mensagem: "Cadastro criado, mas houve problema no envio do e-mail de verificação."
Ação: Botão "Reenviar E-mail"
```

#### **Dados inválidos:**
```
Mensagem: Específica por campo
Ação: Destacar campo com erro
```

---

## 🔄 INTEGRAÇÃO COM OUTROS FLUXOS

### **app/pagtos:**
- Recebe `advertiser_id` após cadastro premium
- Processa pagamento antes de criar anúncio

### **app/anunciante:**
- Recebe `advertiser_id` após cadastro/pagamento
- Cria anúncio vinculado ao anunciante

### **fluxo_email:** (verificar onde vai ficar na estrutura)
- Envia e-mails de verificação
- Envia e-mails de boas-vindas
- Notificações de status

---

## 📝 PRÓXIMOS PASSOS

### **Implementação Imediata:**
1. **Criar página de cadastro** (`/cadastro`)
2. **Implementar API de cadastro** (`/api/cadastro`)
3. **Sistema de validação de e-mail**
4. **Página de login** (`/login`)
5. **Integração com Resend.com**

### **Melhorias Futuras:**
- **Login social** (Google, Facebook)
- ****Recuperação de senha** (a partir do primeiro cadastro já precisa existir a possibilidade).
- **Autenticação de dois fatores**
- **Dashboard personalizado**

---

## 🎯 CRITÉRIOS DE SUCESSO

### **Funcional:**
- [x] Cadastro funciona para cortesia e premium
- [x] Validação de e-mail obrigatória
- [x] Redirecionamento correto por plano
- [x] Login de usuários existentes
- [x] Integração com outros fluxos

### **Técnico:**
- [x] Validações frontend e backend
- [x] Segurança de senhas
- [x] Performance adequada
- [x] Responsividade mobile

### **UX/UI:**
- [x] Interface intuitiva
- [x] Feedback claro de erros
- [x] Processo fluido
- [x] Design consistente

---

## 📞 SUPORTE E MANUTENÇÃO

### **Logs de Debug:**
- Todos os cadastros são logados
- Erros de validação registrados
- Problemas de e-mail monitorados

### **Backup de Dados:**
- Dados de cadastro em backup diário
- Senhas nunca em logs
- Conformidade com LGPD

---

**Documento criado por:** Desenvolvedor  
**Baseado em:** Estudo.md, MEMORIADESESSAO.md e diretrizes de Weber  
**Próxima ação:** Implementar página de cadastro  
**Status:** Pronto para desenvolvimento

---

**⚠️ IMPORTANTE:** Este fluxo é crítico para conversão. Qualquer alteração deve ser testada cuidadosamente e aprovada por Weber antes da implementação.

