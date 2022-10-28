const express = require('express');
const app = express();

// req => middleware => res

// Middleware function
const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().getTime();
    console.log(method, url, time);
    // if we are terminating the middleware here we send the response directly
    // res.send("Test");
    // otherwise we call the next middleware by,
    next();
};

// place to add middleware is 
// between the url and the callback function
app.get('/', logger, (req, res) => {
    
    res.send("Home page");
});

app.get('/about', (req, res) => {
    res.send("About page");
});

app.all('*', (req, res) => {
    res.status(404).send("<h1> Resource not found</h1>");
});

app.listen(5000, ()=> {
    console.log("server listening on port 5000....");
});

