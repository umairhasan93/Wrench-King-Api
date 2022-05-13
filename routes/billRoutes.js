const express = require('express');
const { GenerateBill } = require('../controllers/billController');

const router = express.Router()

router.route('/generateBill').post(GenerateBill)


module.exports = router;
