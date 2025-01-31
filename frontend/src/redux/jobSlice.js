import { createSlice } from "@reduxjs/toolkit";
// import reducer from "./authSlice";
// import { act } from "react";
const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
  },
  reducers: {
    setJobs: (state, action) => {
      state.allJobs = action.payload;
    },
  },
});
export const { setJobs } = jobSlice.actions;
export default jobSlice.reducer;
