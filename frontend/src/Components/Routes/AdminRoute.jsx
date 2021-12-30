import React from 'react'
import {Outlet,Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useAlert} from 'react-alert'

const AdminRoute = () => {

    const {loading,isAuthenticated,user} = useSelector(state => state.user)

    const alert = useAlert()

    if(loading === false){

        if(isAuthenticated === false || user.role !== 'admin'){
            alert.error("User Not Authorized To Access This Resource")
            return <Navigate to="/"/>

        }else {

            return <Outlet/>
        }
        
    }

    return (<></>)
    
            
}
export default AdminRoute
