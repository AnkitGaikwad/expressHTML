const express = require('express');
const app = express();

const {products} = require('./data');

app.get('/', (req, res) => {
    // sends back JSON response and sends response 
    // with correct content type and 
    // that is a parameter converted to a string using JSON.stringify
    
    //Static writing from obj
    //res.status(200).json([{Firstname: "Johnathon"},{Lastname: "Wick"}]);
    
    //Fetch data from a JSON file
    res.status(200).json(products);

});


app.all('*', (req, res) => {
    res.status(404).send("<h1> Resource not found</h1>");
});

app.listen(5000, ()=> {
    console.log("server listening on port 5000....");
});
