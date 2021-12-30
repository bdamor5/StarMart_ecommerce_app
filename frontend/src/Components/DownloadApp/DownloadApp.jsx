import React from "react";
import "./DownloadApp.css";
import genuine from "./genuine.png";
import secure from "./secure.png";
import hassle from "./hassle.png";
import appstore from "./appstore.png";
import googleplay from "./googleplay.png";
import { Link } from "react-router-dom";
import phone from "./phoneapp.png";
import Helmet from 'react-helmet'

const DownloadApp = () => {
  return (
    <>
     <Helmet>
            <title>Download App</title>
    </Helmet>
      <div className="downloadapp_container container-fluid">
        <h3>Download Our App</h3>
        <div className="downloadapp_container_align">
          <div className="downloadapp_left">
            <h3>
              <i style={{ fontWeight: "900" }}>                
                <span style={{ color: "gold" }}>Star</span>Mart
              </i>
              <img src="./starmart.png" alt="logo" />
            </h3>
            <h2>INDIA'S MOST POPULAR!</h2>
            <h3>SHOPPING APP</h3>
            <div className="downloadapp_features">
              <h5>
                <img src={genuine} alt="genuine" />
                Genuine Products
              </h5>
              <h5>
                <img src={secure} alt="secure" />
                Secure Shopping
              </h5>
              <h5>
                <img src={hassle} alt="hassle" />
                Hassle - free returns
              </h5>
            </div>

            <div className="downloadapp_link">
              <Link to="#">
                <img src={appstore} alt="apple" />
              </Link>

              <Link to="#">
                <img src={googleplay} alt="google" />
              </Link>
            </div>
          </div>

          <div className="downloadapp_right">
            <img src={phone} alt="displpay phone" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadApp;
