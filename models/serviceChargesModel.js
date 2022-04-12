const mongoose = require('mongoose')


const ServiceChargesSchema = mongoose.Schema(
    {
        Service: {
            type: String
        },

        Charges: {
            type: Number
        }

    },


)



const ServiceCharges = mongoose.model('ServiceCharges', ServiceChargesSchema)

module.exports = ServiceCharges