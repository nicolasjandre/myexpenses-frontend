export function extractNumberFromString(str: string) {
   const numericString = str.replace(/[^\d,-]/g, '');
   const numericStringWithDot = numericString.replace(',', '.');
   const numericValue = parseFloat(numericStringWithDot);
   return numericValue;
 }