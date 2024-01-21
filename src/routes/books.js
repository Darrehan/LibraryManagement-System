const express = require('express');
const db = require('../database');
const router = express.Router();
const app=express();
app.use(express.static(__dirname,"../",'public'))

router.get('/', async (req, res) => {
  try {
    const sortType = req.query.sort || 'rating';

    const result = await db.query(
      'SELECT * FROM books ORDER BY CASE WHEN $1 = \'rating\' THEN rating END DESC, CASE WHEN $1 = \'recency\' THEN read_date END DESC',
      [sortType]
    );

    const books = result.rows;
    res.render(__dirname,'books', { pageTitle: 'Library - Books', books });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).render('error', { pageTitle: 'Error', message: 'Internal Server Error' });
  }
});

router.get('/add', (req, res) => {
  // Render the form to add a new book
  res.render('add-book', { pageTitle: 'Library - Add Book' });
});

router.post('/add', async (req, res) => {
  try {
    // Process the form submission to add a new book to the database
    const { title, author, coverUrl, rating, review, readDate } = req.body;

    const result = await db.query(
      'INSERT INTO books (title, author, cover_url, rating, review, read_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, author, coverUrl, rating, review, readDate]
    );

    const newBook = result.rows[0];
    res.redirect('/books');
  } catch (error) {
    console.error('Error adding a new book:', error);
    res.status(500).render('error', { pageTitle: 'Error', message: 'Internal Server Error' });
  }
});

// Other routes...

module.exports = router;
