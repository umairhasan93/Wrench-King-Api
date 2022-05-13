const asyncHandler = require('express-async-handler')
const Rating = require('../models/ratingModel')
// const generateToken = require('../utils/generateToken')

const Ratings = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { User_Name, User_Number, Mechanic_Name, Mechanic_Number, Rating } = req.body

    const rating = await Rating.create({
        User_Name,
        User_Number,
        Mechanic_Name,
        Mechanic_Number,
        Rating

    }, function (err, rating) {
        if (err) return res.status(500).send("There was a problem in Rating.");
        res.status(200).send(rating);
    })
})


module.exports = { Ratings }
