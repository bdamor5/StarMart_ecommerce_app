const express = require('express')
const { processPayment,sendStripeAPIKey } = require('../Controllers/paymentController')
const router = express.Router()

const {authenticatedUser} = require('../middleware/authenticatedUser')

router.post('/process' , authenticatedUser , processPayment)

router.get('/stripeapikey' , sendStripeAPIKey)

module.exports = router