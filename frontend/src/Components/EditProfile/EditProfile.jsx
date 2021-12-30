import React, { useState, useEffect } from "react";
import './EditProfile.css'
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Button from "@mui/material/Button";                                                                                                   
import FaceIcon from "@mui/icons-material/Face";
import Helmet from "react-helmet";
import { useAlert } from "react-alert";
import { editUser, clearErrors, userDetails} from "../../redux/actions/userActions";
import {EDIT_USER_RESET} from '../../redux/constants/userConstants'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const EditProfile = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const  {user} = useSelector((state) => state.user);
  const navigate = useNavigate();

  //edit
  const [name,setName] = useState(user.name)
  const [email,setEmail] = useState(user.email)

  const [avatar, setAvatar] = useState(user.avatar.url);

  //on change for edit
  const handleAvatarChange = (e) => {
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
  };

  //on editing the user
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.length < 3 && name.length > 0) {
      alert.show("Name Must Be Of At Least 3 Characters");
    } else if (email.length < 13 && email.length > 0) {
      alert.show("Improper Email Address");
    } else {

      const myForm = new FormData();
      myForm.set("name", name);
      myForm.set("email", email);

    if(avatar === user.avatar.url){
        myForm.set("avatar" , '')
    }else{
        myForm.set("avatar", avatar);
    }         

      dispatch(editUser(myForm));
     
    }
}

    const {loading,error,isEdited} = useSelector(state => state.userProfile)

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(isEdited){
            alert.success("Profile Edited Successfully")
            dispatch(userDetails())
            navigate('/me')

            dispatch({type:EDIT_USER_RESET})
        }

      }, [error, dispatch,isEdited,navigate,alert]);

  return (
    <div>
      <Helmet>
        <title>Edit Profile</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
          <>
          <div
            className="switch"
            style={{ backgroundColor: "yellowgreen", marginTop: "25px" }}
          >
            <h4 style={{ color: "white" }}>Edit {user.name}'s Profile</h4>
          </div>

          <div className="loginregister_box">
          <form
            className="editForm"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="editName">
              <FaceIcon style={{ color: "white", paddingRight: "1%" }} />
              <input
                type="text"
                placeholder="Update Name"
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="editEmail">
              <MailOutlineIcon style={{ color: "white", paddingRight: "1%" }} />
              <input
                type="email"
                placeholder="Update Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div id="editImage" className="editAvatar">
              <img
                src={avatar}
                alt="Avatar Preview"
                className="avatarPreview"
              />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
            <Button type="submit" className="loginBtn">
              Update
            </Button>
          </form>
          </div>
          </>
      )}
    </div>
  );
};

export default EditProfile;
