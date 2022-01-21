import axios from "axios";
import {
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  EDIT_USER,
  MARK_USER_NOTIFICATION_AS_READ,
  IS_LOADING,
  FINISHED_LOADING,
} from "./types";
import { tokenConfig } from "./authActions";
import { logout, loadUser } from "./authActions";
// import { sendNotification } from "../helper/notifier";

// import { IItem } from '../../types/interfaces';
import { URL } from "../constants/constants";

export const getUsers = () => (dispatch, getState) => {
  // console.log("inside actions")
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .get(URL+"/api/users", tokenConfig(getState))
    .then((res) => {
      // console.log(res)
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });

      // sendNotification('Users fetched Successfully','success');
    })
    .catch((err) =>{
      console.log(err)
    }
    );
};

export const addUser = (user, navigation) => (dispatch, getState) => {
  // console.log(user)
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .post(URL+"/api/users", user, tokenConfig(getState))
    .then((res) => {
      // console.log(res)
      dispatch({
        type: ADD_USER,
        payload: res.data,
      });

      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      // sendNotification("User Added Successfully", "success");
    })
    .catch((err) =>
    {
      console.log(err.response.data)
    }    )
    .finally(()=>{
      if(navigation){
        navigation.goBack()
      }
    })
};

export const editUser = (user, reloadUser,navigation) => (dispatch, getState) => {
  const id = user.id;
  delete user.id;
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .put(URL+"/api/users/" + id, user, tokenConfig(getState))
    .then((res) => {
      // console.log(res)
      dispatch({
        type: EDIT_USER,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      // sendNotification("User Edited Successfully", "success");

      if (reloadUser) {
        // console.log("user reloaded");
        dispatch(loadUser());
      }
    })
    .catch((err) =>
    {
      console.log(err)
    }    )
    .finally(()=>{
      if(navigation){
        navigation.goBack()
      }
    })
};

export const markUserNotificationAsRead = (user, notification) => (
  dispatch,
  getState
) => {
  const id = user.id;
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .put(
      URL+`/api/users/${id}/mark-notification-read`,
      { notification },
      tokenConfig(getState)
    )
    .then((res) => {
      // console.log(res)
      dispatch({
        type: MARK_USER_NOTIFICATION_AS_READ,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      // sendNotification('User Edited Successfully','success');
    })
    .catch((err) =>
    {
      console.log(err)
    }    );
};

export const deleteUser = (user) => (dispatch, getState) => {
  // console.log("inside actions")
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .delete(URL+"/api/users/" + user.id, tokenConfig(getState))
    .then((res) => {
      // console.log(res)
      dispatch({
        type: DELETE_USER,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      // sendNotification("User Deleted Successfully", "success");
    })
    .catch((err) =>
    {
      console.log(err)
    }    );
};

export const changePassword = (creds) => (dispatch, getState) => {
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .post(URL+"/api/auth/change-password", creds, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      // console.log(res)
      dispatch(logout());
      // sendNotification(
      //   "Password changed successfully, please log in again",
      //   "success"
      // );
    })
    .catch((err) =>
    {
      console.log(err)
    }    );
};
