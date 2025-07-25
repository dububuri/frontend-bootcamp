
export function validPassword(pwValue) {
   const conditions = document.querySelectorAll('.password-conditions li');

   const lengthCheck = pwValue.length >= 8;           // 8자리 이상
   const upperCheck = /[A-Z]/.test(pwValue);          // 영어 대문자 포함
   const numberCheck = /[0-9]/.test(pwValue);         // 숫자 포함
   const specialCheck = /[^A-Za-z0-9]/.test(pwValue); // 특수문자 포함

   const results = [lengthCheck, upperCheck, numberCheck, specialCheck];

   results.forEach((isValid, index) => {
      const li = conditions[index];
      if (isValid) {
         li.classList.remove('invalid');
         li.classList.add('valid');
         li.style.color = 'green';
      } else {
         li.classList.remove('valid');
         li.classList.add('invalid');
         li.style.color = '#444';
      }
   });
}