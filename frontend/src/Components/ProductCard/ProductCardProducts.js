import React from "react";
import "./ProductCard.css";
import { Rating } from "@mui/lab";
import {useNavigate} from 'react-router-dom'

const ProductCardProducts = ({ product }) => {

  const navigate = useNavigate()

  const handleClick = () =>{
    navigate(`/productdetails/${product._id}`)
  }

  return (

      <div className={product.Stock > 0 ? "Products_card" : "Products_card_ofs"} onClick={handleClick}>
      {
          product.Stock < 1 && <p>Out Of Stock</p>
        }
      <div className="Products_image">
        <img src={product.images[0].url} alt="productimage" />
      </div>

      <div className="Products_text">
        <h5 className="Products_title">{product.name.substr(0,15)}...</h5>

        <div className="Products_customer">
          <div className="Products_ratings">
            <Rating name="ratings-product-readonly" value={product.ratings} precision={0.5} readOnly />
          </div>
          {`(${product.numOfReviews})`}
        </div>

        <div className="Products_details">
          <div className="Products_category">{product.category}</div>
          <div className="Products_price">{`₹${product.price}`}</div>
        </div>
      </div>

    </div>
  );
};

export default ProductCardProducts;
