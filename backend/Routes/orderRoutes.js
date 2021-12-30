const express = require('express')
const router = express.Router()

//controllers
const { newOrder, myOrders, getSingleOrder, getAllOrders, updateOrder, deleteOrder } = require('../Controllers/orderControllers')

//middleware
const {authenticatedUser} = require('../middleware/authenticatedUser')
const {authorizedRole} = require('../middleware/authorizedRole')

///////////////user routes

//creating new order
router.post('/new' , authenticatedUser , newOrder)

//logged in user's orders
router.get('/me' , authenticatedUser , myOrders)

//single order
router.get('/:id' , authenticatedUser , getSingleOrder)


///////////////admin routes

//all orders
router.get('/admin/orders' , authenticatedUser , authorizedRole("admin"),getAllOrders)

//update order status
router.put('/admin/order/:id' , authenticatedUser , authorizedRole("admin"),updateOrder)

//delete order
router.delete('/admin/order/:id' , authenticatedUser , authorizedRole("admin"),deleteOrder)

module.exports = router