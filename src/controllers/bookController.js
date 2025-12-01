const Book = require('../models/Book');

getAllBooks = async (request, response) => {
    try {
        const books = await Book.find();
        response.status(200).json({ books });
    } catch (error) {
        response.status(500).json({ message: "Internal Server Error" });
    }
}

getBooksByID = async (request, response) => {
    try {
        const book = await Book.findById(request.params.id);
        if (!book) {
            return response.status(404).json({ message: "Book not found" });
        }
        response.status(200).json({ book })
    } catch (error) {
        response.status(500).json({ message: "Internal Server Error" });
    }
}

createBook = (request, response) => {
    try {
        const { title, author, PublishedYear, price, quantity } = request.body;
        if (!title || !author || !PublishedYear || !price || !quantity) {
            return response.status(400).json({ message: "Please send the fields properly" });
        }
        const newBook = new Book({
            title,
            author,
            PublishedYear,
            price,
            quantity,
            status: "Available"
        });
        newBook.save();
        response.status(201).json({ message: "Book created successfully", book: newBook });
    } catch (error) {
        response.status(500).json({ message: "Internal Server Error" });
    }
}

updateBook = async (request, response) => {
    try {
        const book = await Book.findByIdAndUpdate(request.params.id, request.body, { new: true });

        if (!book) {
            return response.status(404).json({ message: "Book not found" });
        }
        const { title, author, PublishedYear, price, quantity } = request.body;
        if (!title || !author || !PublishedYear || !price || !quantity) {
            return response.status(400).json({ message: "Please send the fields properly" });
        }
        book.title = title;
        book.author = author;
        book.PublishedYear = PublishedYear;
        book.price = price;
        book.quantity = quantity;
        response.status(200).json({ message: "Book updated successfully", data: book });
    } catch (error) {
        response.status(500).json({ message: "Internal Server Error" });
    }
}

deleteBook = async (request, response) => {
    try {
        const book = await Book.findByIdAndDelete(request.params.id);
        if (!book) {
            return response.status(404).json({ message: "Book not found" });
        }
        response.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        response.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    getAllBooks,
    getBooksByID,
    createBook,
    updateBook,
    deleteBook
};