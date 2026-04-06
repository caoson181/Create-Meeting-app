let tasks = [];
let currentTaskIndex = null;

function addTask() {
  const title = document.getElementById("taskTitle").value;
  const date = document.getElementById("taskDate").value;

  if (!title || !date) return;

  tasks.push({
    title,
    date,
    done: false,
  });

  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "task" + (task.done ? " done" : "");

    div.innerHTML = `
      <span>${task.title} — ${formatDate(task.date)}</span>
      <div class="actions">
        ${!task.done ? `<button class="done-btn" onclick="markDone(${index})">Done</button>` : ""}
        <button class="meeting-btn" onclick="openModal(${index})">Create Meeting</button>
      </div>
    `;

    list.appendChild(div);
  });
}

function markDone(index) {
  tasks[index].done = true;
  renderTasks();
  renderCalendar();
}

function openModal(index) {
  currentTaskIndex = index;
  document.getElementById("modal").classList.remove("hidden");

  document.getElementById("meetingTitle").value = tasks[index].title;
  document.getElementById("meetingDate").value = tasks[index].date;
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

function saveMeeting() {
  const title = document.getElementById("meetingTitle").value;
  const date = document.getElementById("meetingDate").value;

  const hour = document.getElementById("hour").value;
  const minute = document.getElementById("minute").value;
  const ampm = document.getElementById("ampm").value;

  const time = `${hour}:${minute} ${ampm}`;

  const attendees = document.getElementById("meetingAttendees").value;

  const calendar = document.getElementById("calendar");

  const div = document.createElement("div");
  div.className = "meeting";

  div.innerHTML = `📌 Meeting: ${title} on ${formatDate(date)} at ${time} with ${attendees}`;

  calendar.appendChild(div);

  closeModal();
}

function renderCalendar() {
  const calendar = document.getElementById("calendar");

  calendar.innerHTML = "";

  tasks.forEach((task) => {
    if (task.done) {
      const div = document.createElement("div");
      div.className = "completed";
      div.innerHTML = `✔ Completed Task: ${task.title} (Due: ${formatDate(task.date)})`;
      calendar.appendChild(div);
    }
  });
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

function formatTime(timeStr) {
  let [hour, minute] = timeStr.split(":");
  hour = parseInt(hour);

  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;

  return `${String(hour).padStart(2, "0")}:${minute} ${ampm}`;
}

function initTimePicker() {
  const hour = document.getElementById("hour");
  const minute = document.getElementById("minute");

  hour.innerHTML = "";
  minute.innerHTML = "";

  for (let i = 1; i <= 12; i++) {
    let val = String(i).padStart(2, "0");
    hour.innerHTML += `<option value="${val}">${val}</option>`;
  }

  for (let i = 0; i < 60; i++) {
    let val = String(i).padStart(2, "0");
    minute.innerHTML += `<option value="${val}">${val}</option>`;
  }
}

window.onload = initTimePicker;
