// mealsSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const mealsSlice = createSlice({
  name: 'meals',
  initialState: [
    { name: 'Breakfast', cost: 50, selected: false },
    { name: 'High Tea', cost: 25, selected: false },
    { name: 'Lunch', cost: 65, selected: false },
    { name: 'Dinner', cost: 70, selected: false },
  ],
  reducers: {
    //This funtion is used to manage the current state of the checkbox 
    //if it is clicked while the box is selected, the box will remove the checkmark
    toggleMealSelection: (state, action) => {
        state[action.payload].selected = !state[action.payload].selected;
    },
  },
});

export const { toggleMealSelection } = mealsSlice.actions;

export default mealsSlice.reducer;
