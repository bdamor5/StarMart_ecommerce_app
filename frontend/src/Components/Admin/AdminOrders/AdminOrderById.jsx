import React, { useState, useEffect } from "react";
import "./AdminOrder.css";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { orderDetails, updateOrder } from "../../../redux/actions/orderActions";
import Loader from "../../Loader/Loader";
import { Button } from "@mui/material";
import { UPDATE_ORDER_RESET } from "../../../redux/constants/orderConstants";

const AdminOrderById = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const alert = useAlert();

  const [orderStatus, setOrderStatus] = useState("");

  const { order, loading } = useSelector((state) => state.orderDetails);

  const { isUpdated, error } = useSelector((state) => state.orderAdmin);

  useEffect(() => {
    if (isUpdated) {
      alert.success("Order Status Updated");
      navigate("/admin/orders");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    if (error) {
      alert.error(error);
      navigate("/admin/orders");
    }

    dispatch(orderDetails(params.id));
  }, [dispatch, params.id, error, isUpdated]);

  const handleUpdate = () => {
    if (orderStatus) {
      const myForm = new FormData();
      myForm.set("status", orderStatus);

      dispatch(updateOrder(params.id, myForm));
    } else {
      alert.info('Please select a staus')
    }
  };

  return (
    <>
      <Helmet>
        <title>Order Details</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator=">"
            className="bc"
            style={{ marginTop: "20px" }}
          >
            <div className="bc_item" onClick={() => navigate("/admin")}>
              Dashboard
            </div>
            <div className="bc_item" onClick={() => navigate("/admin/orders")}>
              All Orders
            </div>
            <div className="bc_lastitem">Order Details</div>
          </Breadcrumbs>
          <div className="orderItem_container">
            <div className="order_heading">
              <div className="order_placed">
                ORDER PLACED <br /> {order && order.paidAt.substring(0, 10)}
              </div>
              <div className="order_price">
                TOTAL PRICE <br /> ₹{order && order.totalPrice}
              </div>
              <div className="order_ship">
                SHIPPING ADDRESS <br />{" "}
                {`${order && order.shippingInfo.address}, ${
                  order && order.shippingInfo.city
                }, ${order && order.shippingInfo.state}, ${
                  order && order.shippingInfo.pinCode
                }, ${order && order.shippingInfo.country}`}
              </div>
            </div>
            <div className="admin_order_status_container">
              <div
                className="admin_order_status"
                style={{ marginBottom: "20px" }}
              >
                ORDER STATUS <br />
                <span
                  style={
                    order && order.orderStatus === "Delivered"
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  {order && order.orderStatus}
                </span>
              </div>
              {order && order.orderStatus !== "Delivered" && (
                <div className="admin_order_status">
                  UPDATE STATUS <br />
                  <select
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                  >
                    {order && order.orderStatus === "Processing" ? (
                      <>
                        <option value=""> Choose</option>
                        <option value="Shipped"> Shipped</option>
                        <option value="Delivered"> Delivered</option>
                      </>
                    ) : (
                      <>
                        <option value=""> Choose</option>
                        <option value="Delivered"> Delivered</option>
                      </>
                    )}
                  </select>
                  <br />
                  <Button className="updateBtn" onClick={handleUpdate}>
                    Update
                  </Button>
                </div>
              )}
            </div>
            <div className="order_items">
              {order &&
                order.orderItems.map((curr) => (
                  <div
                    className="orderItem"
                    onClick={() =>
                      navigate(`/productdetails/${curr.productId}`)
                    }
                  >
                    <img src={curr.image} alt="orderitem_image" />
                    <div className="orderItem_name">{curr.name}</div>
                    <div className="orderItem_price">₹{curr.price}</div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminOrderById;
