const express = require('express');
const numberRoutes = require('./routes/numberRoutes');

const app = express();
app.use(express.json());
app.use('/numbers', numberRoutes);

module.exports = app;
