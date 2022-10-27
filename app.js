const express = require('express');
const app = express();
const port = 3000;
const {people} = require('./data.js');

// GET Method
app.get('/api/data', (req, res) => {
    res.status(200).json({sucess: true, data: people});
});

// Using static assests
app.use(express.static('./methods-public'));
// parse form data
app.use(express.urlencoded({extended: false}));

// POST Method
app.post('/login', (req, res) => {
    const {name} = req.body;
    if (name) {
        return res.status(200).send(`Welcome ${name}`);
    }
    res.status(401).send("Please enter credentials");
});

// PUT Method
app.put('/api/people/:id', (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const person = people.find((person) => person.id === Number(id));

    if (!person) {
        return res.status(404).json({sucess: false, msg: "provide a new value"});
    }
    const newPeople = people.map((person) => {
        if(person.id === Number(id)) {
            person.name = name;
        }
        return person;
    });
    return res.status(200).json({sucess: true, data: newPeople});
});

// Delete Method
app.delete('/api/people/:id', (req, res) => {
    const person = people.find((person) => person.id === Number(req.params.id));

    if (!person) {
        return res.status(404).json({sucess: false, msg: "provide a new value"});
    }
    const newPeople = people.filter((person) => person.id !== Number(req.params.id));
    return res.status(200).json({sucess: true, data: newPeople});
});

app.get('*', (req, res) => {
    res.status(404).json("404 Not Found.");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
