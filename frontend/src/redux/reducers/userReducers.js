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

//register,user details,login
export const userMethodsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
    case LOGIN_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case REGISTER_USER_FAIL:
    case LOAD_USER_FAIL:
    case LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
      };

    case LOGOUT_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // case LOAD_USER_FAIL:
    //         return {
    //               loading: false,
    //               isAuthenticated: false,
    //               user: null,
    //               error: action.payload,
    //         };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//forgot password , reset password , change password
export const Password = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PW_REQUEST:
    case RESET_PW_REQUEST:
    case CHANGE_PW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FORGOT_PW_SUCCESS:
    case RESET_PW_SUCCESS:
    case CHANGE_PW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case CHANGE_PW_RESET:
      return {
        ...state,
        success: false,
      };

    case FORGOT_PW_FAIL:
    case RESET_PW_FAIL:
    case CHANGE_PW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//update & delete user
export const userProfile = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return {
        loading: true,
      };

    case DELETE_USER_SUCCESS:
      return {
        loading: false,
      };

    case DELETE_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case EDIT_USER_REQUEST:
      return {
        loading: true,
        isEdited: false,
      };

    case EDIT_USER_SUCCESS:
      return {
        loading: false,
        isEdited: true,
      };

    case EDIT_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
        isEdited: false,
      };

    case EDIT_USER_RESET:
      return {
        ...state,
        isEdited: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//////////////////////////////////////////////////////

//all users by admin
export const allUsers = (state = { users: [] }, action) => {
  switch (action.type) {
    case ADMIN_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case ADMIN_ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//single user by admin
export const singleUser = (state = { user: {} }, action) => {
  switch (action.type) {
    case ADMIN_USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case ADMIN_USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//update & delete user by admin
export const userByAdmin = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_REQUEST:
    case ADMIN_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMIN_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: true,
      };

    case ADMIN_UPDATE_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case ADMIN_UPDATE_FAIL:
    case ADMIN_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADMIN_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: true,
      };

    case ADMIN_DELETE_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
