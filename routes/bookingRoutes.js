const express = require('express');
const { Bookings, findBooking, DeleteBooking } = require('../controllers/bookingController');

const router = express.Router()

router.route('/booking').post(Bookings)
router.route('/:_id').get(findBooking)
router.route('/:_id').delete(DeleteBooking)

module.exports = router;