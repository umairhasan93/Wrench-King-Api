const asyncHandler = require('express-async-handler')
const Booking = require('../models/bookingModel')
const generateToken = require('../utils/generateToken')

const Bookings = asyncHandler(async (req, res) => {

    const { User_Name, User_Number, User_Email, Car_Company, Model, Model_Year, Mechanic_Name, Mechanic_Number, Mechanic_Address, Mechanic_Speciality, Mechanic_Type, Booking_Date, Requested_Date, Type, Status } = req.body

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
        Requested_Date,
        Type,
        Status

    }, function (err, booking) {
        if (err) return res.status(500).send("There was a problem Booking Mechanic.");
        res.status(200).send(booking);
    })
})

const findPendingBooking = asyncHandler(async (req, res) => {
    console.log(req.params._id);
    Booking.find({ "User_Number": req.params._id, Status: 'Pending' }, function (err, booking) {
        if (err) return res.status(500).send("Failed Fetching Data")
        res.status(200).send(JSON.stringify(booking))

    })
})

const findMechanicPendingBooking = asyncHandler(async (req, res) => {
    console.log(req.params._id);
    const d = new Date()
    const date = d.getDate() + '-' + '0' + (d.getMonth() + 1) + '-' + d.getFullYear()
    Booking.find({ "Mechanic_Number": req.params._id, Status: 'Pending', "Requested_Date": date }, function (err, booking) {
        if (err) return res.status(500).send("Failed Fetching Data")
        res.status(200).send(JSON.stringify(booking))
    })
})

const findConfirmedBooking = asyncHandler(async (req, res) => {
    console.log(req.params._id);
    Booking.find({ "User_Number": req.params._id, Status: 'Confirmed' }, function (err, booking) {
        if (err) return res.status(500).send("Failed Fetching Data")
        res.status(200).send(JSON.stringify(booking))

    })
})


const findMechanicConfirmedBooking = asyncHandler(async (req, res) => {
    console.log(req.params._id);
    Booking.find({ "Mechanic_Number": req.params._id, Status: 'Confirmed' }, function (err, booking) {
        if (err) return res.status(500).send("Failed Fetching Data")
        res.status(200).send(JSON.stringify(booking))

    })
})

const findBooking = asyncHandler(async (req, res) => {
    Booking.find({}, function (err, booking) {
        if (err) return res.status(500).send("Failed Fetching Data")
        res.status(200).send(JSON.stringify(booking))
    })
})

const DeleteBooking = asyncHandler(async (req, res) => {
    console.log(req.params._id);
    Booking.findByIdAndRemove(req.params._id, function (err, booking) {
        if (err) return res.status(500).send("There was a problem Deleteing Booking")
        res.status(200).send(JSON.stringify(booking))
    })
})

const UpdateBooking = asyncHandler(async (req, res) => {
    console.log(req.params._id)
    console.log(req.body)
    const booking = await Booking.findByIdAndUpdate(req.params._id, req.body, { new: true });
    if (!booking) {
        return res.status(500).send("No Booking Found")
    }
    res.status(200).send(JSON.stringify(booking));
})

module.exports = { Bookings, findPendingBooking, findMechanicPendingBooking, findConfirmedBooking, findMechanicConfirmedBooking, findBooking, DeleteBooking, UpdateBooking }