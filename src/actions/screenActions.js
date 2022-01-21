import axios from "axios";
import {
  GET_SCREENS,
  EDIT_SCREEN,
  DELETE_SCREEN,
  ADD_SCREEN,
  IS_LOADING,
  FINISHED_LOADING,
  GET_CINEMAS,
} from "./types";
import { tokenConfig } from "./authActions";
// import { sendNotification } from "../helper/notifier";
import { getCinemas } from "./cinemaActions";
import { URL } from "../constants/constants";
import { handleError } from "../helper/errorHandler";

// import { IItem } from '../../types/interfaces';

export const getScreens = () => (dispatch, getState) => {
  // console.log("inside actions")
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .get(URL+"/api/screens", tokenConfig(getState))
    .then((res) => {
      // console.log(res)
      dispatch({
        type: GET_SCREENS,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      // sendNotification('Users fetched Successfully','success');
    })
    .catch((err) =>
    handleError(err)
    );
};

export const addScreen = (screen,navigation) => (dispatch, getState) => {
  // console.log(screen)

  // const {serverCertificate} = screen;

  // const file = new FormData()
  //  file.append('serverCertificate', serverCertificate)

  //  const finalScreen = {...screen, ...{serverCertificate:file}}

  //  console.log(finalScreen);


  // if (files) {
  //   for (var x = 0; x < files.length; x++) {
  //     let file = files[x]
  //     file.uri = Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
  //     formData.append("certificates", file);
  //   }
  // }

  screen.serverCertificate.uri = Platform.OS === 'android' ? screen.serverCertificate.uri : screen.serverCertificate.uri.replace('file://', '')

  const formData = new FormData();
  Object.keys(screen).forEach((key) => formData.append(key, screen[key]));
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .post(URL+"/api/screens", formData, tokenConfig(getState))
    .then((res) => {
      // console.log(res)
      dispatch({
        type: ADD_SCREEN,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      dispatch(getCinemas());

      // sendNotification("Screen Added Successfully", "success");
    })
    .catch((err) =>
    handleError(err)
    ) .finally(()=>{
      if(navigation){
        navigation.goBack()
      }
    })
};

export const editScreen = (screen,navigation) => (dispatch, getState) => {
  const id = screen.id;
  delete screen.id;

  // const formData = new FormData();
  // Object.keys(screen).forEach((key) => formData.append(key, screen[key]));

  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .put(URL+"/api/screens/" + id, screen, tokenConfig(getState))
    .then((res) => {
      // console.log(res)
      dispatch({
        type: EDIT_SCREEN,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      dispatch(getCinemas());
      // sendNotification("Screen Edited Successfully", "success");
    })
    .catch((err) =>
    handleError(err)
    ) .finally(()=>{
      if(navigation){
        navigation.goBack()
      }
    })
};

export const deleteScreen = (screen) => (dispatch, getState) => {
  // console.log("inside actions")
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .delete(URL+"/api/screens/" + screen.id, tokenConfig(getState))
    .then((res) => {
      // console.log(res)
      dispatch({
        type: DELETE_SCREEN,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      dispatch(getCinemas());
      // sendNotification("Screen Deleted Successfully", "success");
    })
    .catch((err) =>
    handleError(err)
    );
};
