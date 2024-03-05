// const filterReducer = (state = "", action) => {
//   switch (action.type) {
//     case "FILTER-ANECDOTE": {
//       return action.payload;
//     }

//     default:
//       return state;
//   }
// };

// export const anecdoteFilterFrom = (searchTerm) => {
//   return {
//     type: "FILTER-ANECDOTE",
//     payload: searchTerm,
//   };
// };

// export default filterReducer;

import { createSlice } from "@reduxjs/toolkit";

const filterReducer = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    anecdoteFilterFrom(state, action) {
      return action.payload;
    },
  },
});
export const { anecdoteFilterFrom } = filterReducer.actions;
export default filterReducer.reducer;
