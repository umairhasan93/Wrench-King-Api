const express = require('express');
const { AddServiceCharges, findServiceCharges } = require('../controllers/serviceChargesController');

const router = express.Router()

router.route('/').get(findServiceCharges)
router.route('/Add').post(AddServiceCharges)

module.exports = router;