const express = require('express');
const router = express.Router();

const wordRoutes = require('./api/router');

router.use(wordRoutes);

module.exports = router;
