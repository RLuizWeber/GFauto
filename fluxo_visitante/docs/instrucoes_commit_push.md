# Instruções para Commit e Push do Fluxo do Visitante - GFauto

## Visão Geral

Este documento fornece instruções detalhadas para realizar o commit e push das alterações do fluxo do visitante para o repositório GitHub do projeto GFauto.

## Arquivos Modificados/Adicionados

### Schema Prisma
- `/prisma/schema_integrado.prisma` → Renomear para `/prisma/schema.prisma`

### APIs
- `/app/api/estados/route.ts`
- `/app/api/cidades/route.ts`
- `/app/api/especialidades/route.ts`
- `/app/api/anuncios/route.ts`
- `/app/api/anuncios/[id]/route.ts`

### Componentes Frontend
- `/components/visitante/BuscaForm.tsx`
- `/components/visitante/HeroSection.tsx`
- `/components/visitante/ResultadosList.tsx`
- `/components/visitante/AnuncioCard.tsx`
- `/components/visitante/Pagination.tsx`
- `/components/visitante/LoadingResults.tsx`

### Páginas
- `/app/page.tsx` (modificado)
- `/app/resultados/page.tsx` (novo)
- `/app/anuncio/[id]/page.tsx` (novo)

### Documentação
- `/docs/fluxo_visitante_integracao.md`

## Passos para Commit e Push

### 1. Preparar os Arquivos

1. Renomear o schema integrado:
   ```bash
   mv /prisma/schema_integrado.prisma /prisma/schema.prisma
   ```

2. Verificar se todos os arquivos estão nos locais corretos:
   ```bash
   ls -la /app/api/estados/
   ls -la /app/api/cidades/
   ls -la /app/api/especialidades/
   ls -la /app/api/anuncios/
   ls -la /app/api/anuncios/[id]/
   ls -la /components/visitante/
   ls -la /app/resultados/
   ls -la /app/anuncio/[id]/
   ls -la /docs/
   ```

### 2. Adicionar Imagens Necessárias

1. Criar pasta para imagens se não existir:
   ```bash
   mkdir -p /public/images/
   ```

2. Adicionar imagem de fundo para o HeroSection:
   - Adicionar arquivo `hero-bg.jpg` em `/public/images/`

3. Adicionar imagem placeholder para anúncios sem imagem:
   - Adicionar arquivo `placeholder.jpg` em `/public/images/`

### 3. Executar Migração do Prisma

1. Gerar migração do Prisma:
   ```bash
   npx prisma migrate dev --name add_visitor_flow_models
   ```

2. Gerar cliente Prisma:
   ```bash
   npx prisma generate
   ```

### 4. Testar Localmente

1. Iniciar o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Verificar se o fluxo do visitante está funcionando corretamente:
   - Acessar a página inicial
   - Testar o formulário de busca
   - Verificar a página de resultados
   - Verificar a página de detalhes do anúncio

### 5. Commit e Push

1. Adicionar todos os arquivos ao Git:
   ```bash
   git add .
   ```

2. Fazer commit com mensagem descritiva:
   ```bash
   git commit -m "Implementa fluxo do visitante com busca dinâmica e rotação de anúncios premium"
   ```

3. Enviar as alterações para o GitHub:
   ```bash
   git push origin main
   ```

### 6. Verificar Deploy na Vercel

1. Acessar o painel da Vercel para verificar o status do deploy:
   - URL: https://vercel.com/dashboard

2. Após o deploy ser concluído, verificar o site em produção:
   - URL: https://gfauto.vercel.app/

3. Testar o fluxo completo em produção:
   - Formulário de busca
   - Página de resultados
   - Página de detalhes do anúncio

## Observações Importantes

- Certifique-se de que o banco de dados em produção está configurado corretamente
- Verifique se as variáveis de ambiente estão configuradas na Vercel
- Teste o fluxo completo em diferentes dispositivos para garantir responsividade
- Se encontrar problemas, verifique os logs da Vercel para identificar a causa
