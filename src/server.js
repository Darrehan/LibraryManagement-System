const express = require('express');
const apiRoutes = require('./routes/api');
const booksRoutes = require('./routes/books');
const app = express();
app.use(express.static(__dirname,'public'))
const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve Bootstrap CSS
app.use('/styles', express.static('public/styles'));

// Use the API routes
app.use('/api', apiRoutes);

// Use the books routes
app.use('/books', booksRoutes);

// Example route to render a page displaying book covers
app.get('/', (req, res) => {
  res.render(__dirname,'./index.ejs', { pageTitle: 'Book Covers Page' });
});
  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
