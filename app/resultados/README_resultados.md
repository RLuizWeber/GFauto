
# GFauto/app/resultados/README_resultados.md

## Fluxo de Busca

1. Visitante preenche Estado, Cidade e "O que procura?"
2. Clica em Buscar → redireciona para /resultados/
3. Chama API /api/anuncios (consulta na tabela Anuncios)
4. Exibe resultados:

- Premium: com imagem e destacado
- Cortesia: sem imagem, listado abaixo

## Rotação Premium

A rotação funciona da seguinte forma:

- Para cada especialidade/cidade, os anúncios premium são exibidos em ordem rotativa.
- Exemplo: se há 5 anúncios premium para "Auto Elétrica" em Passo Fundo, cada vez que um visitante buscar, o primeiro da lista muda, seguindo rodízio circular.
- Isso é controlado pela tabela rotacao_premium e garante que todos tenham chance de aparecer no topo.

## Observações Técnicas

- Autocompletar "O que procura?" usa a base de especialidades e palavras-chave.
