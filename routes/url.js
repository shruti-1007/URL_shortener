const express = require('express');
const router = express.Router();
const {generate} = require('../controllers/url')
const {getAnalytics} = require('../controllers/url')

router.get('/analytics/:shortId', getAnalytics);
router.post('/url', generate);


module.exports = router;
