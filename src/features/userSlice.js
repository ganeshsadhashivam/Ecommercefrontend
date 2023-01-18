import { createSlice } from "@reduxjs/toolkit";

//appAPI to communicate with redux and backend
import appApi from "../services/appApi";

const initialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.signup.matchFulfilled,
      (...{ payload }) => payload
    );
    builder.addMatcher(
      appApi.endpoints.login.matchFulfilled,
      (...{ payload }) => payload
    );
  },
});

export const { logout, addNotification, resetNotifications } =
  userSlice.actions;

export default userSlice.reducer;
