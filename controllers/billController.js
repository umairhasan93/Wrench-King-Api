const asyncHandler = require('express-async-handler')
const Bill = require('../models/billModal')
const generateToken = require('../utils/generateToken')


const GenerateBill = asyncHandler(async (req, res) => {
    console.log(req.body)
    const {
        User_Name,
        User_Number,
        Mechanic_Name,
        Mechanic_Number,
        Service,
        Total_Amount
    } = req.body

    const bill = await Bill.create({
        User_Name,
        User_Number,
        Mechanic_Name,
        Mechanic_Number,
        Service,
        Total_Amount

    }, function (err, bill) {
        if (err) return res.status(500).send("There was a problem in Generating Bill.");
        res.status(200).send(bill);
    })
})


module.exports = { GenerateBill }
