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

createBook = async (request, response) => {
    try {
        const { title, author, publishedYear, price, quantity } = request.body;

        if (!title || !author || !publishedYear || !price || !quantity) {
            return response.status(400).json({ message: "Please send the fields properly" });
        }

        const newBook = new Book({
            title,
            author,
            publishedYear,
            price,
            quantity,
            status: "Available"
        });

        await newBook.save(); // important

        response.status(201).json({ 
            message: "Book created successfully", 
            book: newBook 
        });

    } catch (error) {
        console.error("CREATE BOOK ERROR:", error);
        response.status(500).json({ message: "Internal Server Error" });
    }
};

updateBook = async (request, response) => {
    try {
        const { title, author, publishedYear, price, quantity } = request.body;

        if (!title || !author || !publishedYear || !price || !quantity) {
            return response.status(400).json({ message: "Please send the fields properly" });
        }

        const book = await Book.findByIdAndUpdate(
            request.params.id,
            { title, author, publishedYear, price, quantity },
            { new: true }
        );

        if (!book) {
            return response.status(404).json({ message: "Book not found" });
        }

        response.status(200).json({ message: "Book updated successfully", data: book });
    } catch (error) {
        console.error("UPDATE BOOK ERROR:", error);
        response.status(500).json({ message: "Internal Server Error" });
    }
};


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