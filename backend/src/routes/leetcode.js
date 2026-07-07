const express = require('express')
const router = express.Router()
const leetcodeController = require('../controllers/leetcodeController')

router.get('/:username', leetcodeController.getStats)

module.exports = router
