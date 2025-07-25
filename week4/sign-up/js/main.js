import { checkId } from './idCheck.js';
import { validPassword } from './passwordCheck.js';
import { signUp } from './signUp.js';
import { resetForm } from './resetForm.js';

document.addEventListener('DOMContentLoaded', () => {
   const idInput = document.getElementById('id-input');
   const pwInput = document.getElementById('password-input');
   const checkBtn = document.getElementById('idBtn');
   const signUpBtn = document.getElementById('signBtn');
   const resetIcon = document.getElementById('resetIcon');

   checkBtn.addEventListener('click', () => checkId(idInput.value));
   pwInput.addEventListener('input', () => validPassword(pwInput.value));
   signUpBtn.addEventListener('click', () => signUp(idInput.value, pwInput.value));
   resetIcon.addEventListener('click', resetForm);

   idInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') checkId(idInput.value);
   });
});