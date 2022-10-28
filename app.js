const express = require('express');
const app = express();

let {people} = require('./data');

// GET method
app.get('/api/people', (req, res) => {
    res.status(200).json({success: true, data: people});
});

// POST method


app.all('*', (req, res) => {
    res.status(404).send("<h1> Resource not found</h1>");
});

app.listen(5000, ()=> {
    console.log("server listening on port 5000....");
});

