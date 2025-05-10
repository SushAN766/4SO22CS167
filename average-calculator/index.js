const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const VALID_IDS = {
  p: 'primes',
  f: 'fibo',
  e: 'even',
  r: 'rand'
};
const THIRD_PARTY_BASE = 'http://20.244.56.144/evaluation-service';
let window = [];
const fetchNumbers = async (type) => {
  const url = `${THIRD_PARTY_BASE}/${type}`;
  try {
    const response = await axios.get(url, { timeout: 500 });
    return response.data.numbers || [];
  } catch (err) {
    return [];
  }
};
const updateWindow = (newNumbers) => {
  const uniqueNew = newNumbers.filter((num) => !window.includes(num));
  for (let num of uniqueNew) {
    if (window.length >= WINDOW_SIZE) window.shift();
    window.push(num);
  }
};
app.get('/numbers/:numberid', async (req, res) => {
  const id = req.params.numberid;
  if (!VALID_IDS[id]) {
    return res.status(400).json({ error: 'Invalid number ID' });
  }
  const prevWindow = [...window];
  const numbers = await fetchNumbers(VALID_IDS[id]);
  updateWindow(numbers);
  const avg =
    window.length > 0
      ? parseFloat((window.reduce((a, b) => a + b, 0) / window.length).toFixed(2))
      : 0;
  res.json({
    windowPrevState: prevWindow,
    windowCurrState: [...window],
    numbers,
    avg
  });
});
app.listen(PORT, () => {
  console.log(`Average Calculator running at http://localhost:${PORT}`);
});
