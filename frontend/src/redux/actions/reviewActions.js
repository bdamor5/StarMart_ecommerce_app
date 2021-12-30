import {SUBMIT_REVIEW_REQUEST,SUBMIT_REVIEW_SUCCESS,SUBMIT_REVIEW_FAIL,SUBMIT_REVIEW_RESET,CLEAR_ERRORS, ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, ALL_REVIEW_FAIL, DELETE_REVIEW_FAIL, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_REQUEST} from '../constants/reviewConstants'
import axios from "axios";

//create new review
export const submitNewReview = (review) => async (dispatch) => {
  try {
    dispatch({ type: SUBMIT_REVIEW_REQUEST });

    const { data } = await axios.put("/api/product/review/new", review, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: SUBMIT_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: SUBMIT_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//to clear all errors
export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
  };

  /////////////////////////////////////////

  //get all reviews by admin
  export const getAllReviews = (productId) => async (dispatch) => {
    try {
      dispatch({ type: ALL_REVIEW_REQUEST });

      console.log(productId)
  
      const { data } = await axios.get(`/api/product/reviews/${productId}`);
  
      dispatch({
        type: ALL_REVIEW_SUCCESS,
        payload: data.reviews,
      });
    } catch (error) {
      dispatch({
        type: ALL_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  //to delete a review by admin
  export const deleteReviews = (reviewId, productId) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_REVIEW_REQUEST });

      console.log(reviewId)
      console.log(productId)
  
      const { data } = await axios.delete(
        `/api/product/reviews/delete/${reviewId}/${productId}`
      );
  
      dispatch({
        type: DELETE_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };