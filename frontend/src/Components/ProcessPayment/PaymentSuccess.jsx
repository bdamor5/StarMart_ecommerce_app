import React from "react";
import { useNavigate } from "react-router-dom";
import Helmet from "react-helmet";
import starmartlogo from "./starmart.png";
import HomeIcon from "@mui/icons-material/Home";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Order Confiremd!</title>
      </Helmet>
      <div className="notfound-container">
        <img
          src={starmartlogo}
          alt="logo"
          className="notfound-image"
          onClick={() => navigate("/")}
        />
        <div className="notfound-body">
          <h3>Order Was Placed! Thank You For Choosing Our Service</h3>
          <div
            className="orderconfirmed_link"
            style={{
              display: "flex",
              width: "50%",
              justifyContent: "space-around",
              margin: "20px auto",
            }}
          >
            <h5 onClick={() => navigate("/")}>
              <HomeIcon /> <span>Go To Home</span>
            </h5>
            <h5 onClick={() => navigate("/me/orders")}>
              <CreditScoreIcon /> <span>Go To Your Orders</span>
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
