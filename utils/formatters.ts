// Caminho: /utils/formatters.ts

/**
 * Formata um número de telefone para exibição mais legível
 * Exemplos:
 * - "1234567890" -> "(12) 3456-7890"
 * - "12345678901" -> "(12) 34567-8901"
 */
export function formatarTelefone(telefone: string): string {
  // Remove caracteres não numéricos
  const numeros = telefone.replace(/\D/g, '');
  
  // Verifica se é celular (11 dígitos) ou telefone fixo (10 dígitos)
  if (numeros.length === 11) {
    // Formato para celular: (XX) XXXXX-XXXX
    return `(${numeros.substring(0, 2)}) ${numeros.substring(2, 7)}-${numeros.substring(7)}`;
  } else if (numeros.length === 10) {
    // Formato para telefone fixo: (XX) XXXX-XXXX
    return `(${numeros.substring(0, 2)}) ${numeros.substring(2, 6)}-${numeros.substring(6)}`;
  }
  
  // Se não for um formato reconhecido, retorna o número original
  return telefone;
}

/**
 * Formata um valor monetário para exibição em Reais
 */
export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

/**
 * Formata uma data para exibição no formato brasileiro
 */
export function formatarData(data: Date | string): string {
  const dataObj = typeof data === 'string' ? new Date(data) : data;
  return dataObj.toLocaleDateString('pt-BR');
}
