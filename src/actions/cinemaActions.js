import axios from "axios";
import {
  GET_CINEMAS,
  EDIT_CINEMA,
  DELETE_CINEMA,
  ADD_CINEMA,
  IS_LOADING,
  FINISHED_LOADING,
} from "./types";
import { tokenConfig } from "./authActions";
// import { sendNotification } from "../helper/notifier";
import { URL } from "../constants/constants";

// import { IItem } from '../../types/interfaces';

export const getCinemas = () => (dispatch, getState) => {
  // console.log("inside actions")
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .get(URL+"/api/cinemas", tokenConfig(getState))
    .then((res) => {
      // console.log(res)
      dispatch({
        type: GET_CINEMAS,
        payload: res.data,
      });

      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      // sendNotification('Users fetched Successfully','success');
    })
    .catch((err) =>
console.log(err)
);
};

export const addCinema = (cinema,navigation) => (dispatch, getState) => {
  // console.log(cinema)
  dispatch({
    type: IS_LOADING,
    payload: true,
  });

  const files = cinema.certificates;
  delete cinema.certificates;

  const formData = new FormData();
  Object.keys(cinema).forEach((key) => formData.append(key, cinema[key]));

  if (files) {
    for (var x = 0; x < files.length; x++) {
      let file = files[x]
      file.uri = Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
      formData.append("certificates", file);
    }
  }

  axios
    .post(URL+"/api/cinemas", formData, tokenConfig(getState))
    .then((res) => {
      // console.log(res)
      dispatch({
        type: ADD_CINEMA,
        payload: res.data,
      });

      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });

      // sendNotification("Cinema Added Successfully", "success");
    })
    .catch((err) =>
    console.log(err)
    )   .finally(()=>{
      if(navigation){
        navigation.goBack()
      }
    })
};

export const editCinema = (cinema,navigation) => (dispatch, getState) => {
  const id = cinema.id;
  delete cinema.id;

  dispatch({
    type: IS_LOADING,
    payload: true,
  });

  const files = cinema.certificates;
  // delete cinema.certificates;

  // const formData = new FormData();
  // Object.keys(cinema).forEach((key) => formData.append(key, cinema[key]));

  // console.log(cinema)
  // if (files) {
  //   for (var x = 0; x < files.length; x++) {
  //     let file = files[x]
  //     file.uri = Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
  //     formData.append("certificates", file);
  //   }
  // }
  // formData.append("certificates", [])
  // console.log(formData)
  axios
    .put(URL+"/api/cinemas/" + id, cinema, tokenConfig(getState))
    .then((res) => {
      // console.log(res)
      dispatch({
        type: EDIT_CINEMA,
        payload: res.data,
      });

      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      // sendNotification("Cinema Edited Successfully", "success");
    })
    .catch((err) =>
    console.log(err.response.data)
    ).finally(()=>{
      if(navigation){
        navigation.goBack()
      }
    })
};

export const deleteCinema = (cinema) => (dispatch, getState) => {
  // console.log("inside actions")
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .delete(URL+"/api/cinemas/" + cinema.id, tokenConfig(getState))
    .then((res) => {
      // console.log(res)
      dispatch({
        type: DELETE_CINEMA,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      // sendNotification("Cinema Deleted Successfully", "success");
    })
    .catch((err) =>
    console.log(err)
    );
};
