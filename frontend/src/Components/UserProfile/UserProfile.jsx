import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { useSelector,useDispatch } from "react-redux";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Helmet from "react-helmet";
import {deleteUser, logout,userDetails} from '../../redux/actions/userActions'
import {useAlert} from 'react-alert'
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const UserProfile = () => {

     //modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    //modal Box style
  const style = {
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const dispatch = useDispatch()

  const alert = useAlert()
  const navigate = useNavigate()

  //delete
  const handleDelete = () => {
      dispatch(deleteUser())
      dispatch(logout());

      alert.success('User Profile Deleted Successfully!')

      navigate('/')
  };

     //edit
     const handleEdit = () =>{
        navigate('/me/edit')
     }

     const { loading,user } = useSelector((state) => state.user);

  return (
    <>
    <Helmet>
        <title>User Profile</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
        className="switch"
        style={{ backgroundColor: "yellowgreen", marginTop: "25px" }}
      >
        <h4 style={{ color: "white" }}>{user.name}'s Profile</h4>
      </div>
      <div className="profile_container">
        <div className="profile_content">
          <div className="profile_image">
            <img src={user.avatar.url} alt="profile_image" />
          </div>

          <div className="profile_details">
            <h3>
              <b>Name :</b> {user.name}
            </h3>
            <h3>
              {" "}
              <b> Email :</b> {user.email}
            </h3>
            <h3>
              <b>Joined :</b> {String(user.createdAt).substr(0, 10)}
            </h3>
          </div>
        </div>

        <div className="profile_buttons">
          <Button className="loginBtn" onClick={handleEdit}>Edit</Button>
          <Button className="loginBtn" onClick={handleOpen}>
            Delete
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="dialog_box" sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                style={{ textAlign: "center" }}
              >
                Are You Sure You Want To Delete Your Profile?
              </Typography>
              <div className="dialog_buttons">
                <Button className="loginBtn" onClick={handleClose}>
                  Cancel
                </Button>
                <Button className="loginBtn" onClick={handleDelete}>
                  Yes
                </Button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
      </>
      )}
      
    </>
  );
};

export default UserProfile;
