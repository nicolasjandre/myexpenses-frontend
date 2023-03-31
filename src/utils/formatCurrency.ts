export function formatCurrency(currency: number) {
   const formattedValue = currency.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
   return formattedValue;
 }
 