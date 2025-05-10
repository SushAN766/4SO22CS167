const { fetchNumbers, updateWindow, getWindow, getAvg } = require('../services/numberService');
const { VALID_IDS } = require('../utils/constants');

exports.handleNumberRequest = async (req, res) => {
  const id = req.params.numberid;

  if (!VALID_IDS[id]) {
    return res.status(400).json({ error: 'Invalid number ID' });
  }

  const prevWindow = getWindow();
  const numbers = await fetchNumbers(VALID_IDS[id]);
  updateWindow(numbers);
  const currWindow = getWindow();
  const avg = getAvg();

  res.json({
    windowPrevState: prevWindow,
    windowCurrState: currWindow,
    numbers,
    avg
  });
};

