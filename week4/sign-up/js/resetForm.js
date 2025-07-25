export function resetForm() {
   console.log('🚀 resetForm 실행됨!');
   document.getElementById('id-input').value = '';
   document.getElementById('password-input').value = '';

   const idMsg = document.getElementById('id-msg');
   idMsg.textContent = '';

   const conditions = document.querySelectorAll('.password-conditions li');
   conditions.forEach(li => {
      li.classList.remove('valid');
      li.classList.add('invalid');
      li.style.color = '#444';
   });
}