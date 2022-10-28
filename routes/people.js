const express = require('express');
const {people} = require('../data.js');

// in Routes
// Now instead of setting up the app variable
// we go with router and explicitly get router from express
const router = express.Router();

// GET Method
router.get('/', (req, res) => {
    res.status(200).json({sucess: true, data: people});
});

// POST Method
router.post('/', (req, res) => {
    const {name} = req.body;
    if (!name) {
        return res.status(400).json({sucess: false, msg: 'please provide a name value'});
    }
    res.status(200).json({sucess: true, person: name});
});

// PUT Method
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    const person = people.find((person) => person.id === Number(req.params.id));

    if (!person) {
        return res.status(404).json({sucess: false, msg: "provide a new value"});
    }
    const newPeople = people.filter((person) => person.id !== Number(req.params.id));
    return res.status(200).json({sucess: true, data: newPeople});
});

module.exports = router;