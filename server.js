const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/style.css');
});
const Hallo =0;
app.get('/app.js', (req, res) => {
    res.sendFile(__dirname + '/app.js');
});

app.listen(port, () => {
    console.log(`Der Server läuft auf http://localhost:${port}`);
});