# Estrutura Organizacional Explícita de Imagens - Projeto GFauto

## Filosofia da Organização
**Princípio**: Cada pasta indica claramente ONDE a imagem é usada no sistema.
**Benefício**: Localização rápida e manutenção facilitada.

## Estrutura Explícita Definida

```
public/images/
├── pag_principal/      # Imagens da página principal (HeroSection)
│   ├── mc4.png         # "Busca rápida e fácil"
│   ├── logo_gf.png     # "Serviços confiáveis" 
│   └── image001.jpg    # "Contato direto"
├── pag_resultados/     # Imagens da página de resultados
├── pag_anuncio/        # Imagens das páginas de anúncios
├── ui_elementos/       # Ícones, botões, elementos de interface
├── logos_marcas/       # Logos de empresas e marcas
├── backgrounds/        # Imagens de fundo e texturas
└── anuncios/          # LEGADO - manter por compatibilidade
```

## Convenções Obrigatórias

### 1. Nomenclatura de Pastas
- **Formato**: `pag_[nome_da_pagina]` ou `[categoria]_[tipo]`
- **Exemplos**: `pag_principal`, `ui_elementos`, `logos_marcas`
- **Proibido**: espaços, caracteres especiais, CamelCase

### 2. Nomenclatura de Arquivos
- **Manter nomes originais** quando possível (mc4.png, logo_gf.png)
- **Formato alternativo**: `[descricao]_[versao].[ext]`
- **Proibido**: espaços, acentos, caracteres especiais

### 3. Tamanhos Padrão por Categoria
- **pag_principal**: 180px largura, altura proporcional
- **ui_elementos**: 24px, 48px, 96px (múltiplos de 24)
- **logos_marcas**: 200px largura máxima
- **backgrounds**: 1920px largura máxima

### 4. Formatos por Categoria
- **pag_principal**: .jpg, .png (conforme original)
- **ui_elementos**: .png (com transparência)
- **logos_marcas**: .png (com transparência)
- **backgrounds**: .jpg, .webp

## Mapeamento Atual - Página Principal

| Arquivo Original | Novo Local | Uso no HeroSection |
|------------------|------------|-------------------|
| autoeletrica1.jpg | pag_principal/mc4.png | "Busca rápida e fácil" |
| mecanica1.jpg | pag_principal/logo_gf.png | "Serviços confiáveis" |
| autopecas1.jpg | pag_principal/image001.jpg | "Contato direto" |

## Processo para Novas Imagens

1. **Identificar uso**: Qual página/componente usará a imagem?
2. **Escolher pasta**: Baseado no uso identificado
3. **Verificar existência**: Evitar duplicatas
4. **Otimizar**: Tamanho e formato adequados
5. **Nomear corretamente**: Seguir convenções
6. **Documentar**: Atualizar este README se necessário

## Regras de Preservação

### ⚠️ CRÍTICO - NÃO ALTERAR SEM APROVAÇÃO
- **pag_principal/mc4.png**: Imagem principal do HeroSection
- **pag_principal/logo_gf.png**: Logo oficial GF Auto
- **pag_principal/image001.jpg**: Imagem de contato

### 🔄 Processo para Alterações
1. Fazer backup da imagem atual
2. Testar nova imagem em ambiente local
3. Verificar todos os componentes que usam a imagem
4. Aplicar alteração com commit descritivo
5. Verificar resultado no deploy

## Migração de Imagens Legadas

A pasta `anuncios/` será mantida temporariamente para compatibilidade.
Novas implementações devem usar a estrutura explícita.

**Data da implementação**: $(date)
**Responsável**: Sistema de organização automática
