const mongoose = require('mongoose')


const BillSchema = mongoose.Schema(
    {
        User_Name: {
            type: String,
            required: true

        },

        User_Number: {
            type: String,
            required: true

        },

        Mechanic_Name: {
            type: String,
            required: true,

        },

        Mechanic_Number: {
            type: String,
            required: true,

        },

        Service: {
            type: String,
            required: true,
        },

        Total_Amount: {
            type: String,
            required: true,
        }


    },

    {
        timestamps: true
    }
)



const Bill = mongoose.model('Bill', BillSchema)

module.exports = Bill