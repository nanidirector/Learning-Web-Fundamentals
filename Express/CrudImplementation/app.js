
const express = require('express');
const app = express();

const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');

// Middleware
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send("Welcome to the Student & Course Portal API!");
});

// Mount routers
app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);

// Custom 404 handler
app.use((req, res) => {
    res.status(404).send("Page not found");
});

// Start server
const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
