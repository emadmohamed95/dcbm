import axios from 'axios';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  IS_LOADING,
  FINISHED_LOADING
} from './types';

import { URL } from "../constants/constants";

import { handleError } from '../helper/errorHandler';
import { sendNotification } from './notificationActions';



// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  // console.log('loaduser'+ tokenConfig(getState))

  axios
    .get(URL+'/api/auth/user', tokenConfig(getState))
    .then(res =>
      // setTimeout(() => {
        dispatch({
          type: USER_LOADED,
          payload: res.data
        })
      // }, 5000)
      
    )
    .catch(err => {
      // handleError(err)

      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Login User
export const login = (creds) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
//   const body = JSON.stringify(creds);

console.log(URL+'/api/auth/login')

dispatch({
  type: IS_LOADING,
  payload: true,
});

  axios
    .post(URL+'/api/auth/login', creds, config)
    .then(res =>{
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })

      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
    }
    )
    .catch(err => {
      handleError(err)
      // sendNotification("Login Failed", "error")
      dispatch({
        type: LOGIN_FAIL
      });

      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const logoutError = () => dispatch => {
  dispatch({
    type: LOGOUT_SUCCESS
  });

}



// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};



// Setup config/headers and token
export const nonStatetokenConfig = (token) => {
  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};