import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
  } from '../actions/types';

  // import AsyncStorage from '@react-native-async-storage/async-storage';

  // const storeToken = async (value) => {
  //   try {
  //     await AsyncStorage.setItem('token', value)
  //   } catch (e) {
  //     // saving error
  //   }
  // }

  // const getToken = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('token')
  //     if(value !== null) {
  //       // value previously stored
  //       return value
  //     }
  //   } catch(e) {
  //     // error reading value
  //     console.log(e)
  //     return null;
  //   }
  // }

  // const removeToken = async () => {
  //   try {
  //     await AsyncStorage.removeItem('token')
  //   } catch(e) {
  //     // remove error
  //   }
  
  //   console.log('Done.')
  // }

  const initialState = {
    token: null,
    isAuthenticated: null,
    isLoading: false,
    user: null
  };
  
   function authReducer(state = initialState, action) {
    switch (action.type) {
      case USER_LOADING:
        return {
          ...state,
          isLoading: true
        };
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload
        };
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          isLoading: false
        };
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT_SUCCESS:
      case REGISTER_FAIL:
        // localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false
        };
      default:
        return state;
    }
  }

  export default authReducer;