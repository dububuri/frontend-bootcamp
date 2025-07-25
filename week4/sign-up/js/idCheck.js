// 초기 기존 아이디 목록 임시 저장
export function loadIds() {
   return JSON.parse(localStorage.getItem('ids')) || ['comento25', 'yuri1234'];
}

export function checkId(idValue) {
   const idMsg = document.getElementById('id-msg');
   const existingIds = loadIds();

   // Case1: 입력하지 않았을 때 -> alert창 뜨기
   if (idValue === '') {
      alert('Please insert Id!');
      idMsg.textContent = '';
      return;
   }

   // Case2: 아이디가 6자리 미만
   if (idValue.length < 6) {
      idMsg.style.color = 'red';
      idMsg.textContent = 'Id must be over 6 characters.';
   }

   // Case2: 이미 존재하는 아이디
   else if (existingIds.includes(idValue)) {
      idMsg.style.color = 'red';
      idMsg.textContent = 'Id already taken.';
   }

   // Case3: 사용 가능한 아이디
   else {
      idMsg.style.color = 'green';
      idMsg.textContent = 'Available Id.';
   }
}

// 가입한 아이디 추가
export function saveId(newId) {
   const existingIds = loadIds();
   existingIds.push(newId);
   localStorage.setItem('ids', JSON.stringify(existingIds));
}

// 중복 체크용 아이디 목록 출력
export function showAllIds() {
   const ids = JSON.parse(localStorage.getItem('ids')) || [];
   console.log('현재 가입된 아이디 목록:', ids);
}