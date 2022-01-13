import axios from "axios";
import {
  GET_COUNTRIES,
  GET_COUNTRY,
  EDIT_COUNTRY,
  DELETE_COUNTRY,
  ADD_COUNTRY,
  IS_LOADING,
  FINISHED_LOADING,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import { sendNotification } from "../helper/notifier";
import { URL } from "../constants/constants";

// import { IItem } from '../../types/interfaces';

export const getCountries = () => (dispatch, getState) => {
  // console.log("inside actions")
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .get(URL+"/api/countries", tokenConfig(getState))
    .then((res) => {
      // console.log(res)
      dispatch({
        type: GET_COUNTRIES,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });

      // sendNotification('Users fetched Successfully','success');
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addCountry = (country) => (dispatch, getState) => {
  // console.log(country)
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .post(URL+"/api/countries", country, tokenConfig(getState))
    .then((res) => {
      // console.log(res)
      dispatch({
        type: ADD_COUNTRY,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });

      sendNotification("Country Added Successfully", "success");
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status, true))
    );
};

export const editCountry = (country) => (dispatch, getState) => {
  const id = country.id;
  delete country.id;
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .put(URL+"/api/countries/" + id, country, tokenConfig(getState))
    .then((res) => {
      // console.log(res)
      dispatch({
        type: EDIT_COUNTRY,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      sendNotification("Country Edited Successfully", "success");
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status, true))
    );
};

export const deleteCountry = (country) => (dispatch, getState) => {
  // console.log("inside actions")
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .delete(URL+"/api/countries/" + country.id, tokenConfig(getState))
    .then((res) => {
      // console.log(res)
      dispatch({
        type: DELETE_COUNTRY,
        payload: res.data,
      });
      dispatch({
        type: FINISHED_LOADING,
        payload: true,
      });
      sendNotification("Country Deleted Successfully", "success");
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status, true))
    );
};
