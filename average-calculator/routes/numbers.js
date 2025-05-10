const express = require('express');
const router = express.Router();
const { fetchNumbersFromAPI, updateWindow } = require('../services/numberservice');

router.get('/', async (req, res) => {
  try {
    const numbers = await fetchNumbersFromAPI();
    const updated = updateWindow(numbers);
    res.json({ numbers: updated });
  } catch (err) {
    res.status(408).json({ error: 'API Timeout or Error' });
  }
});

module.exports = router;
