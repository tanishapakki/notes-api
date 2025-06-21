const form = document.getElementById("noteForm");
const notesList = document.getElementById("notesList");

const API_URL = "http://localhost:3000/notes"; // Change if deployed

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  });

  form.reset();
  loadNotes();
});

async function loadNotes() {
  const res = await fetch(API_URL);
  const notes = await res.json();

  notesList.innerHTML = "";
  notes.forEach(note => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${note.title}</strong><br />
        <small>${note.content}</small>
      </div>
      <button onclick="deleteNote('${note.id}')">❌</button>
    `;
    notesList.appendChild(li);
  });
}

async function deleteNote(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
  loadNotes();
}

loadNotes();
