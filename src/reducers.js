import {
    GET_DATA
  } from './actions';
  
  const initialState = {
    data: [],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_DATA:
        console.log("in reducer",action.payload)
        return {
          ...state,
          data: [...state.data, ...action.payload],
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  