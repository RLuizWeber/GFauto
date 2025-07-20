
// GFauto/app/advertiser/README_anunciante.md

# GFauto - Fluxo de Implementação do Anunciante

## ✅ Etapa 1 - Cadastro e Autenticação

- [ ] Criar `/cadastro/page.tsx` (Cadastro simples)
- [ ] Implementar API `/api/cadastro/` para gravação no banco
- [ ] Integrar Resend para e-mail de confirmação

## ✅ Etapa 2 - Fluxo Pós-Cadastro

- [ ] Cortesia: Redirecionar para `/advertiser/criar`
- [ ] Premium: Redirecionar para `/pagtos/checkout`

## ✅ Etapa 3 - Pagamento (Premium)

- [ ] Criar `/pagtos/checkout` com integração Mercado Pago
- [ ] Implementar webhook para confirmação automática

## ✅ Etapa 4 - Anúncio

- [ ] Criar `/advertiser/criar` (formulário de anúncio)
- [ ] Salvar dados na tabela `Anuncios` vinculando ao `Advertiser.id`

## ✅ Etapa 5 - Painel do Anunciante

- [ ] Criar `/advertiser/painel`
- [ ] Exibir funções:
    - Fazer Novo Anúncio
    - Migrar para Premium
    - Renovar Anúncio
    - Editar Anúncio Existente
    - Meus Dados
    - Alterar Senha
    - Sair (logout seguro)

## ✅ Etapa 6 - Gestão de Rotação Premium

- [ ] Implementar lógica de rodízio na exibição dos anúncios premium
- [ ] Usar tabela `rotacao_premium`

## ✅ Etapa 7 - Alertas e Notificações

- [ ] Programar alertas no painel do anunciante
- [ ] Disparar e-mails automáticos 30, 15, 5 dias antes do vencimento

---

## 🔄 Observações

- Fluxo respeita o que foi documentado nos READMEs atualizados
- Painel do Premium só aparece após pagamento e segundo login


## Melhorias Futuras

- Estatísticas de visualização do anúncio
- Central de mensagens com o admin
