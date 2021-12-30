import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateBadgeCount } from "../../redux/actions/productActions";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";

const ConfirmOrderItem = ({ product }) => {
  //qty
  const [qty, setQty] = useState(product.quantity);

  const handleQty = (num) => {
    let newQty = qty;

    if (num === 1) {
      newQty++;

      if (newQty >= product.stock) {
        setQty(product.stock);
        alert.info("Out Of Stock");
      } else setQty(newQty);
    } else {
      newQty--;
      if (newQty < 1) setQty(1);
      else setQty(newQty);
    }
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  //delete item from cart
  const deleteFromCart = () => {
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));

    dispatch(updateBadgeCount(cartItems.length - 1));

    alert.success("Item Removed From Cart");

    cartItems = cartItems.filter(
      (curr) => curr.productId !== product.productId
    );

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  //save the change in qty in LS
  useEffect(() => {
    setQtyLS();
  }, [qty]);

  const setQtyLS = () => {
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));

    cartItems.forEach((curr) => {
      if (curr.productId === product.productId) return (curr.quantity = qty);
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const navigate = useNavigate();

  const Delivery = () => {
    var date = new Date();

    var weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
    var months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    var currMonth = months[date.getMonth()]

    var dayOfMonth = date.getDate()

    var dayOfWeek = weekday[(date.getDay() + 3) % 7];
    dayOfMonth += 3;
    
    if(dayOfMonth >= 26 && currMonth === 'Feb'){
      dayOfMonth = (dayOfMonth + 3) % 28
      currMonth = 'March'

    }else if(dayOfMonth >= 29 && (currMonth == 'Jan' ||currMonth == 'Mar' ||currMonth == 'May' ||currMonth == 'July' ||currMonth == 'Aug' ||currMonth == 'Oct' ||currMonth == 'Dec')){
      
      dayOfMonth = ((dayOfMonth + 3) % 31) ? (dayOfMonth + 3) % 31 : 1 
      currMonth = months[(date.getMonth() + 1) % 12]

    }else if(dayOfMonth >= 28){
      dayOfMonth = ((dayOfMonth + 3) % 30) ? (dayOfMonth + 3) % 30 : 1 
      currMonth = months[(date.getMonth() + 1) % 12]
  }

  return dayOfWeek + " " + currMonth + " " + dayOfMonth; 
  
  };

  return (
    <div className="cartItem_container">
      <div className="cc_1">
        <div className="cc_image_order">
          <img
            src={product.image}
            alt="product image"
            onClick={() => navigate(`/productdetails/${product.productId}`)}
          />
        </div>
        <div className="cc_delivery_details">
          <h3 onClick={() => navigate(`/productdetails/${product.productId}`)}>
            {product.name}
          </h3>
          <h3>{`${product.quantity} X ₹${product.price} = ₹${
            product.quantity * product.price
          }`}</h3>
        </div>
        <div className="delivery_date">
          <h3>{`Delivery By : ${Delivery()}`}</h3>
        </div>
      </div>
      <div className="cc_2">
        <div className="cc_qty">
          <div>
            <button
              className={product.stock > 0 ? "qtybtn" : "qtybtnofs"}
              disabled={product.stock === 0 && "true"}
              onClick={() => handleQty(2)}
            >
              {" "}
              <span>-</span>
            </button>
            <input
              type="number"
              value={product.stock === 0 ? "0" : qty}
              className="qtyinput"
              readOnly
            />
            <button
              className={product.stock > 0 ? "qtybtn" : "qtybtnofs"}
              disabled={product.stock === 0 && "true"}
              onClick={() => handleQty(1)}
            >
              <span>+</span>
            </button>
          </div>
        </div>
        <button className="removebtn" onClick={deleteFromCart}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrderItem;
