const express = require('express');
const { Ratings } = require('../controllers/ratingController');
const router = express.Router()


router.route('/rating').post(Ratings)

module.exports = router;
