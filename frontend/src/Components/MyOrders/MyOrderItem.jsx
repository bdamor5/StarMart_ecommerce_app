import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'

const MyOrderItem = ({ order }) => {
    const navigate = useNavigate()

  return (
    <>
    <div className="orderItem_container">
      <div className="order_heading">
        <div className="order_placed">
          ORDER PLACED <br /> {order.paidAt.substring(0,10)}
        </div>
        <div className="order_price">
           TOTAL PRICE <br/> ₹{order.totalPrice}
        </div>
        <div className="order_ship">
            SHIPPING ADDRESS <br/> {`${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
        </div>
      </div>
      <div className="order_status">
          ORDER STATUS &nbsp;-  
          <span style={order.orderStatus === 'Delivered' ? {color:'#9ACD32'} : {color:'red'}}> {order.orderStatus}</span>
      </div>
        <div className="order_items">
          {
              order
              &&
              order.orderItems.map((curr)=>(
                    <div className="orderItem" onClick={() => navigate(`/productdetails/${curr.productId}`)}>
                        <img src={curr.image} alt="orderitem_image" />
                        <div className="orderItem_name">{curr.name.substr(0,15)}...</div>
                        <div className="orderItem_price">₹{curr.price}</div>
                    </div>
              ))
          }
        </div> 
      </div>
    </>
  );
};

export default MyOrderItem;
