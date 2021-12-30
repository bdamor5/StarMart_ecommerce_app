import React, { useState, useEffect } from "react";
import "./Home.css";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, ButtonGroup } from "@mui/material";
import clothes from "./images/clothes.webp";
import shoes from "./images/shoes.jpg";
import electronics from "./images/electronics.jpg";
import phones from "./images/phone.webp";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ProductCard from "../ProductCard/ProductCard";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/productActions";
import SkeletonHome from "../SkeletonProducts/SkeletonHome";

const Home = () => {
  const carouselItems = [
    {
      heading: "Stand Out & Shine",
      price: "FROM ₹199",
      text: "Jeans , Shirts & more",
      image: clothes,
      bg: "#E9A2A8",
    },
    {
      heading: "Electronic & Accessories",
      price: "FROM ₹999",
      text: "Extra Offers On Supercoins & more",
      image: electronics,
      bg: "#B1DFFF",
    },
    {
      heading: "Smartphones",
      price: "FROM ₹4999",
      text: "Pre-Booking Available*",
      image: phones,
      bg: "#F5C96B",
    },
    {
      heading: "Footwears Made For You",
      price: "FROM ₹399",
      text: "New Stock Available",
      image: shoes,
      bg: "#FF0016",
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const { loading, products } = useSelector((state) => state.getProducts);

products.reverse()
  return (
    <>
      <Helmet>
        <title>Welcome To StarMart</title>
      </Helmet>
      <div className="home_container">
        <Carousel
          animation="slide"
          NextIcon={<ArrowForwardIosIcon />}
          PrevIcon={<ArrowBackIosNewIcon />}
          navButtonsAlwaysVisible="true"
          swipe="true"
          autoPlay="true"
        >
          {carouselItems.map((curr) => (
            <Paper
              className="carousel_bg"
              style={{ backgroundColor: `${curr.bg}` }}
            >
              <div className="carousel_image">
                <img src={curr.image} alt="image" />
              </div>
              <div className="carousel_text">
                <h2>{curr.heading}</h2>
                <h3>{curr.price}</h3>
                <p>{curr.text}</p>
              </div>
            </Paper>
          ))}
        </Carousel>

        <div className="trending_products">
          <h3>Trending Products</h3>
          <div className="trending_product_lists">
            {loading ? (
              <>
                <SkeletonHome />
                <SkeletonHome />
                <SkeletonHome />
                <SkeletonHome />
                <SkeletonHome />
                <SkeletonHome />
                <SkeletonHome />
                <SkeletonHome />
              </>
            ) : (
              <>
                {products &&
                  products.map((curr, index) => {
                    return <ProductCard product={curr} key={curr._id} />;
                  })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
