import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers.js';

const store = configureStore({
  reducer: reducer
});

export default store;
