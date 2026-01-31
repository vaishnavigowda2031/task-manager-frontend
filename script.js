const API_URL = "https://task-manager-backend-8nch.onrender.com/api/tasks";

console.log("SCRIPT LOADED");

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addTaskBtn");
  const titleInput = document.getElementById("title");
  const descInput = document.getElementById("description");
  const statusSelect = document.getElementById("status");
  const taskList = document.getElementById("task-list");

  if (!addBtn) {
    console.error("Add button not found");
    return;
  }

  addBtn.addEventListener("click", async () => {
    console.log("BUTTON CLICKED");

    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    const status = statusSelect.value;

    if (!title) {
      alert("Title required");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, status }),
      });

      const data = await res.json();
      console.log("TASK CREATED:", data);

      addTaskToUI(data);

      titleInput.value = "";
      descInput.value = "";
      statusSelect.value = "pending";
    } catch (err) {
      console.error("ERROR:", err);
    }
  });

  function addTaskToUI(task) {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${task.title}</strong> - ${task.description} (${task.status})
    `;
    taskList.appendChild(div);
  }
});
