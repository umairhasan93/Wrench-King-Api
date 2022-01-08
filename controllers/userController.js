const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')
const bcrypt = require('bcryptjs')
// const sgMail = require("@sendgrid/mail");

const registerUser = asyncHandler(async (req, res) => {

    const { firstname, lastname, email, contact, username, password } = req.body

    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).send("User Already Exist.")
        }
        let newUser = new User({ firstname, lastname, email, contact, username, password })
        newUser.save((err, success) => {
            if (err) return res.status(500).send("There was a Problem in SigningUp.")
            res.status(200).send(success)
        })
    })

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
    User.findOne({ "_id": req.params._id }, function (err, user) {
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

const changePassword = asyncHandler(async (req, res) => {
    console.log(req.params._id);
    const { currentPassword, password } = req.body;
    // Encrypting Update Password
    req.body.password = await bcrypt.hash(req.body.password, 10)
    console.log(currentPassword, password, req.body.password);

    const user = await User.findOne({ "_id": req.params._id })
    console.log("User Found");
    console.log(user);

    if (user && (await user.matchPassword(currentPassword))) {
        console.log("Password Matched");

        const user = await User.findByIdAndUpdate(req.params._id, { password: req.body.password }, { new: true });
        if (!user) {
            return res.status(500).send("There's a problem Updating User")
        }
        res.status(200).send(user);

    }

})

const forgotPassword = asyncHandler(async (req, res) => {
    console.log(req.params._id);
    const { currentPassword, password } = req.body;
    // Encrypting Update Password
    req.body.password = await bcrypt.hash(req.body.password, 10)
    console.log(req.params._id, password, req.body.password);

    const user = await User.findOne({ "email": req.params._id })


    if (user) {
        console.log(user._id);
        const updateUser = await User.findByIdAndUpdate(user._id, { password: req.body.password }, { new: true });
        if (!user) {
            return res.status(500).send("Not Valid Email")
        }
        res.status(200).send(updateUser);
    }






})


module.exports = { registerUser, authUser, findUser, updateUser, changePassword, forgotPassword }