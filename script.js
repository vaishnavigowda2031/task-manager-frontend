// ==============================
// API URL (Render backend)
// ==============================
const API_URL = "https://task-manager-backend-8nch.onrender.com/api/tasks";

// ==============================
// DOM Elements
// ==============================
const taskForm = document.getElementById("task-form");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const statusInput = document.getElementById("status");
const taskList = document.getElementById("task-list");

const totalCount = document.getElementById("total-count");
const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");

const filterSelect = document.getElementById("filter");
const searchInput = document.getElementById("search");

// ==============================
// Load tasks on page load
// ==============================
document.addEventListener("DOMContentLoaded", loadTasks);

// ==============================
// Add Task (FORM SUBMIT)
// ==============================
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // 🔴 VERY IMPORTANT

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const status = statusInput.value;

  if (!title) {
    alert("Title is required");
    return;
  }

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description,
        status
      })
    });

    taskForm.reset();
    loadTasks();

  } catch (error) {
    console.error("Error adding task:", error);
    alert("Failed to add task");
  }
});

// ==============================
// Load Tasks from Backend
// ==============================
async function loadTasks() {
  try {
    const res = await fetch(API_URL);
    let tasks = await res.json();

    // Apply filter
    const filter = filterSelect.value;
    if (filter !== "all") {
      tasks = tasks.filter(task => task.status === filter);
    }

    // Apply search
    const searchText = searchInput.value.toLowerCase();
    if (searchText) {
      tasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchText) ||
        (task.description && task.description.toLowerCase().includes(searchText))
      );
    }

    renderTasks(tasks);
    updateCounts(tasks);

  } catch (error) {
    console.error("Error loading tasks:", error);
  }
}

// ==============================
// Render Tasks
// ==============================
function renderTasks(tasks) {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = `<p>No tasks yet. Add your first task above.</p>`;
    return;
  }

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task-item";

    div.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description || ""}</p>
      <span class="status ${task.status}">
        ${task.status}
      </span>
    `;

    taskList.appendChild(div);
  });
}

// ==============================
// Update Counters
// ==============================
function updateCounts(tasks) {
  totalCount.textContent = tasks.length;
  pendingCount.textContent = tasks.filter(t => t.status === "pending").length;
  completedCount.textContent = tasks.filter(t => t.status === "completed").length;
}

// ==============================
// Filter & Search listeners
// ==============================
filterSelect.addEventListener("change", loadTasks);
searchInput.addEventListener("input", loadTasks);
