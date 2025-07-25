import { saveId, showAllIds } from './idCheck.js';

export function signUp() {
   const idInput = document.getElementById('id-input').value;
   const pwInput = document.getElementById('password-input').value;
   const idMsg = document.getElementById('id-msg');
   const conditions = document.querySelectorAll('.password-conditions li');

   // Case1: 입력 안함
   if (idInput === '' || pwInput === '') {
      alert('Please fill in all fields!');
      return;
   }

   // Case2: 아이디 유효하지 않음
   if (idMsg.textContent !== 'Available Id.') {
      alert('Please check your Id.');
      return;
   }

   // Case3: 비밀번호 유효하지 않음
   const allValidPw = [...conditions].every(li => li.classList.contains('valid'));
   if (!allValidPw) {
      alert('Please check your Password.');
      return;
   }

   // 회원가입 완료
   saveId(idInput);
   alert('Welcome!');
   showAllIds();
}