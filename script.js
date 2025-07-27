    let currentUser = null;

    function login() {
      const user = document.getElementById('username').value.trim();
      if (!user) return alert("Username required");
      currentUser = user;
      document.getElementById('auth-section').style.display = 'none';
      document.getElementById('todo-section').style.display = 'block';
      document.getElementById('welcomeUser').innerText = `Hi, ${user}`;
      loadTasks();
    }

    function logout() {
      currentUser = null;
      document.getElementById('username').value = '';
      document.getElementById('taskInput').value = '';
      document.getElementById('taskList').innerHTML = '';
      document.getElementById('auth-section').style.display = 'block';
      document.getElementById('todo-section').style.display = 'none';
    }

    function getTasks() {
      const data = localStorage.getItem(currentUser);
      return data ? JSON.parse(data) : [];
    }

    function saveTasks(tasks) {
      localStorage.setItem(currentUser, JSON.stringify(tasks));
    }

    function loadTasks() {
      const tasks = getTasks();
      const list = document.getElementById('taskList');
      list.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${task}</span>
          <div class="actions">
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
          </div>
        `;
        list.appendChild(li);
      });
    }

    function addTask() {
      const taskInput = document.getElementById('taskInput');
      const task = taskInput.value.trim();
      if (!task) return alert("Task cannot be empty");
      const tasks = getTasks();
      tasks.push(task);
      saveTasks(tasks);
      taskInput.value = '';
      loadTasks();
    }

    function deleteTask(index) {
      const tasks = getTasks();
      tasks.splice(index, 1);
      saveTasks(tasks);
      loadTasks();
    }

    function editTask(index) {
      const tasks = getTasks();
      const newTask = prompt("Edit your task:", tasks[index]);
      if (newTask !== null) {
        tasks[index] = newTask.trim();
        saveTasks(tasks);
        loadTasks();
      }
    }
    
    function loadTasks() {
  const tasks = getTasks();
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    li.innerHTML = `
      <span class="task-text">${task}</span>
      <div class="actions">
        <button onclick="startEditTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });
}

function startEditTask(index) {
  const tasks = getTasks();
  const listItems = document.querySelectorAll('#taskList li');
  const li = listItems[index];

  const span = li.querySelector('.task-text');
  const oldTask = tasks[index];

  // Replace span with input
  const input = document.createElement('input');
  input.type = 'text';
  input.value = oldTask;
  input.style.flex = '1';
  input.className = 'edit-input';

  // Replace the span with the input field
  li.replaceChild(input, span);

  // Replace buttons
  const actionsDiv = li.querySelector('.actions');
  actionsDiv.innerHTML = `
    <button onclick="saveTask(${index})">Save</button>
    <button onclick="loadTasks()">Cancel</button>
  `;
}

function saveTask(index) {
  const input = document.querySelectorAll('.edit-input')[0];
  const updatedValue = input.value.trim();

  if (!updatedValue) return alert('Task cannot be empty.');

  const tasks = getTasks();
  tasks[index] = updatedValue;
  saveTasks(tasks);
  loadTasks();
}

