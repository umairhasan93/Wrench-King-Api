const express = require('express');
const { AddTowingVan } = require('../controllers/towingVanController')

const router = express.Router()

router.route('/Add').post(AddTowingVan)

module.exports = router;