const mongoose = require('mongoose');

const BooksSchema = new mongoose.Schema({
    name: String,
    title: String,
    contents: String
});

global.Books = global.Books || mongoose.model('books', BooksSchema);
const Books = mongoose.model('books', BooksSchema);

module.exports = Books;
