import React, { useState,useEffect } from "react";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import LockClockIcon from '@mui/icons-material/LockClock';
import Button from "@mui/material/Button";
import { useAlert } from "react-alert";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { changepw, clearErrors } from "../../redux/actions/userActions";
import {CHANGE_PW_RESET} from '../../redux/constants/userConstants'
import Loader from '../Loader/Loader'
import {useNavigate,useParams} from 'react-router-dom'

const ChangePassword = () => {
    const [oldPw, setOldPw] = useState("");

  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const alert = useAlert();

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (oldPw.length < 8 || newPw.length < 8 || confirmPw.length < 8) {
      alert.show("Passwords Must Be Of At Least 8 Characters");
    } else if(newPw !== confirmPw){
        alert.show("Passwords Do Not Match");
    }else{
        
      const myForm = new FormData();
      
      myForm.set("oldPassword",oldPw);
      myForm.set("newPassword",newPw);
      myForm.set("confirmPassword",confirmPw);


       dispatch(changepw(myForm));
    }
  };

  const { loading, success, error } = useSelector((state) => state.password);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Password Changed');
      dispatch({type:CHANGE_PW_RESET})
      navigate('/')
    }

  }, [dispatch,error,success,alert]);

  return (
    <>
      <Helmet>
        <title>Change Password</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className="switch"
            style={{ marginTop: "30px", backgroundColor: "yellowgreen" }}
          >
            <h4 style={{ color: "white" }}>Change Password</h4>
          </div>
          <div className="loginregister_box" style={{ marginTop: "30px" }}>
            <div className="mx-auto">
            </div>
            <form className="loginForm" onSubmit={handleSubmit}>
            <div className="loginEmail">
                <LockClockIcon
                  style={{ color: "white", paddingRight: "1%" }}
                />
                <input
                  type="password"
                  placeholder="Old Password"
                  required
                  value={oldPw}
                  onChange={(e) => setOldPw(e.target.value)}
                />
              </div>

              <div className="loginEmail">
                <LockOpenIcon
                  style={{ color: "white", paddingRight: "1%" }}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
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
                Change Password
              </Button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default ChangePassword;
