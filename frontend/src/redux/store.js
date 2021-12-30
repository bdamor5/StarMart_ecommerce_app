import {createStore , combineReducers , applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from 'redux-devtools-extension'

//reducers
import {userMethodsReducer,Password,userProfile,allUsers,singleUser,userByAdmin} from './reducers/userReducers'
import { AllProducts, getProductDetails,badgeCount,getProducts,createProduct,productAdmin } from "./reducers/productReducers"
import {submitReview,allReviews,deleteReview} from './reducers/reviewReducers'
import {createNewOrder,myOrders,allOrders,orderDetails,orderAdmin} from './reducers/orderReducers'

//rootreducer
const rootReducer = combineReducers({
    user : userMethodsReducer,
    password : Password,
    userProfile,
    getProducts : AllProducts,
    productDetails : getProductDetails,
    submitReview,
    badgeCount,
    createNewOrder,
    myOrders,
    allUsers,
    singleUser,
    userByAdmin,
    getAdminProducts : getProducts,
    createProduct,
    productAdmin,
    allReviews,
    deleteReview,
    allOrders,
    orderDetails,
    orderAdmin
})

const middleware = [thunk];

let initialState=  {

}

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;
