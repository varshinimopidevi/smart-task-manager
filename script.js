const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

addBtn.addEventListener("click", function () {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Task cannot be empty");
    return;
  }

  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";
  displayTasks();
});

function displayTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task, index) {
    const li = document.createElement("li");
    li.textContent = task;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.onclick = function () {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

searchInput.addEventListener("input", function () {
  const searchValue = searchInput.value.toLowerCase();
  const filteredTasks = tasks.filter(task =>
    task.toLowerCase().includes(searchValue)
  );

  taskList.innerHTML = "";
  filteredTasks.forEach(function (task) {
    const li = document.createElement("li");
    li.textContent = task;
    taskList.appendChild(li);
  });
});
