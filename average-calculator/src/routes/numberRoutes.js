const express = require('express');
const router = express.Router();

const { handleNumberRequest } = require('../controllers/numberController');

router.get('/:numberid', handleNumberRequest);
module.exports = router;




