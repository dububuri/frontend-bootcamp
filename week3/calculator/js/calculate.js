import { limitlength } from './limitlength.js'

export const calculate = (num1, operator, num2) => {
   num1 = parseFloat(num1);
   num2 = parseFloat(num2);
   let result = 0;
   switch (operator) {
      case '+':
         result = num1 + num2;
         break;
      case '−':
         result = num1 - num2;
         break;
      case '×':
         result = num1 * num2;
         break;
      case '÷':
         result = num1 / num2;
         break;
      default:
         console.log('Error');
         break;
   }

   return limitlength(result);
}