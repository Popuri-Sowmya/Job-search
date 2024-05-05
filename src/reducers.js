import {
    FETCH_MORE_JOB_LISTINGS_REQUEST,
    FETCH_MORE_JOB_LISTINGS_SUCCESS,
    FETCH_MORE_JOB_LISTINGS_FAILURE
  } from './actions';
  
  const initialState = {
    jobListings: [],
    loading: false,
    error: null
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_MORE_JOB_LISTINGS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_MORE_JOB_LISTINGS_SUCCESS:
        return {
          ...state,
          loading: false,
          jobListings: [...state.jobListings, ...action.payload],
          error: null
        };
      case FETCH_MORE_JOB_LISTINGS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  