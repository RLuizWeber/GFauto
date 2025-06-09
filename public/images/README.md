# Estrutura Organizacional de Imagens - GFauto

## Organização por Funcionalidade

### `/ui/` - Elementos de Interface
- Ícones de funcionalidades (busca, contato, etc.)
- Elementos visuais da interface do usuário
- Símbolos e indicadores
- **Tamanho padrão**: 24x24px para ícones pequenos, 48x48px para ícones médios

### `/hero/` - Imagens Principais de Seções
- Imagens principais das seções hero
- Banners e imagens de destaque
- **Tamanho padrão**: Landscape (16:9 ou similar)

### `/anuncios/` - Imagens de Anúncios
- Fotos de estabelecimentos e serviços
- Imagens ilustrativas de especialidades
- **Tamanho padrão**: 400x300px ou proporção 4:3

### `/logos/` - Logos e Marcas
- Logo do GFauto
- Logos de parceiros
- Marcas e identidades visuais
- **Formato preferido**: PNG com transparência

### `/backgrounds/` - Imagens de Fundo
- Texturas e padrões de fundo
- Imagens para overlays
- **Formato preferido**: JPG otimizado

## Convenções de Nomenclatura

1. **Usar nomes descritivos**: `autoeletrica1.jpg` em vez de `img1.jpg`
2. **Usar lowercase**: `busca-rapida.png` em vez de `BuscaRapida.png`
3. **Usar hífens**: `contato-direto.png` em vez de `contato_direto.png`
4. **Incluir dimensões quando relevante**: `logo-gfauto-180px.png`

## Boas Práticas

1. **Otimização**: Todas as imagens devem ser otimizadas para web
2. **Formatos**:
   - PNG: Para ícones e imagens com transparência
   - JPG: Para fotos e imagens complexas
   - WebP: Quando suportado, para melhor compressão
3. **Responsividade**: Considerar diferentes tamanhos de tela
4. **Acessibilidade**: Sempre incluir alt text descritivo

## Mapeamento Atual

- `autoeletrica1.jpg` → `/anuncios/autoeletrica1.jpg` ✓
- `autopecas1.jpg` → `/anuncios/autopecas1.jpg` ✓  
- `mecanica1.jpg` → `/anuncios/mecanica1.jpg` ✓

## Próximas Imagens

Novas imagens devem seguir esta estrutura organizacional.
