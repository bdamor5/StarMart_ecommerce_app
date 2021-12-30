import React, { useState,useEffect } from "react";
import './Resetpw.css'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import Button from "@mui/material/Button";
import { useAlert } from "react-alert";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { resetpw, clearErrors } from "../../redux/actions/userActions";
import Loader from '../Loader/Loader'
import {useNavigate,useParams} from 'react-router-dom'

const ResetPw = () => {
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const alert = useAlert();

  const dispatch = useDispatch();

  const navigate = useNavigate()
  const params = useParams()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (pw.length < 8 || confirmPw.length < 8) {
      alert.show("Passwords Must Be Of At Least 8 Characters");
    } else if(pw !== confirmPw){
        alert.show("Passwords Do Not Match");
    }else{
      const myForm = new FormData();

      myForm.set("password",pw);
      myForm.set("confirmPassword",confirmPw);


      dispatch(resetpw(params.token,myForm));

      setPw('')
      setConfirmPw('')
    }
  };

  const { loading, success, error } = useSelector((state) => state.password);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      navigate('/forgotpassword')
    }

    if (success) {
      alert.success('Password Reseted! Please Login');
      navigate('/login_register')
    }

  }, [dispatch,error,success]);

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className="switch"
            style={{ marginTop: "30px", backgroundColor: "yellowgreen" }}
          >
            <h4 style={{ color: "white" }}>Reset Password</h4>
          </div>
          <div className="loginregister_box" style={{ marginTop: "30px" }}>
            <div className="mx-auto">
            </div>
            <form className="loginForm" onSubmit={handleSubmit}>
              <div className="loginEmail">
                <LockOpenIcon
                  style={{ color: "white", paddingRight: "1%" }}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                />
              </div>

              <div className="loginEmail">
                <LockIcon
                  style={{ color: "white", paddingRight: "1%" }}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  required
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                />
              </div>

              <Button type="submit" className="loginBtn">
                Reset Password
              </Button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPw;
