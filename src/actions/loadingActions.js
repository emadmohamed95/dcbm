import axios from "axios";
import {
  IS_LOADING,
  FINISHED_LOADING,
  IS_LOADING_IN_DIALOG,
  FINISHED_LOADING_IN_DIALOG
} from "./types";


export const startLoading = () => (dispatch, getState) => {
    // console.log("inside actions")
    dispatch({
      type: IS_LOADING,
      payload: true,
    });
  };


  export const finishLoading = () => (dispatch, getState) => {
    // console.log("inside actions")
    dispatch({
      type: FINISHED_LOADING,
      payload: true,
    });
  };


  
export const startLoadingInDialog = () => (dispatch, getState) => {
    // console.log("inside actions")
    dispatch({
      type: IS_LOADING_IN_DIALOG,
      payload: true,
    });
  };


  export const finishLoadingInDialog = () => (dispatch, getState) => {
    // console.log("inside actions")
    dispatch({
      type: FINISHED_LOADING_IN_DIALOG,
      payload: true,
    });
  };