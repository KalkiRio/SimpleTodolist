document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    addTaskBtn.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task');
            
            const taskContent = document.createElement('span');
            taskContent.textContent = taskText;

            const completeBtn = document.createElement('button');
            completeBtn.innerHTML = '&#10003;';
            completeBtn.classList.add('complete-btn');
            completeBtn.addEventListener('click', () => {
                taskContent.style.textDecoration = 'line-through';
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '&#10007;';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => {
                taskItem.remove();
            });

            taskItem.appendChild(taskContent);
            taskItem.appendChild(completeBtn);
            taskItem.appendChild(deleteBtn);

            taskList.appendChild(taskItem);

            taskInput.value = '';
        }
    }
});
