import React,{useState,useEffect} from "react";
import "./CartItem.css";
import {useNavigate} from 'react-router-dom'
import { updateBadgeCount } from "../../redux/actions/productActions";
import {useDispatch} from 'react-redux'
import { useAlert } from "react-alert";


const CartItem = ({ product }) => {

  //qty
  const [qty,setQty] = useState(product.quantity)

  const handleQty = (num) => {

    let newQty = qty;

      if(num === 1){
          newQty++;

          if(newQty >= product.stock){ 
            setQty(product.stock)
            alert.info('Out Of Stock')
    
          }else setQty(newQty);

      }else {
        newQty--;
        if(newQty < 1) setQty(1)
        else setQty(newQty)
      }     
  }

  const dispatch = useDispatch()
  const alert = useAlert()

//delete item from cart
  const deleteFromCart = () =>{
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));

    dispatch(updateBadgeCount(cartItems.length - 1));

    alert.success('Item Removed From Cart')

    cartItems = cartItems.filter((curr) => curr.productId !== product.productId)

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

 }

 //save the change in qty in LS
 useEffect(()=>{

  setQtyLS();

},[qty])

const setQtyLS = () => {

  var cartItems = JSON.parse(localStorage.getItem("cartItems"));

    cartItems.forEach((curr) => {
      if(curr.productId === product.productId)
            return curr.quantity = qty
        })

    localStorage.setItem("cartItems" , JSON.stringify(cartItems));
}

const navigate = useNavigate()

  return (
    <div className="cartItem_container">
      <div className="cc_1">
        <div className="cc_image">
          <img src={product.image} alt="product image" onClick={() => navigate(`/productdetails/${product.productId}`)}/>
        </div>
        <div>
        <h3 onClick={() => navigate(`/productdetails/${product.productId}`)}>{product.name}</h3>
        <h3>{`${product.quantity} X ₹${product.price} = ₹${product.quantity*product.price}` }</h3>
        </div>
      </div>
      <div className="cc_2">
          <div className="cc_qty">
          <div>
                  <button className={product.stock > 0 ? "qtybtn" : "qtybtnofs"} disabled={product.stock === 0 && 'true'} onClick={() => handleQty(2)}>
                    {" "}
                    <span>-</span>
                  </button>
                  <input type="number" value={product.stock === 0 ? '0' : qty} className="qtyinput" readOnly/>
                  <button className={product.stock > 0 ? "qtybtn" : "qtybtnofs"} disabled={product.stock === 0 && 'true'} onClick={() => handleQty(1)}>
                    <span>+</span>
                  </button>
                </div>
          </div>
          <button className="removebtn" onClick={deleteFromCart}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
