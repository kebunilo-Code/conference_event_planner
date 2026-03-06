// store.js
import { configureStore } from '@reduxjs/toolkit';
import venueReducer from './venueSlice';

export default configureStore({
  //Global Reducer that allow all components in the application to use the methods found in the reducer 
  reducer: {
    venue: venueReducer,
  },
});
