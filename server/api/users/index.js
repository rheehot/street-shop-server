const express = require('express');
const controller = require('./controllers');

const router = express.Router();


// example
router.post('/my', controller.myInfo);
router.post('/join', controller.join);

module.exports = router;
