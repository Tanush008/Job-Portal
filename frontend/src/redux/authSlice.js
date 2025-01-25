import { createSlice } from "@reduxjs/toolkit";
// import { act } from "react";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.Loading = action.payload;
    },
  },
});
export const { setLoading } = authSlice.actions;
export default authSlice.reducer;
