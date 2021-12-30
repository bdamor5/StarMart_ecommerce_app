const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "Please enter a product name"],
        trim : true
    },
    description : {
        type : String,
        required : [true , "Please enter a product description"]
    },
    price : {
        type : Number,
        required : [true , "Please enter a product price"],
        maxLength : [8 , "Price cannot exceed 8 digits"]
    },
    ratings : {
        type : Number,
        default : 0
    },
    images : [
        {
            public_id : {
                type : String,
                required : true
            },
            url : {
                type : String,
                required : true
            }
        }
    ],
    category : {
        type : String,
        required : [true , "Please enter a product category"]
    },
    Stock : {
        type : Number,
        required : [true , "Please Enter product stock"],
        maxLength : [4 , "Stock cant exceed 4 digits"],
        default : 1
    },
    numOfReviews : {
        type : Number,
        default : 0
    },
    reviews : [
        {
            user : {
                type : mongoose.Schema.ObjectId,
                ref : 'User',
                required : true,
            },
            user_url : {
                type : String,
                required : true
            },
            name : {
                type : String,
                required : true,
            },
            rating : {
                type : Number,
                required : true,
            },
            comment : {
                type : String,
                required : true,
            }
        }
    ],
    createdAt : {
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model("Product" , productSchema)