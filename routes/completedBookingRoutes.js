const express = require('express');
const { CompletedBookings, getCompleteBooking } = require('../controllers/completedBookingController');

const router = express.Router()

router.route('/completedbooking').post(CompletedBookings)
// router.route('/').get(findConfirmedBooking)
// router.route('/bookingToday/:_id').get(findBookingByTodayDate)
// router.route('/bookingTomorrow/:_id').get(findBookingByTomorrowDate)
router.route('/:_id').get(getCompleteBooking)

// router.route('/completebooking/:_id').get(findUserCompleteService)


module.exports = router;
