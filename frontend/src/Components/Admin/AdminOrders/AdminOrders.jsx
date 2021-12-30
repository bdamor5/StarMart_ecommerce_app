import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import {DataGrid} from '@mui/x-data-grid'
import {Button} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAlert} from 'react-alert'
import {useNavigate} from 'react-router-dom'
import { deleteOrder, getAllOrders, orderDetails } from "../../../redux/actions/orderActions";
import { DELETE_ORDER_RESET } from "../../../redux/constants/orderConstants";

const AdminOrders = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()

    //load deletion
  const [load , setLoad] = useState(false)
    
    const {orders,loading} = useSelector(state => state.allOrders)

    const {isDeleted} = useSelector(state => state.orderAdmin)

    useEffect(()=>{

      if(isDeleted){
        alert.success('Order Deleted')
        setLoad(false)
        dispatch({type : DELETE_ORDER_RESET})
      }

      dispatch(getAllOrders())

    },[dispatch,isDeleted])

    const columns = [
      { field: "id", headerName: "Order ID", minWidth: 200, flex: 0.8 },
  
      {field: "status", headerName: "Status",minWidth: 100,flex: 1,
      cellClassName : (params) =>{
        return params.getValue(params.id , "status") === "Delivered"
        ? "greenColor"
        : params.getValue(params.id , "status") === "Shipped"
        ? "blueColor"
        : "redColor"
      }},
  
      {field: "qty",headerName: "Items Qty", minWidth: 50,flex: 0.5,}, 
  
      {field: "amount",headerName: "Amount", minWidth: 100,flex: 0.3,type:'number'},
  
      {field: "actions",headerName: "Actions",minWidth: 150, flex: 0.3,sortable: false,type:'number',
        renderCell: (params) => {
          return (
            <>
              <Button onClick={() => {
                dispatch(orderDetails(params.getValue(params.id, "id")));
                navigate(`/admin/order/${params.getValue(params.id, "id")}`);
              }}>
                <EditIcon style={{color:'chartreuse'}}/>
              </Button>
  
              <Button
                onClick={() => {
                  setLoad(true);
                  dispatch(deleteOrder(params.getValue(params.id, "id")));
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

    orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        qty: item.orderItems.length,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });


    return (
        <>
        <Helmet>
        <title>All Orders</title>
      </Helmet>
      <div className="admin_container">
        <div className="sidebar">
          <Sidebar active="Orders" />
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
    )
}

export default AdminOrders
