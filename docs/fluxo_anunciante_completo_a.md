# README: Fluxo Completo do Anunciante (Cadastro e Conclusão)

**Projeto:** GFauto  
**Local:** `GFauto/docs/README_fluxo_anunciante_completo.md`  
**Gerado em:** 23/07/2025

---

## 📌 Visão Geral

Este documento descreve o fluxo completo do anunciante dentro da aplicação GFauto, desde o cadastro inicial (Cadastro Simples) até a publicação final do anúncio, com validação de dados, controle de status, verificação de pagamento e renderização do preview visual do anúncio em tempo real.

---

## 🧩 Etapas do Fluxo

### 1. Cadastro Simples

- **Dados obrigatórios:**
  - Nome Completo
  - CPF
  - E-mail
  - Plano escolhido (Cortesia ou Premium)
- **Gatilhos:**
  - Geração de senha
  - Envio de e-mail com link de verificação
  - Registro com status: `iniciado`

### 2. Confirmação de E-mail

- Confirmação do e-mail recebido ativa o acesso à próxima etapa.
- Atualiza o status para: `pendente`

### 3. Conclusão do Cadastro (formulário completo)

- **Dados adicionais obrigatórios:**
  - Razão Social
  - Nome Fantasia
  - Endereço completo (CEP, Rua, Número, Bairro, Cidade, UF)
  - Telefones, WhatsApp, Redes Sociais
  - Descrição do Anúncio
  - Categoria e Subcategoria (Especialidade)
  - Imagens do Anúncio
- **Comportamento do sistema:**
  - Preview visual em tempo real do anúncio
  - Atualiza o status para: `completo`
  - Salva o campo `nomeParaAnuncio` baseado em opção do anunciante
  - Valida campos e garante unicidade de CPF/e-mail

### 4. Publicação do Anúncio

- Verifica:
  - Status do pagamento (Premium: `pago`, Cortesia: `ativo`)
  - Status do cadastro (`completo`)
- Libera botão “Publicar Anúncio”
- Atualiza `statusAnuncio`: `ativo`
- Atualiza `statusPagamento`: conforme o plano

---

## 🗂️ Estrutura no Banco

### Tabela: Advertiser

| Campo             | Origem                             | Obrigatório |
|------------------|-------------------------------------|-------------|
| id               | Prisma                              | Sim         |
| nome             | Cadastro Simples                    | Sim         |
| email            | Cadastro Simples                    | Sim         |
| senha            | Gerada e enviada                    | Sim         |
| planoEscolhido   | Cadastro Simples                    | Sim         |
| nomeFantasia     | Conclusão do Cadastro               | Sim         |
| razaoSocial      | Conclusão do Cadastro               | Sim         |
| nomeParaAnuncio  | Escolha entre Razão ou Fantasia     | Sim         |
| descricao        | Conclusão do Cadastro               | Sim         |
| endereco         | Conclusão do Cadastro               | Sim         |
| telefone, celular| Conclusão do Cadastro               | Sim         |
| statusCadastro   | `iniciado` → `pendente` → `completo`| Sim         |
| statusPagamento  | `aguardando`, `pago`, `não pago`    | Sim         |
| statusAnuncio    | `ativo`, `inativo`, `em análise`    | Sim         |
| createdAt        | Prisma automático                   | Sim         |
| updatedAt        | Prisma automático                   | Sim         |

---

## 🧪 Etapas de Teste

1. Criar anúncio (POST `/api/advertiser`)
2. Validar fluxo do PUT (edição) com todos os campos
3. Validar preview com dados da API
4. Validar transição de status e publicação

---

## 🔁 Futuras Interações

- Implementar status de renovação
- Alertas por e-mail (30, 15, 5 dias)
- Integração com painel do admin
- Logs de movimentação

---

## ✅ Conclusão

Este README serve como referência oficial do fluxo de cadastro e conclusão do anunciante, garantindo que desenvolvedores futuros entendam as etapas, campos envolvidos e requisitos técnicos.

