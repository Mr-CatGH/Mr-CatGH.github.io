const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const COUNTER_FILE = path.join(__dirname, 'counter.txt');

// Initialize counter
let counter = 0;
if (fs.existsSync(COUNTER_FILE)) {
    counter = parseInt(fs.readFileSync(COUNTER_FILE, 'utf8')) || 0;
}

// Increment counter on page load
app.get('/', (req, res) => {
    counter++;
    fs.writeFileSync(COUNTER_FILE, counter.toString());
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to get current counter (no increment)
app.get('/get-counter', (req, res) => {
    res.json({ counter });
});

// Endpoint to increment counter (button click)
app.get('/increment', (req, res) => {
    counter++;
    fs.writeFileSync(COUNTER_FILE, counter.toString());
    res.json({ counter });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
