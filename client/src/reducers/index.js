// src/reducers/index.js
import { combineReducers } from "redux";
import authorization from "./auth";

const rootReducer = combineReducers({
  auth: authorization,
});

export default rootReducer;
