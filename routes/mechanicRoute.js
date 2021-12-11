const express = require('express');
const { registerMechanic, authMechanic, getMechanic } = require('../controllers/mechanicController');

const router = express.Router()

router.route('/register').post(registerMechanic)
router.route('/login').post(authMechanic)
router.route('/').get(getMechanic)

module.exports = router;