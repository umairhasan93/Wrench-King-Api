const asyncHandler = require('express-async-handler')
const Booking = require('../models/bookingModel')
const generateToken = require('../utils/generateToken')


const Bookings = asyncHandler(async (req, res) => {

    const { User_Name, User_Number, User_Email, Car_Company, Model, Model_Year, Mechanic_Name, Mechanic_Number, Mechanic_Address, Mechanic_Speciality, Mechanic_Type, Booking_Date, Requested_Date } = req.body

    const booking = await Booking.create({
        User_Name,
        User_Number,
        User_Email,
        Car_Company,
        Model,
        Model_Year,
        Mechanic_Name,
        Mechanic_Number,
        Mechanic_Address,
        Mechanic_Speciality,
        Mechanic_Type,
        Booking_Date,
        Requested_Date

    }, function (err, booking) {
        if (err) return res.status(500).send("There was a problem Booking Mechanic.");
        res.status(200).send(booking);
    })
})

const findBooking = asyncHandler(async (req, res) => {
    console.log(req.params._id);
    Booking.find({ "User_Number": req.params._id }, function (err, booking) {
        if (err) return res.status(500).send("There was a problem finding the Mechanic.");
        res.status(200).send(booking);
    })
})

const DeleteBooking = asyncHandler(async (req, res) => {
    console.log(req.params._id);
    Booking.findByIdAndRemove(req.params._id, function (err, booking) {
        if (err) return res.status(500).send("There was a problem Deleteing Booking")
        res.status(200).send("Booking Deleted Successfully !")
    })
})








module.exports = { Bookings, findBooking, DeleteBooking }