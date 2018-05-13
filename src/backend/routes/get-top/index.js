const express = require('express');
const router = express.Router();
const getTopList = require('./get-top-list');

router.get('/', getTopList);

module.exports = router;
