const express = require('express');
const router = express.Router();
const getTree = require('./get-tree-list');

router.get('/', getTree);
router.get('/:userId', getTree);

module.exports = router;
