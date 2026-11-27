
const express = require('express');
const path = require('path');

const app = express();

// GET route to serve the HTML file
app.get('/api/products', (req, res) => {

    res.sendFile(
        path.join(__dirname, 'VIEW', 'products.html')
    );

});

// Start the server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
