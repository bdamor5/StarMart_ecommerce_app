const express = require('express');
const router = express.Router();

//controllers
const {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getSingleProduct,
    createProductReview,
    getProductReviews,
    deleteProductReview
} = require('../Controllers/productControllers')

//middlewares
const {authenticatedUser} = require('../middleware/authenticatedUser')
const {authorizedRole} = require('../middleware/authorizedRole')

/////////////////////admin routes//////////////////////

//create product
router.post('/admin/product/new' , authenticatedUser , authorizedRole("admin") , createProduct)

//get all product
router.get('/admin/products' , authenticatedUser , authorizedRole("admin") , getProducts)

//update a product 
router.put('/admin/product/:id' , authenticatedUser , authorizedRole("admin") , updateProduct)

//delete a product 
router.delete('/admin/product/:id' , authenticatedUser , authorizedRole("admin") , deleteProduct)


//////////////////product routes for frontend/////////////////////

//all products
router.get("/all" , getAllProducts)

//single product
router.get("/:id" , getSingleProduct)


/////////////review routes//////////////////////////

//create or update product review
router.put('/review/new' , authenticatedUser ,createProductReview)

//get all reviews of a product
router.get('/reviews/:id' , getProductReviews)

//delete user's review 
router.delete('/reviews/delete/:reviewId/:productId',authenticatedUser ,deleteProductReview)

module.exports = router