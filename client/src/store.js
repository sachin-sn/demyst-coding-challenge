import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import logMiddleware from "./logMiddleware"; // Your custom middleware

const store = createStore(rootReducer, applyMiddleware(logMiddleware));

export default store;
