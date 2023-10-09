// src/reducers/index.js
import { combineReducers } from "redux";
import authorization from "./auth";
import loanApplications from "./application";

const rootReducer = combineReducers({
  auth: authorization,
  loanApplications: loanApplications,
});

export default rootReducer;
