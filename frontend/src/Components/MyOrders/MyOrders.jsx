import React, { useState, useEffect } from "react";
import "./MyOrders.css";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "../../redux/actions/orderActions";
import MyOrderItem from "./MyOrderItem";
import Loader from "../Loader/Loader";

const MyOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  const { orders, loading } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

   var reversedOrders = orders && orders.reverse();

  return (
    <>
      <Helmet>
        <title>User's Orders</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <>          
          <div
            className="switch"
            style={{ marginTop: "30px", backgroundColor: "yellowgreen" }}
          >
            <h4 style={{ color: "white" }}>{`${user.name}'s Orders`}</h4>
          </div>
          <div className="user_order_container">
            {orders && orders[0] ?
              reversedOrders.map((curr) => {
                return <MyOrderItem order={curr} />;
              })
              :
              <h4 style={{color:'coral',fontWeight:'700',textAlign:'center',margin:'30px auto'}}>No Orders Found!</h4>
              }
          </div>
        </>
      )}
    </>
  );
};

export default MyOrders;
