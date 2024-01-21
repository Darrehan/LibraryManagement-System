const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Fetch authors from the database
    const result = await db.query('SELECT * FROM authors');
    const authors = result.rows;

    res.render('authors', { pageTitle: 'Library - Authors', authors });
  } catch (error) {
    console.error('Error fetching authors:', error);
    res.status(500).render('error', { pageTitle: 'Error', message: 'Internal Server Error' });
  }
});

module.exports = router;
