import { createSlice } from "@reduxjs/toolkit";

const filterReducer = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    anecdoteFilterForm(state, action) {
      return action.payload;
    },
  },
});
export const { anecdoteFilterForm } = filterReducer.actions;
export default filterReducer.reducer;
