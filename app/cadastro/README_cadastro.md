
# GFauto/app/cadastro/README_cadastro.md

## Fluxo de Cadastro

1. O anunciante acessa /cadastro/
2. Preenche Nome, CPF, E-mail, Celular, Senha.
3. Escolhe o plano na etapa inicial (plano salvo via sessionStorage ou query param)
4. Recebe e-mail via Resend e confirma.
5. Após confirmação:
   - Cortesia: criação do anúncio diretamente
   - Premium: direcionado para pagamento

## Observações Técnicas

- Máscaras em CPF e celular
- Senha criptografada (bcrypt)
- Campo planoEscolhido gravado em Advertiser
- Autocompletar "O que procura?" abastecido pela tabela especialidades
