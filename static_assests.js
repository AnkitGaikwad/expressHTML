const express = require('express');
const path = require('path');
const app = express();

//setup static and middleware
app.use(express.static("./public"));

// app.get('/', (req, res) => {
    
//     res.sendFile(path.resolve(__dirname, './nav-bar/index.html'));
// Instead of using this sendFile method we can use the
// express.static function to send the file
// as html pages are static assests
// Another nethod we can use is,
// SSR ie. Server Side Rendering by use of the template engine
// });

app.all('*', (req, res) => {
    res.status(404).send("<h1> Resource not found</h1>");
});



app.listen(5000, ()=> {
    console.log("server listening on port 5000....");
});
