document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    
    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <input type="text" value="${task.text}" style="display: none;">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            `;
            li.querySelector('.edit-btn').addEventListener('click', () => editTask(index));
            li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(index));
            li.addEventListener('dblclick', () => toggleComplete(index));
            taskList.appendChild(li);
        });
    }

    function addTask(text) {
        tasks.push({ text, completed: false });
        saveTasks();
        renderTasks();
    }

    function editTask(index) {
        const li = taskList.children[index];
        const span = li.querySelector('span');
        const input = li.querySelector('input[type="text"]');
        if (input.style.display === 'none') {
            span.style.display = 'none';
            input.style.display = 'inline-block';
            input.value = span.textContent;
            input.focus();
        } else {
            span.textContent = input.value;
            span.style.display = 'inline-block';
            input.style.display = 'none';
            tasks[index].text = input.value;
            saveTasks();
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    taskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && taskInput.value.trim() !== '') {
            addTask(taskInput.value.trim());
            taskInput.value = '';
        }
    });

    renderTasks();
});
