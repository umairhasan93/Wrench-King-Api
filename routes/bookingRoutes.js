const express = require('express');
const { Bookings, findPendingBooking, findConfirmedBooking, findBooking, DeleteBooking } = require('../controllers/bookingController');

const router = express.Router()

router.route('/booking').post(Bookings)
router.route('/').get(findBooking)
router.route('/:_id').get(findPendingBooking)
router.route('/confirmed/:_id').get(findConfirmedBooking)
router.route('/:_id').delete(DeleteBooking)

module.exports = router;