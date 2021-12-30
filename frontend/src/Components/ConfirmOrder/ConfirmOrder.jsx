import React, { useState, useEffect } from "react";
import './ConfirmOrder.css'
import Helmet from "react-helmet";
import CheckoutSteps from "../CheckOutSteps/CheckoutSteps";
import ConfirmOrderItem from './ConfirmOrderItem'
import { useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";

const ConfirmOrder = () => {
    const [cartItems,setCart] = useState()
 
     //getting cart items from local storage
     useEffect(()=>{

        setCart(JSON.parse(localStorage.getItem("cartItems")))

     },[cartItems])

     const cartPrice = () =>{
         return cartItems && cartItems.reduce((sum,curr)=>(sum + curr.price*curr.quantity),0)
     }

     const discountPrice = () =>{
         return cartItems && cartItems.reduce((sum,curr)=>((sum + curr.price*curr.quantity)*0.15),0)
     }

     const totalPrice = () =>{
        return cartItems && cartPrice() - discountPrice()
     }

     //place order
     const navigate = useNavigate()
     const alert = useAlert()

     const handlePlaceOrder = () =>{
        if(cartItems.length === 0){
            navigate('/products')
            alert.info('Please Add Some Items TO Your Cart')
        }else{
            const orderInfo = {
                subtotal : cartPrice(),
                shippingCharges : 10,
                tax : 10,
                totalPrice : cartPrice() - discountPrice()
            }

            sessionStorage.setItem("orderInfo" , JSON.stringify(orderInfo))
            
            navigate('/process_payment')
        }
     }
    return (
        <>
          <Helmet>
        <title>Order Summary</title>
      </Helmet>

      <div
        className="switch"
        style={{ marginTop: "30px", backgroundColor: "yellowgreen" }}
      >
        <h4 style={{ color: "white" }}>Order Summary</h4>
      </div>

      <CheckoutSteps currentStep = {1} />

      <div className='order_container'>

        <div className="order_items_container">
            <h3>Order Items ({`${cartItems && cartItems.length}`})</h3>
            <div className="o_items">
            {
                cartItems && cartItems[0] ? cartItems.map((curr)=>(
                    <ConfirmOrderItem product={curr} key={curr.productId}/>
                ))
                : <h4 style={{textAlign:'center',color:'white',fontWeight:'700',margin:'20px 0'}}>No Order Items</h4>
            }
            </div>

        </div>
            <div className="orderprice_details">
                <h3>ORDER PRICE DETAILS</h3>
                <div className="opd_1">
                    <h2>Price ({cartItems && (cartItems.length === 1 ? '1 item' :`${cartItems.length} items`)})</h2>
                    <h2>{
                        cartPrice()
                    }</h2>
                </div>
                <div className="opd_2">
                    <h2>Discount</h2>
                    <h2>{
                        Math.round(discountPrice())
                    }</h2>
                </div>
                <div className="opd_3">
                    <h2>Delivery Charges</h2>
                    <h2>FREE</h2>
                </div>
                <div className="opd_4">
                    <h2>Total Amount</h2>
                    <h2>{
                       Math.round(totalPrice())
                    }</h2>
                </div>
                <div>
                <button className='orderbtn' onClick={handlePlaceOrder}>Pay </button>
                </div>
            </div>
        </div>  
        </>
    )
}

export default ConfirmOrder
