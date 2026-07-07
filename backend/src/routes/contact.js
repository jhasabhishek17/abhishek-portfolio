const express = require('express')
const router = express.Router()
const rateLimit = require('express-rate-limit')
const contactController = require('../controllers/contactController')

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 10,
  message: { error: 'Too many messages sent. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

router.post('/', limiter, contactController.sendMessage)

module.exports = router
