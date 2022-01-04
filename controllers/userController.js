const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')



const registerUser = asyncHandler(async (req, res) => {

    const { firstname, lastname, email, contact, username, password } = req.body

    const user = await User.create({
        firstname,
        lastname,
        email,
        contact,
        username,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Error Occured!')
    }
})

const authUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    console.log(req.body)
    const user = await User.findOne({ username })

    if (user && (await user.matchPassword(password))) {
        res.json({
            id: user._id,
            fname: user.firstname,
            lname: user.lastname,
            name: user.firstname + ' ' + user.lastname,
            contact: user.contact,
            password: user.password,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Username or Password')
    }
})

const findUser = asyncHandler(async (req, res) => {
    User.findOne({ _id: req.params._id }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the Mechanic.");
        res.status(200).send(user);
    })
})

const updateUser = asyncHandler(async (req, res) => {
    console.log(req.params._id);
    console.log(req.body);
    const user = await User.findByIdAndUpdate(req.params._id, req.body, { new: true });
    if (!user) {
        return res.status(500).send("There's a problem Updating User")
    }
    res.status(200).send(user);
})


module.exports = { registerUser, authUser, findUser, updateUser }