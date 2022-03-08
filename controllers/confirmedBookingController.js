const asyncHandler = require('express-async-handler')
const ConfirmedBooking = require('../models/confirmedBookingModel')
const generateToken = require('../utils/generateToken')

const d = new Date()
const dateToday = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear()
const dateTomorrow = (d.getDate() + 1) + '-' + (d.getMonth() + 1) + '-' + d.getFullYear()


const ConfirmedBookings = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { User_Name, User_Number, User_Email, Car_Company, Model, Model_Year, Mechanic_Name, Mechanic_Number, Mechanic_Address, Mechanic_Speciality, Mechanic_Type, Booking_Date, Requested_Date, Type, Status, Time_Of_Service } = req.body

    const confirmedbooking = await ConfirmedBooking.create({
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
        Requested_Date,
        Type,
        Status,
        Time_Of_Service

    }, function (err, confirmedbooking) {
        if (err) return res.status(500).send("There was a problem in Confirming Booking.");
        res.status(200).send(confirmedbooking);
    })
})

const findBookingByTodayDate = asyncHandler(async (req, res) => {
    const confirmedbooking = await ConfirmedBooking.find({ "Mechanic_Number": req.params._id, 'Booking_Date': dateToday })
    return res.json(confirmedbooking)
})

const findBookingByTomorrowDate = asyncHandler(async (req, res) => {
    const confirmedbooking = await ConfirmedBooking.find({ "Mechanic_Number": req.params._id, 'Booking_Date': dateTomorrow })
    return res.json(confirmedbooking)
})

module.exports = { ConfirmedBookings, findBookingByTodayDate, findBookingByTomorrowDate }
