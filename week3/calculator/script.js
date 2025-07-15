
// 모든 요소를 각 변수로 할당
const p = document.querySelector('p');
const buttons = document.querySelectorAll('button');
const nums = document.querySelectorAll('.nums');
const etc = document.querySelectorAll('.etc');
const operator = document.querySelectorAll('.operator');

// 초기화
let curNum = 0;         // 현재 값
let firstNum = null;    // 계산 할 첫 번째 숫자
let secondNum = null;   // 계산 할 두 번째 숫자
let operator = null;    // 연산자

let calculate = (n1, operator, n2) => {
   let result = 0;
   switch (operator) {
      case '+':
         result = firstNum + secondNum;
         break;
      case '-':
         result = firstNum - secondNum;
         break;
      case 'x':
         result = firstNum x secondNum;
         break;
      case '/':
         result = firstNum / secondNum;
         break;
      default:
         break;
   }
   return String(result);
}