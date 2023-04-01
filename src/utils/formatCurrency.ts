export function formatCurrency(currency: number) {
   const formattedValue = currency.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
   return formattedValue;
 }
 
 export function parseCurrency(value: string) {
  const numericValue = value.replace(/[^\d,-]/g, "").replace(",", ".");
  return parseFloat(numericValue);
}
