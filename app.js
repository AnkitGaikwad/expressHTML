const express = require('express');
const app = express();
const port = 3000;
//importing routes
const people = require('./routes/people');
const login = require('./routes/login');

// Using static assests
app.use(express.static('./methods-public'));
// parse form data
app.use(express.urlencoded({extended: false}));
// parse JSON
app.use(express.json());

// using express.Router
app.use('/api/people', people);
app.use('/login', login);

app.get('*', (req, res) => {
    res.status(404).json("404 Not Found.");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
