const { db } = require("../config/firebase");

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const noteRef = await db.collection("notes").add({
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({ id: noteRef.id, title, content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNotes = async (req, res) => {
  try {
    const notesRef = db.collection("notes");
    const snapshot = await notesRef.get();

    const notes = [];
    snapshot.forEach((doc) =>
      notes.push({ id: doc.id, ...doc.data() })
    );

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const noteDoc = await db.collection("notes").doc(id).get();

    if (!noteDoc.exists) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json({ id: noteDoc.id, ...noteDoc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const noteRef = db.collection("notes").doc(id);
    const doc = await noteRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Note not found" });
    }

    await noteRef.update({
      title,
      content,
      updatedAt: new Date(),
    });

    res.status(200).json({ message: "Note updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("notes").doc(id).delete();
    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
