const express = require('express');
const app = express();

//when we are not in production env , we will take env vars from our local .env file 
//else if in production mode then all the env vars will be taken from heroku itself
if(process.env.NODE_ENV !== "PRODUCTION"){
    const dotenv = require('dotenv')
    dotenv.config()
}

const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary')
const path = require('path')

//db connection
const conn = require('./database/connection')
conn();

//route require
const user = require('./Routes/userRoutes');
const product = require('./Routes/productRoutes');
const order = require('./Routes/orderRoutes');
const payment = require('./Routes/paymentRoutes')
//controller require

//middleware require
const errorMiddleware = require('./middleware/errorHandler')

//handling uncaught errors
process.on("uncaughtException" , (err) =>{
    console.log(`ERROR : ${err.message}`);
    console.log('Shutting down the server due to uncaught exception')
    process.exit(1);
})

//cloudinary
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(fileUpload())

//routes
app.use('/api/user',user);
app.use('/api/product',product)
app.use('/api/order',order)
app.use('/api/payment',payment)

// app.use(express.static(path.join(__dirname , '../frontend/build')));

// app.get('*' , (req,res) => {
//     res.sendFile(path.resolve(__dirname , '../frontend/build/Index.html'))
// })

//error middleware
app.use(errorMiddleware);

//port
const port = process.env.PORT ;

//server
app.listen(port , ()=>{console.log(`Server running on port : ${port}`)})
