import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./AdminDashboard.css";
import Helmet from "react-helmet";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import { useDispatch, useSelector } from "react-redux";
import { allUsersAdmin } from "../../../redux/actions/userActions";
import { getAdminProducts } from "../../../redux/actions/productActions";
import { getAllOrders } from "../../../redux/actions/orderActions";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const AdminDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allUsersAdmin());
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
  }, [dispatch]);

  const { users} = useSelector((state) => state.allUsers);
  const { products } = useSelector((state) => state.getAdminProducts);
  const { orders } = useSelector((state) => state.allOrders);

  //get no. of out of stock products
  var outOfStock = 0;

  products &&
    products.forEach((curr) => {
      if (curr.Stock === 0) outOfStock += 1;
    });

  //to get total amount of orders
  var total = 0;

  orders &&
    orders.forEach((curr) => {
      total += curr.totalPrice;
    });

  //line graph
  const lineChart = {
    labels: ["Jan", "Feb", "Mar", "April" , "May" , "June" , "July" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"],
    datasets: [
      {
        label: "TOTAL SALES",
        backgroundColor: ["lightcoral"],
        hoverBackgroundColor: ["#DDB5B5"],
        data: [400000,100000,300000,200000,500000,550000,450000,total],
      },
    ],
  };

  //doughnut chart
  const doughnutChart = {
    labels: ["Out of Stock Products", "In Stock Products"],
    datasets: [
      {
        backgroundColor: ["purple", "coral"],
        hoverBackgroundColor: ["violet", "lightcoral"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <div className="admin_container">
        <div className="sidebar">
          <Sidebar active="Dashboard" />
        </div>
        <div className="dashboard">
          <div className="d_top">
            <div className="d_top_item">
                <MonetizationOnIcon className='d_top_item_icon' style={{color:'chartreuse'}}/>
                <div>
                    <h4>SALES</h4>
                    <h4 style={{color:'chartreuse'}}>{orders && `₹${Math.round(total)}`}</h4> 
                </div>
            </div>
            <div className="d_top_item">
                <PeopleAltIcon className='d_top_item_icon' style={{color:'white'}}/>
                <div>
                    <h4>USERS</h4>
                    <h4 style={{color:'white'}}>{users && users.length - 1}</h4> 
                </div>
            </div>
            <div className="d_top_item">
                <ReceiptLongIcon className='d_top_item_icon' style={{color:'brown'}}/>
                <div>
                    <h4>TRANSACTIONS</h4>
                    <h4 style={{color:'brown'}}>{orders && orders.length}</h4> 
                </div>
            </div>
          </div>
          <div className="d_bottom">
            <div className="lineChart">
              <Line data={lineChart} />
            </div>

            <div className="doughnutChart">
              <Doughnut data={doughnutChart} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
