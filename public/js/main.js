console.log("main.js loaded");

/* ===== Get username from query string ===== */
const params = new URLSearchParams(window.location.search);
const username = params.get("username");

if (!username) {
  // If no username provided, redirect to login
  window.location.href = "/login.html";
}

// Welcome message for logged-in user
document.getElementById("welcomeMsg").innerText = `Welcome, ${username}!`;

/* ===== Data Cache ===== */
let dataCache = [];
let editingId = null; // track _id of entry being edited

/* ===== Fetch and display existing data ===== */
async function loadTable() {
  const res = await fetch(`/entries/${username}`);
  const data = await res.json();
  dataCache = data; // keep local copy
  console.log("Fetched data:", data);

  const tbody = document.querySelector("#moodTable tbody");
  tbody.innerHTML = ""; // clear old rows

  data.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.date}</td>
      <td>${entry.mood}</td>
      <td>${entry.energy}</td>
      <td>${entry.notes || ""}</td>
      <td>${entry.status || ""}</td>
      <td>
        <button data-id="${entry._id}" class="btn btn-sm btn-warning editBtn">Edit</button>
        <button data-id="${entry._id}" class="btn btn-sm btn-danger deleteBtn">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  setupDeleteButtons();
  setupEditButtons();
}

/* ===== Handle form submission ===== */
document.querySelector("#moodForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const mood = document.querySelector("#mood").value;
  const energy = parseInt(document.querySelector("#energy").value);
  const date = document.querySelector("#date").value;
  const notes = document.querySelector("#notes").value.trim(); // grab notes

  // Recalculate derived fields
  const moodValues = { Happy: 2, Neutral: 1, Sad: 0 };
  const energyValues = {1:0,2:0,3:1,4:2,5:3,6:4,7:5,8:6,9:7,10:8};
  const score = (moodValues[mood] || 0) + (energyValues[energy] || 0);

  let status = "Moderate";
  if (mood === "Happy" && energy >= 7) status = "High Spirits";
  else if (mood === "Sad" && energy <= 3) status = "Low Point";
  else if (energy >= 8) status = "Energized";
  else if (energy <= 3) status = "Tired";

  // Include notes in the entry
  const newEntry = { username, date, mood, energy, notes, score, status };

  if (editingId) {
    // Update existing entry
    await fetch(`/entries/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry),
    });
    editingId = null;
  } else {
    // Add new entry
    await fetch("/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry),
    });
  }

  loadTable(); // reload table
  e.target.reset(); // clear form
});

/* ===== Delete entries ===== */
function setupDeleteButtons() {
  document.querySelectorAll(".deleteBtn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      console.log("Deleting entry with id:", id);

      const res = await fetch(`/entries/${id}`, { method: "DELETE" });
      if (res.ok) {
        loadTable();
      } else {
        console.error("Failed to delete entry");
      }
    });
  });
}

/* ===== Edit entries ===== */
function setupEditButtons() {
  document.querySelectorAll(".editBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const entry = dataCache.find((item) => item._id === id);

      if (entry) {
        document.querySelector("#date").value = entry.date;
        document.querySelector("#mood").value = entry.mood;
        document.querySelector("#energy").value = entry.energy;
        document.querySelector("#notes").value = entry.notes || ""; // restore notes
        editingId = id; // mark which entry is being edited
      }
    });
  });
}

/* ===== Initial load ===== */
loadTable();
