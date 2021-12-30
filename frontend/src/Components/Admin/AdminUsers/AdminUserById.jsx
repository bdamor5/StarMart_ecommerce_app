import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  singleUserAdmin,
  updateUserAdmin,
} from "../../../redux/actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../../Loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import EngineeringIcon from "@mui/icons-material/Engineering";
import Button from "@mui/material/Button";
import { ADMIN_UPDATE_RESET } from "../../../redux/constants/userConstants";

const AdminUserById = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const alert = useAlert();

  const { user, loading, error } = useSelector((state) => state.singleUser);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();

  const editSubmit = (e) => {
    e.preventDefault();

    if (name.length < 3) {
      alert.show("Name Must Be Of At Least 3 Characters");
    } else if (email.length < 13) {
      alert.show("Improper Email Address");
    } else {
      const myForm = new FormData();

      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("role", role);

      dispatch(updateUserAdmin(params.id, myForm));
    }
  };

  const { isUpdated, error: updateError } = useSelector(
    (state) => state.userByAdmin
  );

  useEffect(() => {
    if (user && user._id !== params.id) {
      dispatch(singleUserAdmin(params.id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
    }

    if (updateError) {
      alert.error(updateError);
    }

    if (isUpdated) {
      alert.success("User Details Updated");
      navigate("/admin/users");
      dispatch({ type: ADMIN_UPDATE_RESET });
    }

  }, [dispatch, user,params.id, isUpdated, error, updateError, alert]);

  return (
    <>
      <Helmet>
        <title>Edit User Details</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <div className="loginregister_container">
          <div
            className="switch"
            style={{
              marginTop: "15px",
              marginBottom: "10px",
              backgroundColor: "yellowgreen",
            }}
          >
            <h4 style={{ color: "white" }}>Edit User Details</h4>
          </div>
          <Breadcrumbs aria-label="breadcrumb" separator=">" className="bc">
            <div className="bc_item" onClick={() => navigate("/admin")}>
              Dashboard
            </div>
            <div className="bc_item" onClick={() => navigate("/admin/users")}>
              All Users
            </div>
            <div className="bc_lastitem">Edit User</div>
          </Breadcrumbs>
          <div className="loginregister_box" style={{ marginTop: "-10px" }}>
            <form className="registerForm" onSubmit={editSubmit}>
              <div className="registerName">
                <FaceIcon style={{ color: "white", paddingRight: "1%" }} />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div
                className="registerPassword"
                style={{ display: "flex", alignContent: "center" }}
              >
                <EngineeringIcon
                  style={{ color: "white", paddingRight: "2%" }}
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button type="submit" className="loginBtn">
                Edit
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminUserById;
