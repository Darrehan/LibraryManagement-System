const { Pool } = require('pg');

const connectionString = 'postgresql://username:password@localhost:5432/your_database';

const pool = new Pool({
  connectionString,
});

pool.query(`
  CREATE TABLE IF NOT EXISTS authors (
    author_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  );
`).catch(err => console.error('Error creating authors table:', err));

pool.query(`
  CREATE TABLE IF NOT EXISTS books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    cover_url VARCHAR(255),
    rating INTEGER,
    review TEXT,
    read_date DATE
  );
`).catch(err => console.error('Error creating books table:', err));

module.exports = {
  query: (text, params) => pool.query(text, params),
};
