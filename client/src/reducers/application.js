import actions from "../actions/loanApplicationActions";

const loanApplications = (state = { applications: [] }, action) => {
  const {
    NEW_APPLICATION_REQUEST,
    NEW_APPLICATION_FAILED,
    NEW_APPLICATION_SUCCESS,
    UPDATE_APPLICATION_REQUEST,
    UPDATE_APPLICATION_FAILED,
    UPDATE_APPLICATION_SUCCESS,
    GET_APPLICATION_REQUEST,
    GET_APPLICATION_FAILED,
    GET_APPLICATION_SUCCESS,
    GET_ALL_APPLICATION_REQUEST,
    GET_ALL_APPLICATION_FAILED,
    GET_ALL_APPLICATION_SUCCESS,
    GET_BALANCE_SHEET_REQUEST,
    GET_BALANCE_SHEET_SUCCESS,
    GET_BALANCE_SHEET_FAILED,
  } = actions;
  switch (action.type) {
    case NEW_APPLICATION_REQUEST:
    case UPDATE_APPLICATION_REQUEST:
    case GET_APPLICATION_REQUEST:
    case GET_ALL_APPLICATION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case NEW_APPLICATION_FAILED:
    case NEW_APPLICATION_SUCCESS:
    case UPDATE_APPLICATION_FAILED:
    case UPDATE_APPLICATION_SUCCESS:
    case GET_APPLICATION_FAILED:
    case GET_APPLICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        application: action.application,
      };
    case GET_ALL_APPLICATION_FAILED:
    case GET_ALL_APPLICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        applications: action.applications,
      };
    case GET_BALANCE_SHEET_REQUEST:
      return {
        ...state,
        isBalanceSheetLoading: true,
      };
    case GET_BALANCE_SHEET_SUCCESS:
    case GET_BALANCE_SHEET_FAILED:
      return {
        ...state,
        isBalanceSheetLoading: false,
        balanceSheet: action.balanceSheet,
      };
    default:
      return {
        ...state,
      };
  }
};

export default loanApplications;
