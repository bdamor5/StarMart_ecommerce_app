import React, { useState, useEffect } from "react";
import './AdminUsers.css'
import Sidebar from "../Sidebar/Sidebar";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import {DataGrid} from '@mui/x-data-grid'
import { allUsersAdmin, deleteUserAdmin, singleUserAdmin } from "../../../redux/actions/userActions";
import {useNavigate} from 'react-router-dom'
import {Button} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAlert} from 'react-alert'
import { ADMIN_DELETE_RESET } from "../../../redux/constants/userConstants";

const AdminUsers = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    //load deletion
  const [load , setLoad] = useState(false)

  const { users,loading } = useSelector((state) => state.allUsers);
  const {isDeleted} = useSelector(state => state.userByAdmin)

  useEffect(() => {

    if(isDeleted === true){
        alert.success('User Deleted')
        dispatch({type : ADMIN_DELETE_RESET})
        setLoad(false)

    }

    dispatch(allUsersAdmin());



  }, [dispatch,isDeleted]);

  const navigate = useNavigate()

    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

        {field: "email", headerName: "Email",minWidth: 200,flex: 1,},

        {field: "name",headerName: "Name", minWidth: 150,flex: 0.5,}, 

        {field: "role",headerName: "Role", minWidth: 150,flex: 0.3,type:'number',
          cellClassName: (params) => {
            return params.getValue(params.id, "role") === "admin" ? "redColor" : "blueColor";
         },
        },
    
        {field: "actions",headerName: "Actions",minWidth: 150, flex: 0.3,sortable: false,type:'number',
          renderCell: (params) => {
            return (
              <>
                <Button onClick={() => {dispatch(singleUserAdmin(params.getValue(params.id, "id")));navigate(`/admin/user/${params.getValue(params.id, "id")}`);}}>
                  <EditIcon style={{color:'chartreuse'}}/>
                </Button>
    
                <Button
                  onClick={() =>{
                    setLoad(true);
                    dispatch(deleteUserAdmin(params.getValue(params.id, "id")));
                  }}
                >
                  <DeleteIcon style={{color:'tomato'}}/>
                </Button>
              </>
            );
          },
        },
    ]

    const rows = []

    const {user} = useSelector((state) => state.user);

    users &&
    users.forEach((item) => {
      if(item._id !== user._id){
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    }
    });

  return (
    <>
      <Helmet>
        <title>All Users</title>
      </Helmet>
      <div className="admin_container">
        <div className="sidebar">
          <Sidebar active="Users" />
        </div>
        <div className="dashboard">
            <DataGrid 
            rows = {rows}
            columns = {columns}
            pageSize = {10}
            disableSelectionOnClick
            className="datagrid"
            autoHeight
            loading = {load || loading ? true : false}
            />
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
