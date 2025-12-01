const express = require('express');
const { getAllBooks, getBooksByID, createBook, updateBook, deleteBook } = require('../controllers/bookController');

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBooksByID);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;