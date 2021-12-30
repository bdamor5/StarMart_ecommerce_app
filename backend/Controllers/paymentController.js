const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const ErrorHandler = require('../utils/ErrorHandler')

exports.processPayment = async(req,res,next) =>{
    try {

        const userPayment = await stripe.paymentIntents.create({
            amount : req.body.amount,
            currency : "inr",
            metadata : {
                company : "StarMart"
            }
        })

        res.status(200).json({success : true , client_secret : userPayment.client_secret})
        
    } catch (error) {
        return next(new ErrorHandler(error.message,400))
        
    }
}

//to send stripe publishable API key to frontend
exports.sendStripeAPIKey = async(req,res,next) =>{
    res.status(200).json({stripeAPIKey : process.env.STRIPE_API_KEY})
}