const asyncHandler = require('express-async-handler')
const Mechanic = require('../models/mechanicModel')
const generateToken = require('../utils/generateToken')

const registerMechanic = asyncHandler(async (req, res) => {

    const { name, cnicNo, contactNo, shopNo, username, email, password } = req.body

    const mechanicExists = await Mechanic.findOne({ cnicNo })

    if (mechanicExists) {
        res.status(400)
        throw new Error('Mechanic Already Exists')
    }

    const mechanic = await Mechanic.create({
        name,
        cnicNo,
        contactNo,
        shopNo,
        username,
        email,
        password,

    })

    if (mechanic) {
        res.status(201).json({
            _id: mechanic._id,
            name: mechanic.name,
            cnicNo: mechanic.cnicNo,
            contactNo: mechanic.contactNo,
            shopNo: mechanic.shopNo,
            username: mechanic.username,
            email: mechanic.email,
            token: generateToken(mechanic._id)
        })
    } else {
        res.status(400)
        throw new Error('Error Occured!')
    }
})

const authMechanic = asyncHandler(async (req, res) => {

    const { username, password } = req.body

    const mechanic = await Mechanic.findOne({ username })

    if (mechanic && (await mechanic.matchPassword(password))) {
        res.json({
            name: mechanic.name,
            email: mechanic.email,
            contactNo: mechanic.contactNo,
            shopNo: mechanic.shopNo,
            token: generateToken(mechanic._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Email or Password')
    }
})

const getMechanic = asyncHandler(async (req, res) => {
    Mechanic.find({}, function (err, mechanics) {
        if (err) return res.status(500).send("There was a problem finding the Mechanic.");
        res.status(200).send(mechanics);
    })
})

module.exports = { registerMechanic, authMechanic, getMechanic }