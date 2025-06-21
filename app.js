const express = require("express");
const cors = require("cors");
const notesRoutes = require("./routes/notesRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/notes", notesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const path = require("path");

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));
