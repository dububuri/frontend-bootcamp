// JS 참고 코드
// https://github.com/mj-archive/oz_study/tree/main/JavaScript/calculator
// https://medium.com/@koreanraichu/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-%EA%B3%84%EC%82%B0%EA%B8%B0%EB%A5%BC-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90-2ecddd7140ed

// 모든 요소를 각 변수로 할당
const display = document.querySelector('.display-area p');
const buttons = document.querySelectorAll('button');

// 초기화
let curNum = '0';     // 현재 값
let firstNum = '';    // 계산 할 첫 번째 숫자
let secondNum = '';   // 계산 할 두 번째 숫자
let operator = '';    // 연산자
let expression = '';  // 계산 과정

buttons.forEach((item) => {
   item.addEventListener('click', (e) => { // 모든 button에 click 이벤트 적용
      const clicked = e.target.textContent;
      console.log(`Clicked: ${clicked}`);

      // 숫자 처리
      if (item.classList.contains('number')) { // 버튼 클래스에 num이 있다면
         if (curNum.length >= 11 && clicked !== '.') return; // 11자리 제한
         if (curNum === '0') curNum = clicked; // 0이면 새 숫자로
         else curNum += clicked; // 0이 아니면 뒤에 숫자 누적
         display.textContent = curNum; // 화면에 표시
      }

      // 소수점
      if (clicked === '.') {
         if (!curNum.includes('.')) curNum += '.'; // 소수점이 없을 때만 붙이기
         display.textContent = curNum; // 화면에 표시
      }

      // Clear
      if (clicked === 'C') {
         curNum = '0';
         // 변수 전부 초기화
         firstNum = '';
         secondNum = '';
         operator = '';
         display.textContent = curNum; // 화면에 표시
         return;
      }

      // Delete
      if (clicked === '←') {
         if (curNum.length > 1) { // 두 자리 이상이면 마지막 자리 del
            curNum = curNum.slice(0, -1);
         } else { // 한 자리 수는 0으로
            curNum = '0';
         }
         display.textContent = curNum; // 화면에 표시
         return;
      }

      // Percent
      if (clicked === '%' && curNum !== '0') {
         // 문자 → 숫자로 변환하여 계산
         curNum = limitlength(parseFloat(curNum) / 100);
         display.textContent = curNum; // 화면에 표시
         return;
      }

      // Root
      if (clicked === '√' && curNum !== '0') {
         // 문자 → 숫자로 변환하여 계산 (JS 내장함수인 Math의 루트 사용)
         curNum = limitlength(Math.sqrt(parseFloat(curNum)));
         display.textContent = curNum; // 화면에 표시
         return;
      }

      // Operator
      if (item.classList.contains('operator')) {

         // operator 존재 & 첫 번째 숫자 존재 → 연산 가능
         if (operator && firstNum !== '') {
            secondNum = curNum; // 현재 값을 두번째 수로 저장
            console.log(secondNum);
            const result = calculate(firstNum, operator, secondNum);
            console.log(result);
            display.textContent = result; // 화면에 표시
            firstNum = result; // 첫 번째 수에 결과 저장
            curNum = '0'; // 현재값 초기화
         } else {
            firstNum = curNum;
            curNum = '0'; // 현재값 초기화
         }

         operator = clicked;
         console.log(`First Operand: ${firstNum}, Operator: ${operator}`);
         return;
      }

      // = 결과
      if (clicked === '=') {
         // operator 존재 & 첫 번째 숫자 존재 → 연산 가능
         if (operator && firstNum !== '') {
            secondNum = curNum; // 현재값을 두 번째 수로 저장
            const result = calculate(firstNum, operator, secondNum);

            display.textContent = result; // 화면에 표시
            firstNum = result; // 첫 번째 수에 결과 저장
            secondNum = ''; 
            operator = '';
            curNum = result; // 현재값에 결과 저장 → 연속해서 연산하기 위해
         }
         return;
      }
   })
})

// 11 자리수 여부 check 함수
const limitlength = (result) => {
   // 정수부가 11자리 이상이면 Error
   if (!String(result).includes('.') && String(result).length > 11) {
      return 'Error';
   }

   // 소수점 존재할 때, 정수 + 소수 길이 합이 11을 넘으면 소수점 아래 부분 자르기
   if (String(result).includes('.')) {
      // result를 정수부분과 소수부분으로 나누기
      const [intResult, decResult] = String(result).split('.');

      // 정수부 > 11 이면 Error
      if (intResult.length > 11) return 'Error';

      // 정수 + 소수점 + 소수 > 11 이면
      if (String(result).length > 11) {
         // 소수 부분을 11자리수에 맞춰서 자르기
         return intResult + '.' + decResult.slice(0, 11 - intResult.length - 1)
      }

      return intResult + '.' + decResult;
   }

   // 11자리 이하면 그대로
   return String(result);
}

const calculate = (num1, operator, num2) => {
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