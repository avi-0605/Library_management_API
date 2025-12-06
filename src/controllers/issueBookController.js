const express = require('express');
const Issuebook = require('../models/Issuebook');
const Book = require('../models/Book');
const User = require('../models/User');

issueBook = async (request, response) => {
    try {
        const { bookId, bookName, studentId, studentName, issueDate, dueDate } = request.body;

        if (!bookId || !bookName || !studentId || !studentName || !issueDate || !dueDate) {
            return response.status(400).json({ message: "Please send all fields properly" });
        }

        const book = await Book.findById(bookId);
        if (!book) return response.status(400).json({ message: "Book not found" });
        if (book.quantity < 1) return response.status(400).json({ message: "Book is not available" });

        const student = await User.findById(studentId);
        if (!student) return response.status(400).json({ message: "Student not found" });

        const newIssueBook = new Issuebook({
            bookId,
            bookName,
            studentId,
            studentName,
            issueDate,
            returnDate: dueDate,
            status: "Issued"
        });

        await newIssueBook.save();

        book.quantity = Math.max(0, book.quantity - 1);
        await book.save();

        response.status(201).json({ message: "Book issued successfully", data: newIssueBook });
    } catch (error) {
        console.error("ISSUE BOOK ERROR:", error);
        response.status(500).json({ message: error.message });
    }
};

returnBook = async (request, response) => {
    try {
        const issuedRecord = await Issuebook.findById(request.params.id);

        if (!issuedRecord) return response.status(404).json({ message: "Issued book not found" });
        if (issuedRecord.status === "Returned") return response.status(400).json({ message: "Book is already returned" });

        issuedRecord.status = "Returned";
        await issuedRecord.save();

        const book = await Book.findById(issuedRecord.bookId);
        if (book) {
            book.quantity = book.quantity + 1;
            await book.save();
        }

        response.status(200).json({ message: "Book returned successfully", data: issuedRecord });
    } catch (error) {
        console.error("RETURN BOOK ERROR:", error);
        response.status(500).json({ message: error.message });
    }
};

module.exports = { issueBook, returnBook };
