
const express = require('express');
const router = express.Router();

// Default course data
const courses = [
    {
        id: 1,
        name: "Frontend",
        description: "HTML, CSS, JS, React"
    },
    {
        id: 2,
        name: "Backend",
        description: "Node.js, Express, MongoDB"
    }
];

// GET all courses
router.get('/', (req, res) => {
    res.send(`Courses: ${courses.map(course => course.name).join(', ')}`);
});

// GET course by ID
router.get('/:id', (req, res) => {

    const courseId = parseInt(req.params.id);

    // Validate ID
    if (isNaN(courseId)) {
        return res.status(400).send("Invalid course ID");
    }

    const course = courses.find(c => c.id === courseId);

    if (!course) {
        return res.status(404).send("Course not found");
    }

    res.send(`Course: ${course.name}, Description: ${course.description}`);
});

module.exports = router;
