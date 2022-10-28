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

// app.get('/api/products/1', (req, res) => {
//     const singleProduct = products.find( (product) => product.id === 1)
//     res.json(singleProduct);
// });
// The above method is fine if we have a 2 to 3 products
// But if we have more than 100 products then setting up apis is not effective
// So we use route parameters to solve this problem like below:
// Route parameters are basically placeholders where user provides a 
// data, and using req and params we can access the data
app.get('/api/products/:productID', (req, res) => {
    console.log( req.params );
    const {productID} = req.params;
    const singleProduct = products.find( (product) => product.id === Number(productID));
    if(!singleProduct) {
        return res.status(404).send("Product does not exist");
    }
    res.json(singleProduct);
});

app.all('*', (req, res) => {
    res.status(404).send("<h1> Resource not found</h1>");
});

app.listen(5000, ()=> {
    console.log("server listening on port 5000....");
});
