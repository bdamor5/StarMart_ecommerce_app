import React, { useState,useEffect } from "react";
import "./ForgotPw.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Button from "@mui/material/Button";
import { useAlert } from "react-alert";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { forgotpw, clearErrors } from "../../redux/actions/userActions";
import Loader from '../Loader/Loader'

const ForgotPw = () => {
  const [email, setEmail] = useState("");
  const alert = useAlert();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.length < 13) {
      alert.show("Improper Email Address");
    } else {
      const myForm = new FormData();

      myForm.set("email",email);

      dispatch(forgotpw(myForm));

      setEmail('')
    }
  };

  const { loading, success, error } = useSelector((state) => state.password);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('A Reset Password Link Sent!');
    }

  }, [dispatch,error,success]);

  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className="switch"
            style={{ marginTop: "30px", backgroundColor: "yellowgreen" }}
          >
            <h4 style={{ color: "white" }}>Forgot Password</h4>
          </div>
          <div className="loginregister_box" style={{ marginTop: "30px" }}>
            <div className="mx-auto">
              <h3
                style={{
                  textAlign: "center",
                  fontWeight: "700",
                  color: "white",
                  fontSize: "19px",
                  padding: "3% 3%",
                  borderBottom: "1px solid white",
                  width: "80%",
                  margin: "0 auto",
                }}
              >
                Enter Your Email & We Will Send A Link For Reseting Your
                Password
              </h3>
            </div>
            <form className="loginForm" onSubmit={handleSubmit}>
              <div className="loginEmail">
                <MailOutlineIcon
                  style={{ color: "white", paddingRight: "1%" }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button type="submit" className="loginBtn">
                Send Link
              </Button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPw;
