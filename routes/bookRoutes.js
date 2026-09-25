import express from "express";
import Book from "../models/Book.js";

// Calling the express router method
const router = express.Router();

// Defining the routes for the book resource

// Getting all books
router.get("/", async (req, res) => {
    try {
        // Calling the find method from the Book model
        // The empty object is a filter, which means we want to find all books
        const books = await Book.find({});
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting a book by id
router.get("/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        // Checking if the book was found
        if (!book) return res.status(404).json({ message: "Cannot find book" });
        res.json(book);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Invalid id" });
    }
});

// Creating a new book
router.post("/", async (req, res) => {
    try {
        const newBook = await Book.create(req.body);
        // Status 201 is for created resources
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating a book by id
router.put("/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!book) return res.status(404).json({ message: "Cannot find book" });
    
        res.json(book);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) return res.status(404).json({ message: "Cannot find book" });

        res.json({ message: "Book deleted successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;