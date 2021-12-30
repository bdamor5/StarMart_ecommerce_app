import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import ProtectedRoute from "./Components/Routes/ProtectedRoute";
import axios from "axios";

// import AdminRoute from './Components/Routes/AdminRoute.jsx.js';

//components
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Home from "./Components/Home/Home.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import AboutUs from "./Components/AboutUs/AboutUs.jsx";
import ReturnPolicy from "./Components/ReturnPolicy/ReturnPolicy.jsx";
import DownloadApp from "./Components/DownloadApp/DownloadApp.jsx";
import AllProducts from "./Components/AllProducts/AllProducts.jsx";
import LoginRegister from "./Components/LoginRegister/LoginRegister.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import ForgotPw from "./Components/ForgotPw/ForgotPw.jsx";
import ResetPw from "./Components/ResetPw/ResetPw.jsx";
import UserProfile from "./Components/UserProfile/UserProfile.jsx";
import EditProfile from "./Components/EditProfile/EditProfile.jsx";
import ChangePassword from "./Components/ChangePassword/ChangePassword.jsx";
import Cart from "./Components/Cart/Cart";
import Shipping from "./Components/Shipping/Shipping.jsx";
import ConfirmOrder from "./Components/ConfirmOrder/ConfirmOrder.jsx";
import ProcessPayment from "./Components/ProcessPayment/ProcessPayment.jsx";
import PaymentSuccess from "./Components/ProcessPayment/PaymentSuccess.jsx";
import MyOrders from "./Components/MyOrders/MyOrders.jsx";

//stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


//admin
import AdminRoute from "./Components/Routes/AdminRoute";
import AdminDashboard from "./Components/Admin/AdminDashboard/AdminDashboard";
import AdminUsers from "./Components/Admin/AdminUsers/AdminUsers";
import AdminUserById from "./Components/Admin/AdminUsers/AdminUserById.jsx";
import AdminProducts from "./Components/Admin/AdminProducts/AdminProducts.jsx";
import NewProduct from "./Components/Admin/AdminProducts/NewProduct.jsx";
import EditProduct from "./Components/Admin/AdminProducts/EditProduct.jsx";
import AdminOrders from "./Components/Admin/AdminOrders/AdminOrders.jsx";
import AdminOrderById from "./Components/Admin/AdminOrders/AdminOrderById.jsx";
import AdminReviews from "./Components/Admin/AdminReviews/AdminReviews.jsx";


const App = () => {
  const location = useLocation();

  //get stripe API key
  const [stripeKey, setStripeKey] = useState();

  const getStripeAPIkey = async () => {
    const { data } = await axios.get("/api/payment/stripeapikey");

    setStripeKey(data.stripeAPIKey);
  };

  useEffect(() => {
    //'location' value changes that means we are at a new page & we will be scrolled up to the top
    document.documentElement.scrollTop = 0;

    //getting stripe API key
    getStripeAPIkey();
  }, [location]);

  return (
    <>

      <Header/>

      <br />
      <br />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/aboutus" element={<AboutUs />} />

        <Route path="/returnpolicy" element={<ReturnPolicy />} />

        <Route path="/downloadapp" element={<DownloadApp />} />

        <Route path="/products" element={<AllProducts />} />

        <Route path="/login_register" element={<LoginRegister />} />

        <Route path="/productdetails/:id" element={<ProductDetails />} />

        <Route path="/forgotpassword" element={<ForgotPw />} />

        <Route path="/password/reset/:token" element={<ResetPw />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/me" element={<UserProfile />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/me/edit" element={<EditProfile />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/me/change_password" element={<ChangePassword />} />
        </Route>

        <Route path="/products/:keyword" element={<AllProducts />} />

        <Route path="/cart" element={<Cart />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/shipping" element={<Shipping />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/order/confirm" element={<ConfirmOrder />} />
        </Route>

        {stripeKey && (
          <Route element={<ProtectedRoute />}>
            <Route
              path="/process_payment"
              element={
                <Elements stripe={loadStripe(stripeKey)}>
                  <ProcessPayment />
                </Elements>
              }
            />
          </Route>
        )}

        <Route element={<ProtectedRoute />}>
          <Route path="/payment_success" element={<PaymentSuccess />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/me/orders" element={<MyOrders />} />
        </Route>

        {/* Admin routes */}

        <Route element={<AdminRoute />}>
          <Route
            path="/admin"
            element={
                <AdminDashboard />
            }
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            path="/admin/users"
            element={
                <AdminUsers />
            }
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            path="/admin/user/:id"
            element={
                <AdminUserById />
            }
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            path="/admin/products"
            element={
                <AdminProducts />
            }
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            path="/admin/product/new"
            element={
                <NewProduct />
            }
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            path="/admin/product/:id"
            element={
                <EditProduct />
            }
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            path="/admin/orders"
            element={
                <AdminOrders />
            }
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            path="/admin/order/:id"
            element={
                <AdminOrderById />
            }
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            path="/admin/reviews"
            element={
                <AdminReviews />
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      {location.pathname !== "/login_register" && <Footer />}
    </>
  );
};

export default App;
