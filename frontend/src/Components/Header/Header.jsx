import React, { useState, useEffect } from "react";
import "./Header.css";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import InputIcon from "@mui/icons-material/Input";
import DownloadIcon from "@mui/icons-material/Download";
import star from "./star.svg";
import search from "./searching.png";
import { useDispatch, useSelector } from "react-redux";
import { userDetails, logout } from "../../redux/actions/userActions";
import { useAlert } from "react-alert";

import { Badge } from "@mui/material";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import LogoutIcon from "@mui/icons-material/Logout";
import Loader from '../Loader/Loader'
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { getBadgeCount } from "../../redux/actions/productActions";


const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  const handleCart = () => {
    navigate("/cart");
  };

  const alert = useAlert();

  const { isAuthenticated, loading, user } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  
  //logout
  const handleLogout = () => {
    dispatch(logout());
    alert.success("Logged Out Successfully!");
  };

  //search
  const [keyword,setKeyword] = useState('')

  const searchHandler = (e) =>{
    e.preventDefault()

    if(keyword.trim()){
      navigate(`/products/${keyword}`)
    }else{
      navigate('/products')
    }
  }

  //cart items count for badge on cart icon
  const {count} = useSelector((state) => state.badgeCount)

  const [cartCount , setCartCount] = useState()

  useEffect(() => {
    dispatch(userDetails());

    dispatch(getBadgeCount())

    setCartCount(count)

  }, [dispatch,count]);


  return (
    <>
    {
      !isAuthenticated && loading
      ? <Loader/>
      : (
        <Navbar expand="lg" className="my_navbar" fixed="top" expanded={expanded}>
        <Container container-fluid>
          <Navbar.Brand>
            <Link to="/" className="navbar_heading">
              <img src={star} alt="logo" className="navbar_heading_logo" />
              <span style={{ color: "gold" }}>Star</span>Mart
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="navbarScroll"
            onClick={() => setExpanded(!expanded)}
          />

          <Navbar.Collapse id="navbarScroll">
            {/* search field */}
            <Form className="pt-2 navbar_heading_form" onSubmit={searchHandler}>
              <FormControl
                type="search"
                placeholder="Search For Products..."
                className="navbar_heading_search"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <img
                src={search}
                className="navbar_heading_search_icon"
                onClick={(e) => {setExpanded(false); searchHandler(e);}}
              />
            </Form>

            <Nav className="navbar_heading_user">
              {/* if isAuthenticated exists i.e not 'undefined' then only render user options dropdown
            when we dont check for this condition , then the login/register btn will render because at that time isAuthenticated is undefined */}
              
              {isAuthenticated === true ? (
                <Badge
                  badgeContent={user.role == "admin" ? "admin" : null}
                  color="primary"
                >
                  <NavDropdown
                    className="navbar_heading_dropdown_user"
                    title={
                      <span
                        style={{
                          color: "#e99440",
                          fontSize: "15px",
                          overflow: "auto",
                        }}
                      >
                        {user.name}
                      </span>
                    }
                    id="basic-nav-dropdown"
                  >
                    {user.role === "admin" && (
                      <>
                        <NavDropdown.Item
                          className="navbar_collapse_item"
                          onClick={() => {setExpanded(false); navigate('/admin');}}
                        >
                          <Link
                            to="/admin"
                            className="navbar_collapse_link"
                          >
                            <AnalyticsIcon style={{ marginRight: "3px" }} />
                            Admin Dashboard
                          </Link>
                        </NavDropdown.Item>

                        <NavDropdown.Divider />
                      </>
                    )}
                    <NavDropdown.Item
                      className="navbar_collapse_item"
                      onClick={() => {setExpanded(false); navigate('/me');}}
                    >
                      <Link to="/me" className="navbar_collapse_link">
                        <AccountBoxIcon style={{ marginRight: "3px" }} />
                        User Profile
                      </Link>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item
                      className="navbar_collapse_item"
                      onClick={() => {setExpanded(false); navigate('/me/change_password');}}
                    >
                      <Link to="/me/change_password" className="navbar_collapse_link">
                        <LockOpenIcon style={{ marginRight: "3px" }} />
                        Change Password
                      </Link>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item
                      className="navbar_collapse_item"
                      onClick={() => {setExpanded(false); navigate('/me/orders');}}
                    >
                      <Link to="/me/orders" className="navbar_collapse_link">
                        <CreditScoreIcon style={{ marginRight: "3px" }} />
                        All Orders
                      </Link>
                    </NavDropdown.Item>

                    <NavDropdown.Divider />

                    <NavDropdown.Item
                      className="navbar_collapse_item"
                      onClick={() => {
                        setExpanded(false);
                        handleLogout();
                        navigate('/');
                      }}
                    >
                      <Link to="/" className="navbar_collapse_link">
                        <LogoutIcon style={{ marginRight: "3px" }} />
                        Log Out
                      </Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Badge>
              ) : (
                  <Link
                    to="/login_register"
                    className="navbar_heading_link"
                    onClick={() => setExpanded(false)}
                  >
                    Login/Register
                  </Link>
              )}

              <NavDropdown
                className="navbar_heading_dropdown"
                title={<span style={{ color: "#e99440",fontSize: "17px"}}>More</span>}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item
                  className="navbar_collapse_item"
                  onClick={() => {setExpanded(false); navigate('/products');}}
                >
                  <Link to="/products" className="navbar_collapse_link">
                    <StorefrontIcon style={{ marginRight: "3px" }} />
                    All Products
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item
                  className="navbar_collapse_item"
                  onClick={() => {setExpanded(false); navigate('/aboutus');}}
                >
                  <Link to="/aboutus" className="navbar_collapse_link">
                    <SupportAgentIcon style={{ marginRight: "3px" }} />
                    About Us
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item
                  className="navbar_collapse_item"
                  onClick={() => {setExpanded(false); navigate('/returnpolicy');}}
                >
                  <Link to="/returnpolicy" className="navbar_collapse_link">
                    <InputIcon style={{ marginRight: "3px" }} />
                    Returns Policy
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item
                  className="navbar_collapse_item"
                  onClick={() => {setExpanded(false); navigate('/downloadapp');}}
                >
                  <Link to="/downloadapp" className="navbar_collapse_link">
                    <DownloadIcon style={{ marginRight: "3px" }} />
                    Download App
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              <div className="navbar_heading_cart" onClick={() => {
                    setExpanded(false);
                    handleCart();
                  }}>
                   <Badge
                  badgeContent={ cartCount > 0 ? cartCount : null}
                  color="primary"
                >
                <ShoppingBagIcon
                  style={{ color: "#E99440" }}
                />
                </Badge>
              </div>              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      )
    }
      
    </>
  );
};

export default Header;
