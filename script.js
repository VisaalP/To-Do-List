document.addEventListener("DOMContentLoaded", loadTasks);

const addTaskBtn = document.getElementById("addTask");
const taskInput = document.getElementById("task");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);
taskList.addEventListener("click", handleTaskClick);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const task = createTaskElement(taskText);
    taskList.appendChild(task);
    saveTask(taskText);
    taskInput.value = "";
}

function handleTaskClick(e) {
    if (e.target.classList.contains("delete")) {
        const task = e.target.parentElement;
        removeTask(task.textContent.trim());
        task.remove();
    } else {
        const task = e.target;
        task.classList.toggle("completed");
        toggleTaskCompletion(task.textContent.trim());
    }
}

function createTaskElement(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete");
    li.appendChild(deleteBtn);

    return li;
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: task, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(({ text, completed }) => {
        const task = createTaskElement(text);
        if (completed) task.classList.add("completed");
        taskList.appendChild(task);
    });
}

function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleTaskCompletion(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(task => task.text === taskText);
    if (task) task.completed = !task.completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
}