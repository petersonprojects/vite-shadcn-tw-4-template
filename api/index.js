const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Irregular verbs database
const irregularVerbs = [
  { base: 'be', pastSimple: 'was/were', pastParticiple: 'been' },
  { base: 'begin', pastSimple: 'began', pastParticiple: 'begun' },
  { base: 'break', pastSimple: 'broke', pastParticiple: 'broken' },
  { base: 'bring', pastSimple: 'brought', pastParticiple: 'brought' },
  { base: 'build', pastSimple: 'built', pastParticiple: 'built' },
  { base: 'buy', pastSimple: 'bought', pastParticiple: 'bought' },
  { base: 'catch', pastSimple: 'caught', pastParticiple: 'caught' },
  { base: 'choose', pastSimple: 'chose', pastParticiple: 'chosen' },
  { base: 'come', pastSimple: 'came', pastParticiple: 'come' },
  { base: 'do', pastSimple: 'did', pastParticiple: 'done' },
  { base: 'drink', pastSimple: 'drank', pastParticiple: 'drunk' },
  { base: 'drive', pastSimple: 'drove', pastParticiple: 'driven' },
  { base: 'eat', pastSimple: 'ate', pastParticiple: 'eaten' },
  { base: 'fall', pastSimple: 'fell', pastParticiple: 'fallen' },
  { base: 'feel', pastSimple: 'felt', pastParticiple: 'felt' },
];

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Irregular Verbs API' });
});

// Get all irregular verbs
app.get('/api/verbs', (req, res) => {
  res.json(irregularVerbs);
});

// Get a random verb
app.get('/api/verbs/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * irregularVerbs.length);
  res.json(irregularVerbs[randomIndex]);
});

// Get a specific verb by base form
app.get('/api/verbs/:base', (req, res) => {
  const verb = irregularVerbs.find(v => v.base === req.params.base.toLowerCase());
  
  if (!verb) {
    return res.status(404).json({ message: 'Verb not found' });
  }
  
  res.json(verb);
});

// User scores API (mock implementation)
let userScores = [];

// Save a user score
app.post('/api/scores', (req, res) => {
  const { username, score, timeTaken } = req.body;
  
  if (!username || score === undefined || !timeTaken) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  const newScore = {
    id: Date.now().toString(),
    username,
    score,
    timeTaken,
    date: new Date().toISOString()
  };
  
  userScores.push(newScore);
  res.status(201).json(newScore);
});

// Get all scores
app.get('/api/scores', (req, res) => {
  res.json(userScores);
});

// Get scores for a specific user
app.get('/api/scores/:username', (req, res) => {
  const userResults = userScores.filter(
    score => score.username.toLowerCase() === req.params.username.toLowerCase()
  );
  
  res.json(userResults);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the Express API for Vercel
module.exports = app; 