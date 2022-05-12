const express = require('express');
const { ConfirmedBookings, findConfirmedBooking, findBookingByTodayDate, findBookingByTomorrowDate } = require('../controllers/confirmedBookingController');

const router = express.Router()

router.route('/confirmedbooking').post(ConfirmedBookings)
router.route('/').get(findConfirmedBooking)
router.route('/bookingToday/:_id').get(findBookingByTodayDate)
router.route('/bookingTomorrow/:_id').get(findBookingByTomorrowDate)

module.exports = router;
