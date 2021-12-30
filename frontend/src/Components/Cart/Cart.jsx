import React, { useState, useEffect } from "react";
import "./Cart.css";
import Helmet from "react-helmet";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

const Cart = () => {
  const [cartItems, setCart] = useState();

  //getting cart items from local storage
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cartItems")));
  }, [cartItems]);

  const cartPrice = () => {
    return (
      cartItems &&
      cartItems.reduce((sum, curr) => sum + curr.price * curr.quantity, 0)
    );
  };

  const discountPrice = () => {
    return (
      cartItems &&
      cartItems.reduce(
        (sum, curr) => (sum + curr.price * curr.quantity) * 0.15,
        0
      )
    );
  };

  const totalPrice = () => {
    return cartItems && cartPrice() - discountPrice();
  };

  //place order
  const navigate = useNavigate();
  const alert = useAlert();

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      navigate("/products");
      alert.info("Please Add Some Items TO Your Cart");
    } else if(totalPrice() > 999999.99){
      alert.info('Cart Price Cant Exceed ₹10,00,000')
  }else{
      navigate("/login_register?redirect=shipping");
    }
  };

  return (
    <>
      <Helmet>
        <title>Cart Items</title>
      </Helmet>
      <div className="cart_container">
        <div className="cart_items_container">
          <h3>My Cart ({`${cartItems ? cartItems.length : "0"}`})</h3>
          <div className="c_items">
            {cartItems && cartItems[0] ? (
              cartItems.map((curr) => (
                <CartItem product={curr} key={curr.productId} />
              ))
            ) : (
              <h4
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "700",
                  margin: "20px 0",
                }}
              >
                Cart Is Empty
              </h4>
            )}
          </div>
        </div>
        <div className="price_details">
          <h3>PRICE DETAILS</h3>
          <div className="pd_1">
            <h2>
              Price
              {cartItems
                ? cartItems.length === 1
                  ? " (1 item)"
                  : ` (${cartItems.length} items)`
                : " (0)"}
            </h2> 
            <h2>{cartItems ? cartPrice() : "---"}</h2>
          </div>
          <div className="pd_2">
            <h2>Discount</h2>
            <h2>{cartItems ? Math.round(discountPrice()) : "---"}</h2>
          </div>
          <div className="pd_3">
            <h2>Delivery Charges</h2>
            <h2>{cartItems ? "FREE" : "---"}</h2>
          </div>
          <div className="pd_4">
            <h2>Total Amount</h2>
            <h2>{cartItems ? Math.round(totalPrice()) : "---"}</h2>
          </div>
          <div>
            <button className="orderbtn" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
