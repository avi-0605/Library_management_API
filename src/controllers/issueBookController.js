const express = require('express');
const Issuebook = require('../models/Issuebook');
const Book = require('../models/Book');
const User = require('../models/User');

issueBook = async (request, response) => {
    try {
        const { bookId, bookName, studentId, studentName, issueDate, dueDate } = request.body;

        const book = await Book.findById(bookId);

        if (!book) {
            return response.status(400).json({ message: "Book not found" });
        }

        const student = await User.findById(studentId);

        if (!student) {
            return response.status(400).json({ message: "Student not found" });
        }

        if (book.quantity < 1) {
            return response.status(400).json({ message: "Book is not available" });
        }

        const newIssueBook = {
            bookId,
            bookName,
            studentId,
            studentName,
            issueDate,
            returnDate: dueDate,
            status: "Issued"
        };

        const issue = new Issuebook(newIssueBook);
        await issue.save();

        book.quantity = book.quantity - 1;
        await book.save();

        response.status(201).json({ message: "Book issued successfully", data: issue });
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
};

returnBook = async (request, response) => {
    try {
        const issueBook = await Issuebook.findById(request.params.id);

        if (!issueBook) {
            return response.status(404).json({ message: "Issued book not found" });
        }

        if (issueBook.status === "Returned") {
            return response.status(400).json({ message: "Book is already returned" });
        }

        issueBook.status = "Returned";
        await issueBook.save();
        const book = await Book.findById(issueBook.bookId);
        book.quantity = book.quantity + 1;
        await book.save();

        response.status(200).json({ message: "Book returned successfully", data: issueBook });
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
}
module.exports = { issueBook, returnBook };