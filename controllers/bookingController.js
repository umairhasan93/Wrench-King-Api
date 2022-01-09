const asyncHandler = require('express-async-handler')
const Booking = require('../models/bookingModel')
const generateToken = require('../utils/generateToken')


const Bookings = asyncHandler(async (req, res) => {

    const { User_Name, User_Number, User_Email, Car_Company, Model, Model_Year, Mechani_Name, Mechanic_Number, Mechanic_Address, Mechani_Speciality, Mechanic_Type, Booking_Date } = req.body
    const booking = await Booking.create({
        User_Name,
        User_Number,
        User_Email,
        Car_Company,
        Model,
        Model_Year,
        Mechani_Name,
        Mechanic_Number,
        Mechanic_Address,
        Mechani_Speciality,
        Mechanic_Type,
        Booking_Date

    }, function (err, order) {
        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        res.status(200).send(order);
    })



})








module.exports = { Bookings }