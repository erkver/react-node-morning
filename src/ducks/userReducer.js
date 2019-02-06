import axios from "axios";

const initialState = {
  user: {}
}

const REGISTER = "REGISTER";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const GET_USER = "GET_USER";

export const register = (username, password) => {
  return {
    type: REGISTER,
    payload: axios.post('/auth/register', {username, password})
  };
};

export const login = (username, password) => {
  return {
    type: LOGIN,
    payload: axios.post('/auth/login', {username, password})
  }
}

export const logout = () => {
  return {
    type: LOGOUT,
    payload: axios.post('/auth/signout')
  }
}

export const getUser = () => {
  return {
    type: GET_USER,
    payload: axios.get('/auth/user')
  }
}

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case `${REGISTER}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      };
    case `${LOGIN}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      };
    case `${LOGOUT}_FULFILLED`:
      return {
        ...state,
        user: {}
      };
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      };
    default:
      return state;
  }
}


