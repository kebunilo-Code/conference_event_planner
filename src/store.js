// store.js
import { configureStore } from '@reduxjs/toolkit';
import venueReducer from './venueSlice';
import avReducer from "./avSlice";
import mealsReducer from "./mealsSlice";
export default configureStore({
  //Global Reducer that allow all components in the application to use the methods found in the reducer
  //Spelling is imortant as it dictates if the webpage displays or not 
  reducer: {
    venue: venueReducer,
    av: avReducer,
    meals: mealsReducer,
  },
});
