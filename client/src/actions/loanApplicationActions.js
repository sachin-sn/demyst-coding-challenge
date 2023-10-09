import axios from "axios";

// Creating actions for each of the reducers
const baseUrl = "http://localhost:3030/api";
const loanApplicationActions = {
  NEW_APPLICATION_REQUEST: "NEW_APPLICATION_REQUEST",
  NEW_APPLICATION_SUCCESS: "NEW_APPLICATION_SUCCESS",
  NEW_APPLICATION_FAILED: "NEW_APPLICATION_FAILED",
  UPDATE_APPLICATION_REQUEST: "UPDATE_APPLICATION_REQUEST",
  UPDATE_APPLICATION_SUCCESS: "UPDATE_APPLICATION_SUCCESS",
  UPDATE_APPLICATION_FAILED: "UPDATE_APPLICATION_FAILED",
  GET_APPLICATION_REQUEST: "GET_APPLICATION_REQUEST",
  GET_APPLICATION_SUCCESS: "GET_APPLICATION_SUCCESS",
  GET_APPLICATION_FAILED: "GET_APPLICATION_FAILED",
  GET_ALL_APPLICATION_REQUEST: "GET_ALL_APPLICATION_REQUEST",
  GET_ALL_APPLICATION_SUCCESS: "GET_ALL_APPLICATION_SUCCESS",
  GET_ALL_APPLICATION_FAILED: "GET_ALL_APPLICATION_FAILED",
  GET_BALANCE_SHEET_REQUEST: "GET_BALANCE_SHEET_REQUEST",
  GET_BALANCE_SHEET_SUCCESS: "GET_BALANCE_SHEET_SUCCESS",
  GET_BALANCE_SHEET_FAILED: "GET_BALANCE_SHEET_FAILED",
  newApplication: (dispatch, email, history) => {
    const date = new Date();
    const body = {
      application: {
        email,
        createdDate: `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
        status: "new",
      },
    };
    dispatch({ type: "NEW_APPLICATION_REQUEST" });
    axios
      .post(`${baseUrl}/loan/new`, body)
      .then((response) => {
        const application = response.data.application;
        dispatch({
          type: "NEW_APPLICATION_SUCCESS",
          application,
        });
        history(`/Loan?id${application.applicationId}`);
      })
      .catch((error) => {
        dispatch({ type: "NEW_APPLICATION_FAILED" });
      });
  },
  updateApplication: (dispatch, application) => {
    const date = new Date();
    const body = {
      application: {
        ...application,
        updatedDate: `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
      },
    };
    dispatch({ type: "UPDATE_APPLICATION_REQUEST" });
    axios
      .post(`${baseUrl}/loan/update`, body)
      .then((response) => {
        dispatch({
          type: "UPDATE_APPLICATION_SUCCESS",
          application: response.data.application,
        });
      })
      .catch((error) => {
        dispatch({ type: "UPDATE_APPLICATION_FAILED" });
      });
  },
  getApplication: (dispatch, applicationId) => {
    dispatch({ type: "GET_APPLICATION_REQUEST" });
    axios
      .get(`${baseUrl}/loan/get?id=${applicationId}`)
      .then((response) => {
        dispatch({
          type: "GET_APPLICATION_SUCCESS",
          application: response.data.application,
        });
      })
      .catch((error) => {
        dispatch({ type: "GET_APPLICATION_FAILED" });
      });
  },
  getAllApplications: (dispatch, email) => {
    dispatch({ type: "GET_ALL_APPLICATION_REQUEST" });
    axios
      .get(`${baseUrl}/loan/getall?email=${email}`)
      .then((response) => {
        dispatch({
          type: "GET_ALL_APPLICATION_SUCCESS",
          applications: response.data.applications,
        });
      })
      .catch((error) => {
        dispatch({ type: "GET_ALL_APPLICATION_FAILED" });
      });
  },
  getBalanceSheet: (dispatch, accountingType) => {
    dispatch({ type: "GET_BALANCE_SHEET_REQUEST" });
    axios
      .get(`${baseUrl}/balancesheet/${accountingType}`)
      .then((response) => {
        dispatch({
          type: "GET_BALANCE_SHEET_SUCCESS",
          balanceSheet: response.data.balanceSheet,
        });
      })
      .catch((error) => {
        dispatch({ type: "GET_BALANCE_SHEET_FAILURE" });
      });
  },
};

export default loanApplicationActions;
