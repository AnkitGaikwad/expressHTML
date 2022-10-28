const express = require('express');
const app = express();

const {products} = require('./data');

app.get('/', (req, res) => {
    res.send("<h1> Home Page </h1> <a href='/api/products'> Products </a>");

});
app.get('/api/products', (req, res) => {
    const newProduct = products.map( (product) => {
        const {id, name, image} = product;
        return {id, name, image};
    });
    res.json(newProduct);
});

app.get('/api/products/:productID', (req, res) => {
    console.log( req.params );
    const {productID} = req.params;
    const singleProduct = products.find( (product) => product.id === Number(productID));
    if(!singleProduct) {
        return res.status(404).send("Product does not exist");
    }
    res.json(singleProduct);
});

// Query String parameters
// also called URL parameters, a way for us to send small
// amounts of information to the server using the url
// as follows,
// http://localhost:5000/api/v1/query?search=a&limit=2
app.get('/api/v1/query', (req, res) => {
    console.log(req.query);
    const {search, limit} = req.query;
    let sortedProducts = [...products];
    if(search) {
        sortedProducts = sortedProducts.filter( (product) => {
            return product.name.startsWith(search);
        });
    }
    if(limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }
    if(sortedProducts.length < 1) {
        // gives error as we can send only one response to client
        //res.status(200).send("NO product matched the search");
        return res.status(404).json([{success: true}, {data:[]}]);
    }
    res.status(200).send(sortedProducts);
    
});


app.all('*', (req, res) => {
    res.status(404).send("<h1> Resource not found</h1>");
});

app.listen(5000, ()=> {
    console.log("server listening on port 5000....");
});

