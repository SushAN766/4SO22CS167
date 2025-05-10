const axios = require('axios');
const { THIRD_PARTY_BASE, WINDOW_SIZE } = require('../utils/constants');

let window = [];

exports.fetchNumbers = async (type) => {
  const url = `${THIRD_PARTY_BASE}/${type}`;
  try {
    const response = await axios.get(url, { timeout: 500 });
    return response.data.numbers || [];
  } catch {
    return [];
  }
};

exports.updateWindow = (newNumbers) => {
  const unique = newNumbers.filter((n) => !window.includes(n));
  unique.forEach((num) => {
    if (window.length >= WINDOW_SIZE) window.shift();
    window.push(num);
  });
};

exports.getWindow = () => [...window];

exports.getAvg = () =>
  window.length ? parseFloat((window.reduce((a, b) => a + b, 0) / window.length).toFixed(2)) : 0;
