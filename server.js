const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const COUNTER_FILE = path.join(__dirname, 'counter.txt');

// Read the counter from file, or start at 0
let counter = 0;
if (fs.existsSync(COUNTER_FILE)) {
    counter = parseInt(fs.readFileSync(COUNTER_FILE, 'utf8')) || 0;
}

// Middleware to count page requests
app.use((req, res, next) => {
    counter++;
    fs.writeFileSync(COUNTER_FILE, counter.toString());
    next();
});

// Serve static HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to increase counter when button is clicked
app.get('/increment', (req, res) => {
    counter++;
    fs.writeFileSync(COUNTER_FILE, counter.toString());
    res.json({ counter });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
