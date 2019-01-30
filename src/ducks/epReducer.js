import axios from "axios";

// Define initial state
const initalState = {
  episodes: [],
  isLoading: false,
  err: false
}

// Define our action types
const GET_EPISODES = 'GET_EPISODES';


// Define our action creators
export const getEpisodes = () => {
  return {
    type: GET_EPISODES,
    payload: axios.get("/api/episodes")
  };
};


// Create the reducer 
export default function epReducer (state = initalState, action) {
  switch(action.type) {
    case `${GET_EPISODES}_PENDING`: 
      return {
        ...state,
        isLoading: true
      };
    case `${GET_EPISODES}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        episodes: action.payload.data
      };
    case `${GET_EPISODES}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        err: true
      };
    default: 
      return state;
  }
}

