const { fetchNumbers, updateWindow, getWindow, getAvg } = require('../services/numberService');
const { VALID_IDS } = require('../utils/constants');
exports.handleNumberRequest = async (req, res) => {
    const id = req.params.numberid;
    const { VALID_IDS } = require('../utils/constants');
    if (!VALID_IDS[id]) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    const prevWindow = [...window];
    const numbers = await fetchNumbers(VALID_IDS[id]);
    updateWindow(numbers);
    const currWindow = [...window];
    const avg = window.length ? parseFloat((window.reduce((a, b) => a + b, 0) / window.length).toFixed(2)) : 0;
    res.json({
      windowPrevState: prevWindow,
      windowCurrState: currWindow,
      numbers,
      avg
    });
  };
  
