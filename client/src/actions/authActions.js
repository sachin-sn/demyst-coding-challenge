import axios from "axios";
import { storeToLocalStorage } from "../service";

// Creating actions for each of the reducers
const baseUrl = "http://localhost:3030/api/org";
const authActions = {
  LOGIN_REQUESTED: "LOGIN_REQUESTED",
  LOGIN_SUCCESSFUL: "LOGIN_SUCCESSFUL",
  LOGIN_FAILED: "LOGIN_FAILED",
  LOGUT_REQUESTED: "LOGUT_REQUESTED",
  GET_ALL_USERS: "GET_ALL_USERS",
  GET_ALL_USERS_FAILED: "GET_ALL_USERS_FAILED",

  Login: (dispatch, userName, password) => {
    dispatch({ type: "LOGIN_REQUESTED" });
    axios
      .get(`${baseUrl}/auth?email=${userName}&password=${password}`)
      .then((response) => {
        dispatch({
          type: "LOGIN_SUCCESSFUL",
          org: response.data.org,
          isAuth: response.data.isAuth,
        });
        storeToLocalStorage("org", response.data.org);
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FAILED" });
      });
  },
  getAllUsers: (dispatch) => {
    axios
      .get(`${baseUrl}/all`)
      .then((response) => {
        dispatch({
          type: "GET_ALL_USERS",
          orgs: response.data.orgs,
        });
      })
      .catch((error) => {
        dispatch({ type: "GET_ALL_USERS_FAILED" });
      });
  },
};

export default authActions;
