import {SUBMIT_REVIEW_REQUEST,SUBMIT_REVIEW_SUCCESS,SUBMIT_REVIEW_FAIL,SUBMIT_REVIEW_RESET,CLEAR_ERRORS, ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, ALL_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_RESET} from '../constants/reviewConstants'

export const submitReview = (state = {}, action) => {
  switch (action.type) {
    case SUBMIT_REVIEW_REQUEST:
      return {
          ...state,
          loading:true
      };

    case SUBMIT_REVIEW_SUCCESS:
      return {
          loading:false,
          success : action.payload
      };

    case SUBMIT_REVIEW_FAIL:
      return {
          ...state,
          loading:false,
          error : action.payload
      };

    case SUBMIT_REVIEW_RESET:
      return {
          ...state,
          success : false
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

//////////////////////////////////////////////////

//get all reviews by admin
export const allReviews = (state = {reviews : []}, action) =>{
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case ALL_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}


//delete a review by admin
export const deleteReview = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    default:
      return state;
  }
};