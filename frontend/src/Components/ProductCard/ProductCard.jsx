import React from "react";
import "./ProductCardProducts.css";
import { Rating } from "@mui/lab";
import {useNavigate} from 'react-router-dom'

const ProductCard = ({ product }) => {

  const navigate = useNavigate()

  const handleClick = () =>{
    navigate(`/productdetails/${product._id}`)
  }

  return (
    <div className="product_card" onClick={handleClick}>
      <div className="product_image">
        <img src={product.images[0].url} alt="productimage" />
      </div>

      <div className="product_text">
        <h5 className="product_title">{product.name.substr(0,15)}...</h5>

        <div className="product_customer">
          <div className="product_ratings">
            <Rating name="ratings-product-readonly" value={product.ratings} precision={0.5} readOnly />
          </div>
          {`(${product.numOfReviews})`}
        </div>

        <div className="product_details">
          <div className="product_category">{product.category}</div>
          <div className="product_price">{`₹${product.price}`}</div>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
