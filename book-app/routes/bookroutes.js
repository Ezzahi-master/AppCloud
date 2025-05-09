const express = require('express');
const { getBooks, addBook, updateBook, deleteBook } = require('../controllers/bookController');
const { verifyToken } = require('../utils/tokenUtils');
const router = express.Router();

router.use(verifyToken); // sécurise tout

router.get('/', getBooks);
router.post('/', addBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
