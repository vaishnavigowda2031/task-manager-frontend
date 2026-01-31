const API_URL = "https://task-manager-backend-8nch.onrender.com/api/tasks";

const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const statusInput = document.getElementById("status");
const addBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("task-list");

// ADD TASK
addBtn.addEventListener("click", async () => {
  const title = titleInput.value.trim();
  const description = descInput.value.trim();
  const status = statusInput.value;

  if (!title) {
    alert("Title is required");
    return;
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, status }),
  });

  const data = await res.json();
  renderTask(data);

  titleInput.value = "";
  descInput.value = "";
});

// LOAD TASKS
async function loadTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  taskList.innerHTML = "";
  tasks.forEach(renderTask);
}

function renderTask(task) {
  const div = document.createElement("div");
  div.innerHTML = `
    <strong>${task.title}</strong>
    <p>${task.description || ""}</p>
    <small>${task.status}</small>
    <hr/>
  `;
  taskList.appendChild(div);
}

loadTasks();
