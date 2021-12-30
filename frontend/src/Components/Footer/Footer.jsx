import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import sell from './sell.svg'
import adv from './advertise.svg'
import gift from './gift.svg'
import help from './help.svg'

const Footer = () => {
  return (
    <>
      <div className="main_footer">
        <div className="above_section_footer">
          <div className="above_left_section_footer">
              <ul className="als_1">
                <li>
                  <h6 style={{color: 'gray'}}>ABOUT</h6>
                </li>
                <li>
                  <Link to="#">Contact Us</Link>
                </li>
                <li>
                  <Link to="/aboutus">About Us</Link>
                </li>
                <li>
                  <Link to="#">Careers</Link>
                </li>
                <li>
                  <Link to="#">StarMart Stories</Link>
                </li>
                <li>
                  <Link to="#">Press</Link>
                </li>
                <li>
                  <Link to="/">StarMart</Link>
                </li>
                <li>
                  <Link to="#">Wholesale</Link>
                </li>
                <li>
                  <Link to="#">Corporate</Link>
                </li>
                <li>
                  <Link to="#">Information</Link>
                </li>
              </ul>

              <ul className="als_1"> 
                <li>
                  <h6 style={{color: 'gray'}}>HELP</h6>
                </li>
                <li>
                  <Link to="#">Payments</Link>
                </li>
                <li>
                  <Link to="#">Shipping</Link>
                </li>
                <li>
                  <Link to="#">Returns</Link>
                </li>
                <li>
                  <Link to="#">FAQs</Link>
                </li>
                <li>
                  <Link to="#">Press</Link>
                </li>
                <li>
                  <Link to="#">Report</Link>
                </li>
                <li>
                  <Link to="#">Infringement</Link>
                </li>
              </ul>

              <ul className="als_1">
                <li>
                  <h6 style={{color: 'gray'}}>POLICY</h6>
                </li>
                <li>
                  <Link to="#">Terms Of Use</Link>
                </li>
                <li>
                  <Link to="#">Security</Link>
                </li>
                <li>
                  <Link to="#">Privacy</Link>
                </li>
                <li>
                  <Link to="#">Sitemap</Link>
                </li>
                <li>
                  <Link to="#">EPR Compliance</Link>
                </li>
              </ul>

              <ul className="als_1">
                <li>
                  <h6 style={{color: 'gray'}}>SOCIAL</h6>
                </li>
                <li>
                  <Link to="#">Facebook</Link>
                </li>
                <li>
                  <Link to="#">Twitter</Link>
                </li>
                <li>
                  <Link to="#">Youtube</Link>
                </li>
              </ul>
            </div>

          <div className="above_right_section_footer">
            <div className="ars_1">
              <h6 style={{color: 'gray'}}>Mail Us : </h6>
              <p>
                StarMart Private Limited,<br/> Buildings Alyssa, Begonia & Clove
                Embassy Tech Village,<br/> Outer Ring Road, <br/>Devarabeesanahalli
                Village,<br/> Bengaluru, h660103,<br/> Karnataka, India
              </p>
            </div>

            <div>
              <h6 style={{color: 'gray'}}>Registered Office Address : </h6>
              StarMart Internet Private Limited, <br/>
              Buildings Alyssa,<br/> Begonia & Clove Embassy Tech Village,<br/> Outer Ring Road,<br/> Devarabeesanahalli
              Village, Bengaluru,h660103,<br/> Karnataka, India  <br/> <br/> CIN :
              h61109KA2012PTC066107 <br/> Telephone: <span style={{color:'blue'}}>1800 200 9800</span>
            </div>
          </div>
        </div>

          <ul className="below_section_footer">
            <li>
            <img src={sell} alt="sell" />
              <Link to="#">Sell On StarMart</Link>
            </li>

            <li>
            <img src={adv} alt="adv" />
              <Link to="#">Advertise</Link>
            </li>

            <li>
            <img src={gift} alt="gift" />
              <Link to="#">Gift Cards</Link>
            </li>

            <li>
            <img src={help} alt="help" />
              <Link to="#">Help Center</Link>
            </li>

            <li>
              <Link to="#">2021 &copy; StarMart</Link>
            </li>
          </ul>
      </div>
    </>
  );
};

export default Footer;
