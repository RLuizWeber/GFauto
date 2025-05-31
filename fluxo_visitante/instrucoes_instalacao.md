# Instruções de Instalação - Fluxo do Visitante GFauto

Este arquivo contém instruções detalhadas sobre onde cada arquivo do pacote deve ser colocado no seu repositório local.

## Estrutura de Arquivos

### Schema Prisma
- `/fluxo_visitante_zip/prisma/schema.prisma` → Copiar para `/prisma/schema.prisma`

### APIs
- `/fluxo_visitante_zip/app/api/estados/route.ts` → Copiar para `/app/api/estados/route.ts`
- `/fluxo_visitante_zip/app/api/cidades/route.ts` → Copiar para `/app/api/cidades/route.ts`
- `/fluxo_visitante_zip/app/api/especialidades/route.ts` → Copiar para `/app/api/especialidades/route.ts`
- `/fluxo_visitante_zip/app/api/anuncios/route.ts` → Copiar para `/app/api/anuncios/route.ts`
- `/fluxo_visitante_zip/app/api/anuncios/[id]/route.ts` → Copiar para `/app/api/anuncios/[id]/route.ts`

### Componentes Frontend
- `/fluxo_visitante_zip/components/visitante/BuscaForm.tsx` → Copiar para `/components/visitante/BuscaForm.tsx`
- `/fluxo_visitante_zip/components/visitante/HeroSection.tsx` → Copiar para `/components/visitante/HeroSection.tsx`
- `/fluxo_visitante_zip/components/visitante/ResultadosList.tsx` → Copiar para `/components/visitante/ResultadosList.tsx`
- `/fluxo_visitante_zip/components/visitante/AnuncioCard.tsx` → Copiar para `/components/visitante/AnuncioCard.tsx`
- `/fluxo_visitante_zip/components/visitante/Pagination.tsx` → Copiar para `/components/visitante/Pagination.tsx`
- `/fluxo_visitante_zip/components/visitante/LoadingResults.tsx` → Copiar para `/components/visitante/LoadingResults.tsx`

### Páginas
- `/fluxo_visitante_zip/app/page.tsx` → Copiar para `/app/page.tsx` (substituir o existente)
- `/fluxo_visitante_zip/app/resultados/page.tsx` → Copiar para `/app/resultados/page.tsx`
- `/fluxo_visitante_zip/app/anuncio/[id]/page.tsx` → Copiar para `/app/anuncio/[id]/page.tsx`

### Imagens
- `/fluxo_visitante_zip/public/images/hero-bg.jpg` → Copiar para `/public/images/hero-bg.jpg`
- `/fluxo_visitante_zip/public/images/placeholder.jpg` → Copiar para `/public/images/placeholder.jpg`

### Documentação
- `/fluxo_visitante_zip/docs/fluxo_visitante_integracao.md` → Copiar para `/docs/fluxo_visitante_integracao.md`
- `/fluxo_visitante_zip/docs/instrucoes_commit_push.md` → Copiar para `/docs/instrucoes_commit_push.md`

## Passos após a cópia dos arquivos

1. Verifique se todos os arquivos foram copiados para os locais corretos
2. Execute a migração do Prisma:
   ```bash
   npx prisma migrate dev --name add_visitor_flow_models
   ```
3. Gere o cliente Prisma:
   ```bash
   npx prisma generate
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Teste o fluxo completo localmente
6. Faça commit e push para o GitHub conforme as instruções em `/docs/instrucoes_commit_push.md`
