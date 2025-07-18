import { calculate } from './calculate.js'
import { limitlength } from './limitlength.js'

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
            // 질문이 있습니다! 이렇게 하여도 연속 연산이 되지 않는데, 어떻게 고쳐야할까요?
         }
         return;
      }
   })
})