const {people} = require('../data.js');

const getPeople = (req, res) => {
    res.status(200).json({sucess: true, data: people});
};

const createPerson = (req, res) => {
    const {name} = req.body;
    if (!name) {
        return res.status(400).json({sucess: false, msg: 'please provide a name value'});
    }
    res.status(200).json({sucess: true, person: name});
};

const updatePerson = (req, res) => {
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
};

const deletePerson = (req, res) => {
    const person = people.find((person) => person.id === Number(req.params.id));

    if (!person) {
        return res.status(404).json({sucess: false, msg: "provide a new value"});
    }
    const newPeople = people.filter((person) => person.id !== Number(req.params.id));
    return res.status(200).json({sucess: true, data: newPeople});
};

module.exports = {
    getPeople,
    createPerson,
    updatePerson,
    deletePerson,
};