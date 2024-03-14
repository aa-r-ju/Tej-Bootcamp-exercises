import { createSlice } from "@reduxjs/toolkit";
const notificationReducer = createSlice({
  name: "notification",
  initialState: "All notifications",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    resetNotification(state, action) {
      setNotification(action);
      return "New notifications";
    },
  },
});

export const notificationTimeout = (messageToshow, timeInSec) => {
  return async (dispatch) => {
    dispatch(setNotification(`You voted '${messageToshow}'`));
    setTimeout(() => {
      dispatch(resetNotification());
    }, timeInSec * 1000);
  };
};

export const { setNotification, resetNotification } =
  notificationReducer.actions;
export default notificationReducer.reducer;
