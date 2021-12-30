const Order = require('../database/Models/orderSchema')
const ErrorHandler = require('../utils/ErrorHandler')
const asyncErrorHandler = require('../utils/asyncErrorHandler')
const Product = require('../database/Models/productSchema')


//creating new order 
exports.newOrder = asyncErrorHandler(async (req,res,next)=>{    
        const order = new Order({
          ...req.body,
          paidAt: Date.now(),
          user: req.user._id,
        });

        await order.save()
    
        res.status(201).json({ success: true, order });
})

//all orders by logged in user
exports.myOrders = asyncErrorHandler(async (req,res,next)=>{
    const orders = await Order.find({user : req.user._id});

    res.status(200).json({success:true,orders})
})

//get Single Order
exports.getSingleOrder = asyncErrorHandler(async (req,res,next)=>{
    const order = await Order.findById(req.params.id)
        .populate(
            "user",
            "name email" 
        )

        if(!order) {
            return next(new ErrorHandler("order not found" , 404))
        }

        res.status(200).json({succes:true, order}) 
})

/////////////////admin

//get all orders
exports.getAllOrders = asyncErrorHandler(async (req,res,next)=>{
    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach((curr) => totalAmount += curr.totalPrice)

    res.status(200).json({success:true, orders , totalAmount})
})

//update order status
exports.updateOrder = asyncErrorHandler(async (req,res,next)=>{
    const order = await Order.findById(req.params.id)

    if(!order) {
        return next(new ErrorHandler("order not found" , 404))
    }

    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler("You Have Already Delivered This Order" , 400))
    }

    //shipped
    if(req.body.status === 'Shipped'){
        order.orderItems.forEach(async(curr)=>{
            await updateStock(curr.productId , curr.quantity)
        })
    }

    //delivered
    if(req.body.status === 'Delivered'){
        order.deliveredAt = Date.now()
    }

    //updating order status
    order.orderStatus = req.body.status ;
    
    await order.save()

    res.status(200).json({success:true})

})

//updating stock function
async function updateStock(id , quantity) {
    const product = await Product.findById(id)

    product.Stock -= quantity;

    //if stock gets negative
    if(product.Stock < 0){
        product.Stock = 0
    }

    await product.save()
}

//delete order
exports.deleteOrder = asyncErrorHandler(async (req,res,next)=>{
    const order = await Order.findById(req.params.id)   
    
    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    await order.remove()

    res.status(200).json({ success: true});
})
