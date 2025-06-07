#!/bin/bash

# Script para copiar os arquivos para a estrutura principal
# Autor: Manus
# Data: 04/06/2025

# Definir cores para melhor visualização
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Copiando arquivos para a estrutura principal ===\033[0m"

# Copiar BuscaForm.tsx para a estrutura principal
echo -e "${YELLOW}Copiando BuscaForm.tsx...\033[0m"
cp "/w/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto/fluxo_visitante/components/visitante/BuscaForm.tsx" "/w/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto/components/visitante/BuscaForm.tsx" || {
  echo "ERRO: Não foi possível copiar BuscaForm.tsx."
  echo "Verifique as permissões e tente novamente."
  exit 1
}

# Verificar se os outros componentes existem e copiá-los se necessário
if [ -f "/w/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto/fluxo_visitante/components/visitante/ResultadosList.tsx" ]; then
  echo -e "${YELLOW}Copiando ResultadosList.tsx...\033[0m"
  cp "/w/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto/fluxo_visitante/components/visitante/ResultadosList.tsx" "/w/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto/components/visitante/ResultadosList.tsx"
fi

if [ -f "/w/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto/fluxo_visitante/components/visitante/AnuncioCard.tsx" ]; then
  echo -e "${YELLOW}Copiando AnuncioCard.tsx...\033[0m"
  cp "/w/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto/fluxo_visitante/components/visitante/AnuncioCard.tsx" "/w/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto/components/visitante/AnuncioCard.tsx"
fi

if [ -f "/w/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto/fluxo_visitante/components/visitante/Pagination.tsx" ]; then
  echo -e "${YELLOW}Copiando Pagination.tsx...\033[0m"
  cp "/w/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto/fluxo_visitante/components/visitante/Pagination.tsx" "/w/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto/components/visitante/Pagination.tsx"
fi

if [ -f "/w/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto/fluxo_visitante/components/visitante/LoadingResults.tsx" ]; then
  echo -e "${YELLOW}Copiando LoadingResults.tsx...\033[0m"
  cp "/w/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto/fluxo_visitante/components/visitante/LoadingResults.tsx" "/w/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto/components/visitante/LoadingResults.tsx"
fi

if [ -f "/w/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto/fluxo_visitante/components/visitante/HeroSection.tsx" ]; then
  echo -e "${YELLOW}Copiando HeroSection.tsx...\033[0m"
  cp "/w/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto/fluxo_visitante/components/visitante/HeroSection.tsx" "/w/A_Weber/Pai/Hostmachine/gfauto/githubVercel/GFauto/components/visitante/HeroSection.tsx"
fi

echo -e "${GREEN}=== Cópia concluída com sucesso! ===\033[0m"
echo ""
echo "Os seguintes arquivos foram copiados para a estrutura principal:"
echo "1. BuscaForm.tsx"
echo "2. ResultadosList.tsx (se existir)"
echo "3. AnuncioCard.tsx (se existir)"
echo "4. Pagination.tsx (se existir)"
echo "5. LoadingResults.tsx (se existir)"
echo "6. HeroSection.tsx (se existir)"
