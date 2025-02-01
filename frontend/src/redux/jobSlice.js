import { createSlice } from "@reduxjs/toolkit";
// import reducer from "./authSlice";
// import { act } from "react";
const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    allJobs: [],
    singleJob: null,
  },
  reducers: {
    setJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
  },
});
export const { setJobs, setSingleJob } = jobSlice.actions;
export default jobSlice.reducer;
