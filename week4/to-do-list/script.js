const taskInput = document.getElementById("task-input")
const taskList = document.getElementById("task-list")

function addTask() {
   const li = document.createElement("li");

   if (taskInput.value === '') { alert("Write things to do !") }
   else {
      li.innerHTML = `
         <input type="checkbox" class="checkbox">
         <span class="task-text">${taskInput.value}</span>
         <button class="deleteBtn">&#x2715;</button>
      `;
      taskList.appendChild(li);
   }

   const checkbox = li.querySelector('.checkbox');
   const taskText = li.querySelector('.task-text');
   const deleteBtn = li.querySelector('.deleteBtn');

   // 체크 버튼 이벤트
   checkbox.addEventListener('change', () => {
      taskText.classList.toggle('checked');

      if (checkbox.checked) taskList.appendChild(li);
      else taskList.prepend(li);

   });

   // 삭제 버튼 이벤트
   deleteBtn.addEventListener('click', () => {
      li.remove();
   })

   taskInput.value = '';
}

// 엔터키로 할 일 추가하기
taskInput.addEventListener('keypress', (e) => {
   if (e.key === 'Enter') addTask();
})