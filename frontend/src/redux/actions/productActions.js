import axios from 'axios'
import {
    CLEAR_ERRORS,
    FETCH_ALL_PRODUCTS_FAIL,
    FETCH_ALL_PRODUCTS_REQUEST,
    FETCH_ALL_PRODUCTS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    BADGE_COUNT,
    UPDATE_BADGE_COUNT,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,
    UPDATE_PRODUCT_SUCCESS
  } from "../constants/productConstants";
  
//to fetch all products
export const getAllProducts = (keyword = "" , currentPage = 1 , price=[0,50000],category,ratings=0,sortPrice='',sortRatings='') => async(dispatch) =>{
    try{
        dispatch({type:FETCH_ALL_PRODUCTS_REQUEST});

        let link = `/api/product/all?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&sortPrice=${sortPrice}&sortRatings=${sortRatings}`

        if(category){
            link = `/api/product/all?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}&sortPrice=${sortPrice}&sortRatings=${sortRatings}`
        }

        const {data} = await axios.get(link)

        dispatch({type:FETCH_ALL_PRODUCTS_SUCCESS,payload:data})
        
    }catch(error){
        dispatch({type: FETCH_ALL_PRODUCTS_FAIL,payload: error.response.data.message});
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({type : CLEAR_ERRORS});
  };

  //get product details
  export const getProductDetails = (id) => async(dispatch) =>{
      try {
        dispatch({type:PRODUCT_DETAILS_REQUEST});

        const {data} = await axios.get(`/api/product/${id}`)

        dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data.product})
        
    }catch(error){
        dispatch({type: PRODUCT_DETAILS_FAIL,payload: error.response.data.message});
  }
}

export const getBadgeCount = () => (dispatch) =>{

    var count;

    if(localStorage.getItem("cartItems") === null){

        count = 0
    }else{

    count = JSON.parse(localStorage.getItem("cartItems")).length;

    }

    dispatch({type : BADGE_COUNT , payload : count})
}

export const updateBadgeCount = (count) =>(dispatch) =>{
    dispatch({type : UPDATE_BADGE_COUNT, payload : count})
}

/////////////////////////////////////////////

//get all products admin
export const getAdminProducts = () => async(dispatch) =>{
    try{
        dispatch({type:ADMIN_PRODUCT_REQUEST});

        const {data} = await axios.get('/api/product/admin/products')

        dispatch({type:ADMIN_PRODUCT_SUCCESS,payload:data.products})
        
    }catch(error){
        dispatch({type: ADMIN_PRODUCT_FAIL,payload: error.response.data.message});
    }
}

//create product admin
export const createProduct = (product) => async(dispatch) => {
    try {
        dispatch({type : NEW_PRODUCT_REQUEST})

        const {data} = await axios.post('/api/product/admin/product/new',product,{
            headers:{
                "Content-Type" : "multipart/form-data" 
            }
        })

        dispatch({type : NEW_PRODUCT_SUCCESS})
        
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
          });
    }
}

//update product admin
export const updateProduct = (id,product) => async(dispatch) => {
    try {
        dispatch({
            type: UPDATE_PRODUCT_REQUEST,
          });

          const {data} = await axios.put(`/api/product/admin/product/${id}`,product,{
            headers:{
                "Content-Type" : "multipart/form-data" 
            }
        })

          dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success,
          });
        
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message,
          });
    }
}

//delete product admin
export const deleteProduct = (id) => async (dispatch) => {
    try {
      dispatch({
        type: DELETE_PRODUCT_REQUEST
      });
  
       const {data} = await axios.delete(`/api/product/admin/product/${id}`);
  
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: data.success,
      });
      
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

