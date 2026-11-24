
const express = require('express');
const router = express.Router();

// Default student data
const students = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];

// GET all students
router.get('/', (req, res) => {
    res.send(`Students: ${students.map(student => student.name).join(', ')}`);
});

// GET student by ID
router.get('/:id', (req, res) => {

    const studentId = parseInt(req.params.id);

    // Validate ID
    if (isNaN(studentId)) {
        return res.status(400).send("Invalid student ID");
    }

    const student = students.find(s => s.id === studentId);

    if (!student) {
        return res.status(404).send("Student not found");
    }

    res.send(`Student: ${student.name}`);
});

module.exports = router;
