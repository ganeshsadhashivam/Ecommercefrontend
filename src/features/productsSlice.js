import { createSlice } from "@reduxjs/toolkit";

//appAPI to communicate with redux and backend
import appApi from "../services/appApi";

const initialState = [];

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
