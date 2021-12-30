import React, { useState, useEffect, useRef } from "react";
import "./ProcessPayment.css";
import Helmet from "react-helmet";
import CheckoutSteps from "../CheckOutSteps/CheckoutSteps";

//these are like input fields , but first import Elements & LoadStripe in App.js
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

import { LoadingButton } from "@mui/lab";
import { createOrder } from "../../redux/actions/orderActions";
import {updateBadgeCount} from '../../redux/actions/productActions'

const ProcessPayment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const [disable, setDisable] = useState(false);

  const { user } = useSelector((state) => state.user);
  const shippingInfo = JSON.parse(localStorage.getItem("shippingDetails"));

  const cartItems = JSON.parse(localStorage.getItem('cartItems'))

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisable(true);

    try {
      var paymentAmount = {
        amount: Math.round(orderInfo.totalPrice * 100),
      };

      const { data } = await axios.post("/api/payment/process", paymentAmount, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      var result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {

        setDisable(false);
        alert.error(result.error.message);

      } else {

        if (result.paymentIntent.status === "succeeded") {

          //dispatch order action

            const order = {
                shippingInfo,
                orderItems : cartItems,
                paymentInfo : {
                    id : result.paymentIntent.id,
                    status : result.paymentIntent.status
                },
                itemsPrice : orderInfo.subtotal,
                taxPrice : orderInfo.tax,
                shippingPrice : orderInfo.shippingCharges,
                totalPrice : orderInfo.totalPrice
            }

          dispatch(createOrder(order))

          dispatch(updateBadgeCount(0))
          localStorage.removeItem("cartItems");

          alert.success('Order Confirmed!')

          navigate("/payment_success")

        } else {            
          alert.error("An Issue Occured , Please Try Again");
        }
      }

    } catch (error) {

      setDisable(false);
      alert.error(error.message)
    }
  };

  return (
    <>
      <Helmet>
        <title>Pay For Your Order</title>
      </Helmet>

      <div
        className="switch"
        style={{ marginTop: "30px", backgroundColor: "yellowgreen" }}
      >
        <h4 style={{ color: "white" }}>Card Details</h4>
      </div>

      <CheckoutSteps currentStep={2} />

      <div className="loginregister_box" style={{ marginTop: "30px" }}>
        <div className="mx-auto"></div>
        <form className="loginForm" onSubmit={handleSubmit}>
        <p style={{color:'white',fontWeight:'600'}}>Default Card Number : 4000 0027 6000 3184</p>

          <div className="paymentField">
            <CreditCardIcon style={{ color: "white", paddingRight: "1%" }} />
            <CardNumberElement className="paymentInput" value="1111 1111 1111 1111"/>
          </div>

          <div className="paymentField">
            <EventIcon style={{ color: "white", paddingRight: "1%" }} />
            <CardExpiryElement className="paymentInput" />
          </div>

          <div className="paymentField">
            <VpnKeyIcon style={{ color: "white", paddingRight: "1%" }} />
            <CardCvcElement className="paymentInput" />
          </div>

          {disable ? (
            <LoadingButton
              loading
              loadingPosition="start"
              startIcon={<RefreshIcon />}
              variant="outlined"
              className="processingBtn"
            >
              Processing
            </LoadingButton>
          ) : (
            <input
              type="submit"
              className="paymentBtn"
              value={`Pay  ₹${orderInfo && orderInfo.totalPrice}`}
              disabled={disable ? true : false}
            />
          )}
        </form>
      </div>
    </>
  );
};

export default ProcessPayment;
