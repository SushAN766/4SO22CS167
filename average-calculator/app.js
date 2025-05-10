const express = require('express');
const app = express();
const numbersRoute = require('./routes/numbers');

app.use(express.json());
app.use('/numbers', numbersRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
