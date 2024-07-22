document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const clearAllBtn = document.getElementById('clear-all-btn'); // New button
    const taskList = document.getElementById('task-list');

    // Initialize the todos array from local storage
    let todos = JSON.parse(localStorage.getItem('tasks')) || [];

    // Populate UI with existing tasks
    todos.forEach(todo => {
        createTaskElement(todo);
    });

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    clearAllBtn.addEventListener('click', clearAllTasks); // New event listener

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            createTaskElement(taskText);

            // Add to the todos array
            todos.push(taskText);

            // Update local storage
            localStorage.setItem('tasks', JSON.stringify(todos));

            taskInput.value = '';
        }
    }

    function createTaskElement(taskText) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task');

        const taskContent = document.createElement('span');
        taskContent.textContent = taskText;

        const completeBtn = document.createElement('button');
        completeBtn.innerHTML = '✓';
        completeBtn.classList.add('complete-btn');
        completeBtn.addEventListener('click', () => {
            taskContent.style.textDecoration = 'line-through';
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '✗';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            taskItem.remove();
            // Remove from the todos array
            todos = todos.filter(todo => todo !== taskText);
            // Update local storage
            localStorage.setItem('tasks', JSON.stringify(todos));
        });

        taskItem.appendChild(taskContent);
        taskItem.appendChild(completeBtn);
        taskItem.appendChild(deleteBtn);

        taskList.appendChild(taskItem);
    }

    function clearAllTasks() {
        const taskItems = document.querySelectorAll('.task');
        taskItems.forEach(taskItem => {
            taskItem.classList.add('fade-out'); // Apply fade-out animation
            setTimeout(() => {
                taskItem.remove(); // Remove the task item after the animation
            }, 300); // Wait for 300 milliseconds (same duration as the CSS transition)
        });
    
        // Clear todos array
        todos = [];
    
        // Update local storage
        localStorage.removeItem('tasks');
    }
    
});
