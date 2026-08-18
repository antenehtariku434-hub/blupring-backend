// This is a real backend server. It runs continuously, listens for
// requests, and responds to them. No browser code lives here at all —
// this file never draws anything, it only handles data and logic.

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// This lets browsers on other domains (like your GitHub Pages site)
// actually talk to this server. Without this, browsers block the request.
app.use(cors());

// This lets our server understand JSON data sent in requests
app.use(express.json());

// Our "database" for now — just an array living in memory.
// (Real backends usually use an actual database instead, so data
// survives a restart. We'll get there — this keeps things simple first.)
let checkIns = [];

// ROUTE 1: A simple "is this server alive" check
app.get('/', (req, res) => {
  res.json({ message: 'Blueprint backend is running.' });
});

// ROUTE 2: Submit a new check-in
// Example: POST /checkins with body { "name": "Anteneh", "pillar": "Body" }
app.post('/checkins', (req, res) => {
  const { name, pillar } = req.body;

  if (!name || !pillar) {
    return res.status(400).json({ error: 'name and pillar are required' });
  }

  const entry = {
    id: checkIns.length + 1,
    name,
    pillar,
    timestamp: new Date().toISOString()
  };

  checkIns.push(entry);
  res.status(201).json(entry);
});

// ROUTE 3: Get every check-in that's been submitted so far
app.get('/checkins', (req, res) => {
  res.json(checkIns);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
