const asyncHandler = require('express-async-handler')
const ServiceCharges = require('../models/serviceChargesModel')
const generateToken = require('../utils/generateToken')

// Adding Service Charges Function
const AddServiceCharges = asyncHandler(async (req, res) => {

    const { Service, Charges } = req.body

    const serviceCharges = await ServiceCharges.create({
        Service,
        Charges
    })
    console.log(Service + "-" + Charges)

    if (serviceCharges) {
        res.status(201).json({
            _id: serviceCharges._id,
            service: serviceCharges.Service,
            charges: serviceCharges.Charges,
            token: generateToken(serviceCharges._id)
        })
    } else {
        res.status(400)
        throw new Error('Error Occured!')
    }
})


// Getting Price of Selected Services 


const findServiceCharges = asyncHandler(async (req, res) => {
    ServiceCharges.find({}, function (err, serviceCharges) {
        if (err) return res.status(500).send("Failed Fetching Data")
        res.status(200).send(JSON.stringify(serviceCharges))
        // console.log(Charges)
    })
})



module.exports = { AddServiceCharges, findServiceCharges }