import React, { useState, useEffect } from "react";
import './AdminProducts.css'
import Sidebar from "../Sidebar/Sidebar";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import {DataGrid} from '@mui/x-data-grid'
import {Button} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAlert} from 'react-alert'
import {useNavigate} from 'react-router-dom'
import { deleteProduct, getAdminProducts, getProductDetails } from "../../../redux/actions/productActions";
import { DELETE_PRODUCT_RESET } from "../../../redux/constants/productConstants";

const AdminProducts = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()

  //load deletion
  const [load , setLoad] = useState(false)
  
  const {isDeleted} = useSelector(state => state.productAdmin)

  useEffect(()=>{

    if(isDeleted){
      alert.success('Product Deleted')
      dispatch({type : DELETE_PRODUCT_RESET})
      setLoad(false)
    }

    dispatch(getAdminProducts())
  },[dispatch,isDeleted])

  const {products,loading} = useSelector(state => state.getAdminProducts)

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 120, flex: 0.8 },

    {field: "name", headerName: "Name",minWidth: 200,flex: 1,},

    {field: "stock",headerName: "Stock", minWidth: 50,flex: 0.5,},

    {field: "category",headerName: "category", minWidth: 50,flex: 0.5,},  

    {field: "price",headerName: "Price", minWidth: 50,flex: 0.3,type:'number'},

    {field: "actions",headerName: "Actions",minWidth: 150, flex: 0.3,sortable: false,type:'number',
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => {dispatch(getProductDetails(params.getValue(params.id, "id")));navigate(`/admin/product/${params.getValue(params.id, "id")}`);}}>
              <EditIcon style={{color:'chartreuse'}}/>
            </Button>

            <Button
              onClick={() => {
                setLoad(true);
                dispatch(deleteProduct(params.getValue(params.id, "id")));
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

    products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        category:item.category,
        price: item.price,
        name: item.name,
      });
    });

    return (
        <>
        <Helmet>
        <title>All Products</title>
      </Helmet>
      <div className="admin_container">
        <div className="sidebar">
          <Sidebar active="Products" />
        </div>
        <div className="dashboard">
        <div className="newProductBtn" onClick={() => navigate('/admin/product/new')}>New Product</div>
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

export default AdminProducts
