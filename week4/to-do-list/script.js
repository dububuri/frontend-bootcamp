const taskInput = document.getElementById("task-input")
const taskList = document.getElementById("task-list")

// 추가 버튼 이벤트
function addTask() {
   const li = document.createElement("li");

   if (taskInput.value === '') { alert("Write things to do !") }
   else {
      li.innerHTML = `
         <input type="checkbox" class="checkbox">
         <span class="task-text">${taskInput.value}</span>
         <button class="deleteBtn">&#x2715;</button>
      `;
      taskList.prepend(li);
   }

   const checkbox = li.querySelector('.checkbox');
   const taskText = li.querySelector('.task-text');
   const deleteBtn = li.querySelector('.deleteBtn');

   checkbox.addEventListener('change', () => handleCheck(checkbox, li, taskText));
   deleteBtn.addEventListener('click', () => handleDelete(li));

   taskInput.value = '';
}

// 체크 버튼 이벤트
function handleCheck(checkbox, li, taskText) {
   taskText.classList.toggle('checked');
   if (checkbox.checked) taskList.appendChild(li);
   else taskList.prepend(li);
}

// 삭제 버튼 이벤트
function handleDelete(li) {
   li.remove();
}

// 엔터키로 할 일 추가하기
taskInput.addEventListener('keypress', (e) => {
   if (e.key === 'Enter') addTask();
})