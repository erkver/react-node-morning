import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import charReducer from "../ducks/charReducer";
import epReducer from "../ducks/epReducer";
import userReducer from "../ducks/userReducer";

const reducers = combineReducers({epReducer, charReducer, userReducer});

export default createStore(reducers, applyMiddleware(promiseMiddleware()));