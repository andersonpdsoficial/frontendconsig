/**
 * Formata uma data no formato "ano-mês-dia" para "dia/mês/ano".
 * @param {string} dateString - Data no formato "ano-mês-dia".
 * @returns {string} Data formatada no formato "dia/mês/ano" ou "Data Não Encontrada" se a data não for válida.
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'Data Não Encontrada';
  
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};