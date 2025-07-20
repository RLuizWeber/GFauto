
# GFauto/README_geral.md

**Versão:** 2.0  
**Autor:** Alcides Weber & Dev Team  
**Data:** 2025-07-17  
**Comentários:** Documento consolidado e aprofundado para orientar desenvolvedores futuros sobre o projeto GFauto.

## Descrição do Sistema

O GFauto é uma plataforma que conecta visitantes em busca de serviços automotivos a anunciantes (empresas, oficinas, lojas). O sistema permite a busca por estado, cidade e especialidade, exibindo os anúncios disponíveis.

## Tecnologias Utilizadas

- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL (Neon / Vercel Postgres)
- Mercado Pago (pagamentos)
- Resend (envio de e-mails)
- Vercel (deploy)

## Fluxos Principais

1. Cadastro do anunciante
2. Escolha de plano (Cortesia ou Premium)
3. Criação do anúncio
4. Pagamento (para Premium)
5. Exibição dos anúncios na página de resultados
6. Painel do anunciante (edição, renovação, gestão)
7. Painel admin (gestão e monitoramento)

## Arquitetura de Pastas

```
GFauto/
├── app/
│   ├── admin/
│   ├── advertiser/
│   ├── anuncio
│   ├── api/
│   ├── cadastro/
│   ├── pagina-correta/
│   ├── pagtos/
│   ├── planos/
│   ├── resultados/
```

## Banco de Dados

- Advertiser (anunciantes)
- Anuncios (anúncios publicados)
- Payment (controle de pagamentos)
- Estados / Cidades (referência do Brasil)
- Especialidades (serviços)
- rotacao_premium (controle de rotação na página de resultados)
- imagens_anuncio (armazenamento de imagens)

## Alertas e Administração

O sistema dispara alertas críticos para o admin-panel em tempo real sobre:

- Cadastros incompletos
- Anúncios vencendo
- Pagamentos não concluídos

## Política de Dados

- Backup a definir (Vercel ou outro)
- Retenção de dados: cadastro incompleto será notificado e removido após X dias sem ação.

## Roadmap Futuro

- Multi-região e internacionalização
- Estatísticas de anúncios
- Central de mensagens
- Unificação dos repositórios gfauto e gfauto-repo
