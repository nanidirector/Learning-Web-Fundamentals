const express = require('express');
const app = express();

app.use(express.json());

app.use('/books', require('./routes/bookRoutes'));

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});