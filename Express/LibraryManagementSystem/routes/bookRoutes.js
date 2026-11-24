const express = require('express');
const router =express.Router();
let books = [];
books.push({id:1,name:"Book 1",author:"Author 1"});

router.get('/',(req,res)=>{
    res.json(books);
});

router.post('/',(req,res)=>{
    console.log(req.body);
    books.push(req.body);
    res.json({
        message: "Book has been added!",
        book: req.body
    });
});
router.get('/:id', (req, res) => {
    console.log(req.params.id);
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.json({
        message: "Book found",
        book: book
    });
});
router.put('/:id', (req, res) => {

    const book = books.find(b => b.id === parseInt(req.params.id));

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    Object.assign(book, req.body);

    res.json({
        message: "Book updated successfully",
        book: book
    });
});


router.delete('/:id', (req, res) => {
    console.log("DELETE ROUTE HIT!");

    const book = books.find(b => b.id === parseInt(req.params.id));

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    books = books.filter(b => b.id !== parseInt(req.params.id));

    res.json({
        message: "Book deleted successfully",
        book: book
    });
});
module.exports = router;
