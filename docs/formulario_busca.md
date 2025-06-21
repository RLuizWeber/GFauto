# Documentação do Formulário de Busca

## Visão Geral

O formulário de busca é um componente central do GFauto, permitindo que os usuários encontrem serviços automotivos com base em sua localização e necessidades específicas. O formulário consiste em três campos principais:

1. **Estado**: Para selecionar o estado brasileiro (base de dados: com os estados brasileiros)
2. **Cidade**: Para selecionar a cidade dentro do estado escolhido (base de dados: com as cidades de cada estado.
3. **Especialidade**: Para especificar o tipo de serviço automotivo desejado. (base de dados: 

## verificar detalhamento completo no documento GFauto/Projeto_GFauto.docx no título: Fluxo_app (antigo do Visitante)

## Funcionalidades

### Digitação Livre
- Todos os campos permitem digitação livre, sem restrições e com sugestão de autocompletar conforme base de dados
- Os usuários podem digitar qualquer texto nos campos, mesmo sem selecionar opções anteriores. Mas retornarão erro caso a opção desejada não seja encontrada na base de dados.

### Sugestões Inteligentes
- As sugestões aparecem automaticamente ao clicar ou focar em qualquer campo
- Para estados: sugere tanto siglas quanto nomes completos
- Para cidades: sugere cidades do estado selecionado (ou todas as cidades)
- Para especialidades: sugere da lista padrão de especialidades automotivas (conforme BD)

### Validação do Formulário
- O botão "Buscar Serviços" só fica ativo quando todos os campos estão preenchidos
- Feedback visual claro (botão cinza quando inativo, azul quando ativo)
- Mensagens de erro específicas para cada campo não preenchido

### Lista de Especialidades
O formulário inclui inicialmente uma lista padrão de 57 especialidades automotivas comuns, incluindo:
- Auto Elétricas
- Mecânica Geral
- Chapeação e Pintura
- Injeção Eletrônica
- E muitas outras...

## Implementação Técnica

### Componentes React
- O formulário é implementado como um componente React funcional
- Utiliza hooks como useState, useEffect e useRef para gerenciar o estado e interações

### Estado do Formulário
- Mantém estado para valores digitados, IDs selecionados e sugestões
- Controla a exibição de sugestões e validação do formulário

### Integração com API
- Busca dados de estados, cidades e especialidades da API do GFauto
- Combina dados da API com a lista padrão de especialidades para sugestões completas

### Navegação
- Após submissão, redireciona para a página de resultados com os parâmetros apropriados
- Utiliza IDs quando disponíveis ou texto digitado como fallback

## Manutenção e Atualizações

Para atualizar a lista de especialidades ou modificar o comportamento do formulário, edite os arquivos:
- `/components/visitante/BuscaForm.tsx` (principal)
- `/fluxo_visitante/components/visitante/BuscaForm.tsx` (fluxo visitante)

A constante `ESPECIALIDADES_PADRAO` contém a lista completa de especialidades e pode ser atualizada conforme necessário.
