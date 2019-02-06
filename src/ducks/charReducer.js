import axios from "axios";

// Define initial state
const initialState = {
  characters: [],
  isLoading: false,
  err: false,
  name: "",
  species: "",
  url: ""
}

// Define our action types
const GET_CHARACTERS = "GET_CHARACTERS"
const DELETE_CHARACTER = "DELETE_CHARACTER"
const HANDLE_CHANGE = "HANDLE_CHANGE";

// Define our action creators
export const getChars = () => {
  return { 
    type: GET_CHARACTERS, 
    payload: axios.get("/api/characters") 
    };
}

export const deleteChar = id => {
  return {
    type: DELETE_CHARACTER,
    payload: axios.delete(`/api/characters/${id}`)
  }
}

export const handleChange = (field, value) => {
  return {
    type: HANDLE_CHANGE,
    payload: {field, value}
  }
}

// Create the reducer 
export default function charReducer(state = initialState, action) {
  switch(action.type) {
    case `${GET_CHARACTERS}_PENDING`: 
      return {
        ...state,
        isLoading: true
      };
    case `${GET_CHARACTERS}_FULFILLED`: 
      return {
        ...state,
        isLoading: false,
        characters: action.payload.data
      };
    case `${GET_CHARACTERS}_REJECTED`: 
      return {
        ...state,
        err: true
      };
    case `${DELETE_CHARACTER}_FULFILLED`:
      return {
        ...state,
        characters: action.payload.data
      };
    case HANDLE_CHANGE: 
      return {
        ...state,
        [action.payload.field]: action.payload.value
      }
    default: 
      return state;
  }
}