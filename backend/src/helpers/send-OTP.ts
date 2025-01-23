export function sendOTP() {
   const randomNum = Math.random() * 9000;
   return Math.floor(1000 + randomNum);
 }
