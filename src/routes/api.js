const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/book-covers/:olid', async (req, res) => {
  try {
    const { olid } = req.params;
    const apiUrl = `https://openlibrary.org/api/v1/works/${olid}/editions.json`;

    const response = await axios.get(apiUrl);
    const coverUrl = response.data?.entries?.[0]?.covers?.[0];

    if (coverUrl) {
      return res.redirect(`https://covers.openlibrary.org/b/id/${coverUrl}-L.jpg`);
    } else {
      return res.status(404).send('Cover not found');
    }
  } catch (error) {
    console.error('Error fetching book cover:', error);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
