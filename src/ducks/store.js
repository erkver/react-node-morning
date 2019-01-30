import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import charReducer from "../ducks/charReducer";
import epReducer from "../ducks/epReducer";

const reducers = combineReducers({epReducer, charReducer});

export default createStore(reducers, applyMiddleware(promiseMiddleware()));