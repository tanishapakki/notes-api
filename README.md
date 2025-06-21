# Notes API

## 🛠 Tech Stack
- Node.js
- Express.js
- Firebase Firestore

A basic HTML/CSS/JS frontend is included to test the API.

You can view, add, and delete notes from the browser.

## How to Run

```bash
# Initialize project (if not done already)
npm init -y

# Install dependencies
npm install express firebase-admin cors dotenv


🔑 Setup Firebase
Download your Firebase Admin SDK key.

Rename it to firebase-key.json.

Place it in the root folder of your project.


Start the server

node app.js
The server will run locally (typically on http://localhost:3000).

Features
✅ Create a note 

✅ View all notes

✅ Delete a note

⚠️ Update feature is not yet added to frontend (backend supports it)
