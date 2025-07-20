
# GFauto/app/pagtos/README_pagtos.md

## Fluxo de Pagamento Premium

1. Escolha do plano em /planos/
2. Valor salvo na sessão e gravado no campo planoEscolhido
3. Checkout Mercado Pago
4. Após pagamento aprovado:
   - Liberação para criação do anúncio

## Renovação

- Cortesia: renova por mais 1 ano ao logar
- Premium: opções de renovação de 1, 2 ou 3 anos
- Alertas por e-mail em 30, 15 e 5 dias antes do vencimento

## Controle de Pagamentos

- Tabela Payment armazena status e histórico
- Webhook do Mercado Pago atualiza os registros automaticamente
