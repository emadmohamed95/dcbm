import axios from "axios";
import {
  GET_DISTRIBUTORS_ACTIONS,
  IS_LOADING,
  FINISHED_LOADING,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import { sendNotification } from "../helper/notifier";

// import { IItem } from '../../types/interfaces';
import { URL } from "../constants/constants";

export const getDistributorsActions = () => (dispatch, getState) => {
  // console.log("inside actions")
  dispatch({
    type: IS_LOADING,
    payload: true,
  });
  axios
    .get(URL+"/api/reports/distributors-actions", tokenConfig(getState))
    .then((res) => {
      // console.log(res)
      dispatch({
        type: GET_DISTRIBUTORS_ACTIONS,
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
