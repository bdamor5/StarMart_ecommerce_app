import React from 'react'
import {Outlet,Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useAlert} from 'react-alert'

const ProtectedRoute = () => {

    const {loading,isAuthenticated,user} = useSelector(state => state.user)

    const alert = useAlert()

    if(loading === false){

        if(isAuthenticated === false){
            alert.error("Please Login To Access This Resource")
            return <Navigate to="/login_register"/>

        }else {
            
            return <Outlet/>
        }

    }

    return (<></>)
            
}
export default ProtectedRoute
