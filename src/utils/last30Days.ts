const getLast30Days = (): string[] => {
   const today = new Date();
   const last30Days = [];
   
   for (let i = 0; i < 30; i++) {
     const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
     last30Days.push(day.toLocaleDateString('en-US').replace(/\//g, '-'));
   }
   
   return last30Days;
 }
 
 export default getLast30Days(); 