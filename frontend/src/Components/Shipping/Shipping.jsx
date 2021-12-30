import React, { useState, useEffect } from "react";
import "./Shipping.css";
import Helmet from "react-helmet";
import Button from "@mui/material/Button";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "../CheckOutSteps/CheckoutSteps";
import {useNavigate} from 'react-router-dom'

const Shipping = () => {
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [pinCode, setPinCode] = useState();
  const [phoneNo, setPhoneNo] = useState();

  const alert = useAlert();

  useEffect(() => {
      
      if(localStorage.getItem("shippingDetails")){
        var shippingInfo = JSON.parse(localStorage.getItem("shippingDetails"));

        setAddress(shippingInfo.address)
        setCity(shippingInfo.city)
        setState(shippingInfo.state)
        setCountry(shippingInfo.country)
        setPinCode(shippingInfo.pinCode)
        setPhoneNo(shippingInfo.phoneNo)
      }    

  },[]);  


  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (address.length < 3) {
      alert.info("Address should be of min 3 characters");
    } else if (pinCode.length < 6 || pinCode.length > 6) {
      alert.info("Pincode should of 6 digits");
    } else if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.info("Phone no. should of 10 digits");
    } else if (!country) {
      alert.info("Please provide a country name");
    } else {
      
        alert.success('Shipping Address Saved')
        localStorage.setItem("shippingDetails" , JSON.stringify({ address, city, state, country, pinCode, phoneNo }))
    
        navigate('/order/confirm')
      }

  };

  return (
    <>
      <Helmet>
        <title>Shipping Info</title>
      </Helmet>

      <div
        className="switch"
        style={{ marginTop: "30px", backgroundColor: "yellowgreen" }}
      >
        <h4 style={{ color: "white" }}>Shipping Info</h4>
      </div>

      <CheckoutSteps currentStep = {0} />

      <div className="loginregister_box" style={{ marginTop: "30px" }}>
        <div className="mx-auto"></div>
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="loginEmail">
            <HomeIcon style={{ color: "white", paddingRight: "1%" }} />
            <input
              type="text"
              placeholder="Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="loginEmail">
            <LocationCityIcon style={{ color: "white", paddingRight: "1%" }} />
            <input
              type="text"
              placeholder="City"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="loginEmail">
            <PinDropIcon style={{ color: "white", paddingRight: "1%" }} />
            <input
              type="number"
              placeholder="Pin Code"
              required
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>

          <div className="loginEmail">
            <PhoneIcon style={{ color: "white", paddingRight: "1%" }} />
            <input
              type="number"
              placeholder="Phone Number"
              required
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>

          <div className="loginEmail">
            <PublicIcon style={{ color: "white", paddingRight: "1%" }} />

            <select
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              //country state will contain the selected country's isoCode
            >
              <option value="">Country</option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          {country && (
            <div className="loginEmail">
              <TransferWithinAStationIcon style={{ color: "white", paddingRight: "1%" }}/>

              <select
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">State</option>
                {/* will search for the states in the country via isoCode saved in the counrty state */}
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <Button type="submit" className="loginBtn">
            Confirm
          </Button>
        </form>
      </div>
    </>
  );
};

export default Shipping;
