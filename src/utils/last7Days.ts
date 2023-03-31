const getLastSevenDays = (): string[] => {
   const today = new Date();
   const lastSevenDays = [];
   
   for (let i = 0; i < 7; i++) {
     const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
     lastSevenDays.push(day.toLocaleDateString('en-US').replace(/\//g, '-'));
   }
   
   return lastSevenDays;
 }
 
 export default getLastSevenDays(); 