const db = require('../models/user');

exports.getBooks = (req, res) => res.json(db.data.books);

exports.addBook = (req, res) => {
  const { title, author } = req.body;
  const exists = db.data.books.find(b => b.title === title);
  if (exists) return res.status(400).send('Duplicate book');

  db.data.books.push({ id: Date.now(), title, author });
  db.write();
  res.send('Book added');
};

exports.updateBook = (req, res) => {
  const book = db.data.books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).send('Not found');

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  db.write();
  res.send('Book updated');
};

exports.deleteBook = (req, res) => {
  db.data.books = db.data.books.filter(b => b.id != req.params.id);
  db.write();
  res.send('Book deleted');
};
