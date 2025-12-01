const express = require('express');
const {getAllBooks,getBooksbyID,createBook,updateBook,deleteBook } = require('../controllers/bookController');

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBooksbyID);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;