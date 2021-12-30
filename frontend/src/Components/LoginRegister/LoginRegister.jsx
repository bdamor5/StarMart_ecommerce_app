import React, { useState, useEffect } from "react";
import "./LoginRegister.css";
import Switch from "@mui/material/Switch";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import FaceIcon from "@mui/icons-material/Face";
import Helmet from "react-helmet";
import { useAlert } from "react-alert";
import {register,clearErrors,login} from '../../redux/actions/userActions'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate,useLocation } from "react-router-dom";
import Loader from '../Loader/Loader'

const LoginRegister = () => {
  // for carousel
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  //react alert
  const alert = useAlert();

  //dispatch
  const dispatch = useDispatch()

  //use selector to access value from store
  const {isAuthenticated,error,loading} = useSelector(state => state.user)

  const navigate = useNavigate()

  //handling redirect
  const location = useLocation()

  const redirect = location.search ? location.search.split("=")[1] : ''

  useEffect(()=>{
    if(isAuthenticated){

      if(userAction === 'register'){
          alert.success('Registered Successfully')
      }else if(userAction === 'login'){
          alert.success('Logged In Successfully')
      }
      // If we not check for userAction === 'login' then 
      // whenever a logged in user tries to navigate to 
      // ‘/login_register’ they will always see the alert message 
      // of ‘logged in successfully’.

      navigate(`/${redirect}`)      
    }

    //to avoid error message whenever we land on login_register page.
    //So we will make sure that fields are not empty then only we will 
    //check for the error msg for login or register
    if(error && loginEmail && loginPassword){

      if(userAction === 'register'){
          alert.error("User Already Exists , Please Log In")
      }else{
        alert.error(error)
      }
      
      dispatch(clearErrors())
    }

  },[isAuthenticated,error,dispatch,navigate,alert,redirect])

  //state to distinguish bet register & login
  const [userAction , setUserAction] = useState('')

  //register
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

  //on change for register
  const handleRegisterChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      //to read image file

      reader.onload = () => {
        if (reader.readyState === 2) {
          //0 - not done ; 1 - processing ;  2 - done
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
      //load event is fired i.e reader.onload func, 
      //when is content read with readAsDataURL
       
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  //on registering the user
  const registerSubmit = (e) => {
    e.preventDefault();
    
    if(name.length < 3){
      alert.show("Name Must Be Of At Least 3 Characters")
    }else if(email.length < 13){
      alert.show("Improper Email Address")
    }else if(password.length < 8){
      alert.show("Password Must Be Of At Least 8 Characters")
    }else if(!name || !email){
      alert.show("Please Fill All The Fields")
    }else if(avatar === 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'){
      alert.show("Please Upload Your Avatar Image")
    }else {
      const myForm = new FormData();
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("password", password);
      myForm.set("avatar", avatar);
  
      dispatch(register(myForm));
      setUserAction('register')
    }
    
  };

  //login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //on logging in
  const loginSubmit = (e) => {
    e.preventDefault();

      dispatch(login(loginEmail,loginPassword));
      setUserAction('login') 

  };

  return (
    <>
      <Helmet>
        <title>Login or Register</title>
      </Helmet>

      {
        loading 
        ? <Loader/> 
        : (
        <div className="loginregister_container">
        <div className="switch" style={{ backgroundColor: "yellowgreen" }}>
          <h4 style={checked ? { color: "gray" } : { color: "white" }}>
            Register
          </h4>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            style={checked ? { color: "blue" } : { color: "grey" }}
          />
          <h4 style={checked ? { color: "white" } : { color: "gray" }}>
            Login
          </h4>
        </div>
        <div className="loginregister_box">
          {checked ? (
            <form className="loginForm" onSubmit={loginSubmit}>
              <div className="loginEmail">
                <MailOutlineIcon
                  style={{ color: "white", paddingRight: "1%" }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <LockOpenIcon style={{ color: "white" }} />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <div className="forgotpw">
                <Link to="/forgotpassword">Forget Password ?</Link>
              </div>
              <Button type="submit" className="loginBtn">
                Login{" "}
              </Button>
            </form>
          ) : (
            <form
              className="registerForm"
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div className="registerName">
                <FaceIcon style={{ color: "white", paddingRight: "1%" }} />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="registerEmail">
                <MailOutlineIcon
                  style={{ color: "white", paddingRight: "1%" }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="registerPassword">
                <LockOpenIcon style={{ color: "white" }} />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  value={password}
                  onChange={handleRegisterChange}
                />
              </div>

              <div id="registerImage" className="registerAvatar">
                <img
                  src={avatar}
                  alt="Avatar Preview"
                  className="avatarPreview"
                />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleRegisterChange}
                />
              </div>
              <Button type="submit" className="loginBtn">
                Register
              </Button>
            </form>
          )}
        </div>
      </div>
        )}
    </>
  );
};

export default LoginRegister;
