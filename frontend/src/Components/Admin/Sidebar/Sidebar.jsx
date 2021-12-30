import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import MenuIcon from "@mui/icons-material/Menu";
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';

const Sidebar = ({ active }) => {
    const navigate = useNavigate()
  const { user } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);

  const [show, setShow] = useState(false);

  const updateDimensions = () => {
    if (window.innerWidth < 768) {
      setShow(true);
      setOpen(false)
    } else {
      setShow(false);
    }
  };

  useEffect(() => {

    //when page reloads we will check if the widht is already below 
    //768 or not and will render our drawer
    if (window.innerWidth < 768) {
        setShow(true);
        setOpen(false)
      } else {
        setShow(false);
      }

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  
}, [window]);

  

  return (
    <>
      {show === false ? (
        <div className="sidebar_content">
          <div className="profile">
            <div className="p_image">
              <img src={user.avatar.url} alt="uer image" />
            </div>
            <h4 className="p_name">{user.name}</h4>
          </div>
          <div className="sidebar_links">
            <div
              className="sidebar_item"
              style={
                active == "Dashboard"
                  ? { backgroundColor: "rgb(221, 181, 181)" }
                  : {}
              }
              onClick={()=>navigate('/admin')}
            >
              <DashboardIcon
                className="sidebar_icons"
                style={{ marginRight: "10px" }}
              />
              <h4>Dashboard</h4>
            </div>

            <div
              className="sidebar_item"
              style={
                active == "Users"
                  ? { backgroundColor: "rgb(221, 181, 181)" }
                  : {}
              }
              onClick={()=>navigate('/admin/users')}
            >
              <PeopleIcon
                className="sidebar_icons"
                style={{ marginRight: "10px" }}
              />
              <h4> Users</h4>
            </div>

            <div
              className="sidebar_item"
              style={
                active == "Products"
                  ? { backgroundColor: "rgb(221, 181, 181)" }
                  : {}
              }
              onClick={()=>navigate('/admin/products')}
            >
              <StorefrontIcon
                className="sidebar_icons"
                style={{ marginRight: "10px" }}
              />
              <h4> Products</h4>
            </div>

            <div
              className="sidebar_item"
              style={
                active == "Orders"
                  ? { backgroundColor: "rgb(221, 181, 181)" }
                  : {}
              }
              onClick={()=>navigate('/admin/orders')}
            >
              <ListAltIcon
                className="sidebar_icons"
                style={{ marginRight: "10px" }}
              />
              <h4> Orders</h4>
            </div>

            <div
              className="sidebar_item"
              style={
                active == "Reviews"
                  ? { backgroundColor: "rgb(221, 181, 181)" }
                  : {}
              }
              onClick={()=>navigate('/admin/reviews')}
            >
              <RateReviewIcon
                className="sidebar_icons"
                style={{ marginRight: "10px" }}
              />
              <h4>Reviews</h4>
            </div>
          </div>
        </div>
      ) : show === true && open === true ? (
        <div className="sidebar_open_content">
        <div className="sidebar_item" >
              <MenuIcon
                className="sidebar_icons toggle_btn"
                style={{ marginLeft: "6px" }}
                onClick={() => setOpen(!open)}
              />
            </div>
          <div className="profile_open">
            <div className="p_image_open">
              <img src={user.avatar.url} alt="user image" />
            </div>
            <h4 className="p_name_open">{user.name}</h4>
          </div>
          <div className="sidebar_open_links">
            <div
              className="sidebar_open_item"
              style={
                active == "Dashboard"
                  ? { backgroundColor: "rgb(221, 181, 181)" }
                  : {}
              }
              onClick={()=>navigate('/admin')}
            >
              <DashboardIcon
                className=""
                style={{ marginRight: "10px" }}
              />
              <h4>Dashboard</h4>
            </div>

            <div
              className="sidebar_open_item"
              style={
                active == "Users"
                  ? { backgroundColor: "rgb(221, 181, 181)" }
                  : {}
              }
              onClick={()=>navigate('/admin/users')}
            >
              <PeopleIcon
                className="sidebar_open_icons"
                style={{ marginRight: "10px" }}
              />
              <h4> Users</h4>
            </div>

            <div
              className="sidebar_open_item"
              style={
                active == "Products"
                  ? { backgroundColor: "rgb(221, 181, 181)" }
                  : {}
              }
              onClick={()=>navigate('/admin/products')}
            >
              <StorefrontIcon
                className="sidebar_open_icons"
                style={{ marginRight: "10px" }}
              />
              <h4> Products</h4>
            </div>

            <div
              className="sidebar_open_item"
              style={
                active == "Orders"
                  ? { backgroundColor: "rgb(221, 181, 181)" }
                  : {}
              }
              onClick={()=>navigate('/admin/orders')}
            >
              <ListAltIcon
                className="sidebar_open_icons"
                style={{ marginRight: "10px" }}
              />
              <h4> Orders</h4>
            </div>

            <div
              className="sidebar_open_item"
              style={
                active == "Reviews"
                  ? { backgroundColor: "rgb(221, 181, 181)" }
                  : {}
              }
              onClick={()=>navigate('/admin/reviews')}
            >
              <RateReviewIcon
                className="sidebar_open_icons"
                style={{ marginRight: "10px" }}
              />
              <h4>Reviews</h4>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="sidebar_content"
          style={{ width: "50px", height: "50vh" }}
        >
          <div className="sidebar_links">
            <div className="sidebar_item" onClick={() => setOpen(!open)}>
            <Tooltip title='Drawer' placement="right">
              <MenuIcon
                className="sidebar_icons toggle_btn"
                style={{ marginLeft: "6px" }}
              />
              </Tooltip>
            </div>

            <div
              className="sidebar_item"
              style={
                active == "Dashboard"
                  ? { backgroundColor: "rgb(221, 181, 181)" }
                  : {}
              }
              onClick={()=>navigate('/admin')}
            >
            <Tooltip title='Dashboard' placement="right">
              <DashboardIcon
                className="sidebar_icons"
                style={{ marginLeft: "6px" }}
              />
              </Tooltip>
            </div>

            <div
              className="sidebar_item"
              style={
                active == "Users"
                  ? { backgroundColor: "rgb(221, 181, 181)" }
                  : {}
              }
              onClick={()=>navigate('/admin/users')}
            >
            <Tooltip title='Users' placement="right">
              <PeopleIcon
                className="sidebar_icons"
                style={{ marginLeft: "6px" }}
              />
              </Tooltip>
            </div>

            <div
              className="sidebar_item"
              style={
                active == "Products"
                  ? { backgroundColor: "rgb(221, 181, 181)" }
                  : {}
              }
              onClick={()=>navigate('/admin/products')}
            >
            <Tooltip title='Products' placement="right">
              <StorefrontIcon
                className="sidebar_icons"
                style={{ marginLeft: "6px" }}
              />
              </Tooltip>
            </div>

            <div
              className="sidebar_item"
              style={
                active == "Orders"
                  ? { backgroundColor: "rgb(221, 181, 181)" }
                  : {}
              }
              onClick={()=>navigate('/admin/orders')}
            >
            <Tooltip title='Orders' placement="right">
              <ListAltIcon
                className="sidebar_icons"
                style={{ marginLeft: "6px" }}
              />
              </Tooltip>
            </div>

            <div
              className="sidebar_item"
              style={
                active == "Reviews"
                  ? { backgroundColor: "rgb(221, 181, 181)" }
                  : {}
              }
              onClick={()=>navigate('/admin/reviews')}
            >
            <Tooltip title='Reviews' placement="right">
              <RateReviewIcon
                className="sidebar_icons"
                style={{ marginLeft: "6px" }}
              />
              </Tooltip>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
