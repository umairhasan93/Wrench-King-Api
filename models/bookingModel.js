const mongoose = require('mongoose')


const BookingSchema = mongoose.Schema(
    {
        User_Name: {
            type: String,
            required: true

        },

        User_Number: {
            type: String,
            required: true

        },

        User_Email: {
            type: String,
            required: true,

        },

        Car_Company: {
            type: String,
            required: true,


        },

        Model: {
            type: String,
            required: true,

        },

        Model_Year: {
            type: String,
            required: true,

        },

        Mechanic_Name: {
            type: String,
            required: true,

        },

        Mechanic_Number: {
            type: String,
            required: true,

        },

        Mechanic_Address: {
            type: String,

        },

        Mechanic_Speciality: {
            type: String,
        },

        Mechanic_Type: {
            type: String,

        },

        Booking_Date: {
            type: String,
            required: true,
        },



    },

    {
        timestamps: true
    }
)



const Booking = mongoose.model('Booking', BookingSchema)

module.exports = Booking