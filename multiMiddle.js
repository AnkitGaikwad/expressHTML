const express = require('express');
const app = express();
const logger = require('./logger')
const authorize = require('./authorize');
const morgan = require('morgan');

//app.use(logger);
//app.use("/api", logger);

// multiple middlewares
//app.use([authorize, logger]);
// express provided middleware
//app.use(express.static('./public'));
// third party middlewares
app.use(morgan('tiny'));

app.get('/', logger, (req, res) => {
    
    res.send("Home page");
});

app.get('/about', (req, res) => {
    res.send("About page");
});

app.get('/api/products', (req, res) => {
    res.send("Products");
});

app.all('*', (req, res) => {
    res.status(404).send("<h1> Resource not found</h1>");
});

app.listen(5000, ()=> {
    console.log("server listening on port 5000....");
});

