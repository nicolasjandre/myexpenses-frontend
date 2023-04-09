export function isEmpty(obj: Object | any) {
   if (obj !== null && obj !== undefined) {
      return Object?.keys?.(obj)?.length === 0;
   } else {
      return true;
   }
}