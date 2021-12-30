import axios from 'axios'
import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    CLEAR_ERRORS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    FORGOT_PW_REQUEST,
    FORGOT_PW_SUCCESS,
    FORGOT_PW_FAIL,
    RESET_PW_REQUEST,
    RESET_PW_SUCCESS,
    RESET_PW_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAIL,
    EDIT_USER_RESET,
    CHANGE_PW_REQUEST,
    CHANGE_PW_SUCCESS,
    CHANGE_PW_FAIL,
    CHANGE_PW_RESET,
    ADMIN_ALL_USERS_REQUEST,
    ADMIN_ALL_USERS_SUCCESS,
    ADMIN_ALL_USERS_FAIL,
    ADMIN_USER_DETAILS_REQUEST,
    ADMIN_USER_DETAILS_SUCCESS,
    ADMIN_USER_DETAILS_FAIL,
    ADMIN_UPDATE_REQUEST,
    ADMIN_UPDATE_SUCCESS,
    ADMIN_UPDATE_RESET,
    ADMIN_UPDATE_FAIL,
    ADMIN_DELETE_REQUEST,
    ADMIN_DELETE_SUCCESS,
    ADMIN_DELETE_RESET,
    ADMIN_DELETE_FAIL,
  } from "../constants/userConstants";


//register user
export const register = (user) => async(dispatch) =>{
    try {
        dispatch({type:REGISTER_USER_REQUEST})

        const {data} = await axios.post('/api/user/register',user,{
            headers:{
                "Content-Type" : "multipart/form-data"
            }
        })

        dispatch({type:REGISTER_USER_SUCCESS , payload:data.user})
        
    } catch (error) {
        dispatch({type:REGISTER_USER_FAIL , payload:error.response.data.message})
    }
}

//clearing errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };    

//logged in user details
export const userDetails = () => async(dispatch) =>{
    try {
        dispatch({type:LOAD_USER_REQUEST})

        const {data} = await axios.get('/api/user/me')

        dispatch({type:LOAD_USER_SUCCESS , payload:data.user})
        
    } catch (error) {
        dispatch({type:LOAD_USER_FAIL , payload:error.response.data.message})
    }
}

//log out user
export const logout = () => async(dispatch) =>{
    try {

        await axios.get('/api/user/logout')

        dispatch({type:LOGOUT_USER_SUCCESS})
        
    } catch (error) {
        dispatch({type:LOGOUT_USER_FAIL , payload:error.response.data.message})
    }
}

//login 
export const login = (email,password) => async(dispatch) =>{
    try {
        dispatch({type:LOGIN_USER_REQUEST})

        const {data} = await axios.post('/api/user/login',{email,password},{
            headers:{
                "Content-Type" : "application/json"
            }
        })

        dispatch({type:LOGIN_USER_SUCCESS , payload:data.user})
        
    } catch (error) {
        dispatch({type:LOGIN_USER_FAIL , payload:error.response.data.message})
    }
}

//forgot pw
export const forgotpw = (email) => async(dispatch) =>{
    try {
        dispatch({type:FORGOT_PW_REQUEST})

        const {data} = await axios.post('/api/user/password/forgot',email,{
            headers:{
                "Content-Type" : "application/json"
            }
        })

        dispatch({type:FORGOT_PW_SUCCESS , payload:data.success})
        
    } catch (error) {
        dispatch({type:FORGOT_PW_FAIL , payload:error.response.data.message})
    }
}

//reset pw
export const resetpw = (token,passwords) =>async(dispatch) =>{
    try {
        dispatch({type:RESET_PW_REQUEST})

        const {data} = await axios.put(`/api/user/password/reset/${token}`,passwords,{
            headers:{
                "Content-Type" : "application/json"
            }
        })

        dispatch({type:RESET_PW_SUCCESS , payload:data.success})
        
    } catch (error) {
        dispatch({type:RESET_PW_FAIL , payload:error.response.data.message})
    }
}

//delete user profile
export const deleteUser = () =>async(dispatch) =>{
    try {
        dispatch({type:DELETE_USER_REQUEST})

        const {data} =  await axios.delete('/api/user/me/delete')

        dispatch({type:DELETE_USER_SUCCESS,payload:data.success})
        
    } catch (error) {
        dispatch({type:DELETE_USER_FAIL , payload:error.response.data.message})
    }
}

//edit user profile
export const editUser = (user) => async(dispatch) =>{
    try {
        dispatch({type:EDIT_USER_REQUEST})

        const {data} = await axios.put('/api/user/me/update',user,{
            headers:{
                "Content-Type" : "multipart/form-data"
            }
        })

        dispatch({type:EDIT_USER_SUCCESS , payload:data.user})
        
    } catch (error) {
        dispatch({type:EDIT_USER_FAIL , payload:error.response.data.message})
    }
}

//change password
export const changepw = (passwords) =>async(dispatch) =>{
    try {
        dispatch({type:CHANGE_PW_REQUEST})

        const {data} = await axios.put('/api/user/me/update-password',passwords,{
            headers:{
                "Content-Type" : "application/json"
            }
        })

        dispatch({type:CHANGE_PW_SUCCESS , payload:data.success})
        
    } catch (error) {
        dispatch({type:CHANGE_PW_FAIL , payload:error.response.data.message})
    }
}

////////////////////////////////////////////////

//get all users by admin
export const allUsersAdmin = () => async(dispatch) =>{
    try {

        dispatch({type : ADMIN_ALL_USERS_REQUEST})

        const {data} = await axios.get('/api/user/admin/all-users');

        dispatch({type : ADMIN_ALL_USERS_SUCCESS , payload : data.users})
        
    } catch (error) {

        dispatch({type : ADMIN_ALL_USERS_FAIL , error :error.response.data.message })
        
    }
}

//get single user by admin
export const singleUserAdmin = (id) => async(dispatch) =>{
    try {

        dispatch({type : ADMIN_USER_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/user/admin/user/${id}`);

        dispatch({type : ADMIN_USER_DETAILS_SUCCESS , payload : data.user})
        
    } catch (error) {

        dispatch({type : ADMIN_USER_DETAILS_FAIL , error :error.response.data.message })
        
    }
}

//update user by admin
export const updateUserAdmin = (id,user) => async(dispatch) =>{
    try {

        dispatch({type : ADMIN_UPDATE_REQUEST})

        await axios.put(`/api/user/admin/user/${id}`,user,{
            headers:{
                "Content-Type" : "application/json"
            }
        });

        dispatch({type : ADMIN_UPDATE_SUCCESS})
        
    } catch (error) {

        dispatch({type : ADMIN_UPDATE_FAIL , error :error.response.data.message })
    }
}

//update user role by admin
export const deleteUserAdmin = (id) => async(dispatch) =>{
    try {

        dispatch({type : ADMIN_DELETE_REQUEST})

        await axios.delete(`/api/user/admin/user/${id}`);

        dispatch({type : ADMIN_DELETE_SUCCESS})
        
    } catch (error) {

        dispatch({type : ADMIN_DELETE_FAIL , error :error.response.data.message })
    }
}