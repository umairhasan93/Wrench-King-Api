const express = require('express');
const { Bookings } = require('../controllers/bookingController');

const router = express.Router()

router.route('/booking').post(Bookings)

module.exports = router;