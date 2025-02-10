import { createSlice } from "@reduxjs/toolkit";
// import reducer from "./authSlice";
// import { act } from "react";
const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    allJobs: [],
    singleJob: null,
    adminJobs: [],
  },
  reducers: {
    setJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAdminJob: (state, action) => {
      state.adminJobs = action.payload;
    },
  },
});
export const { setJobs, setSingleJob, setAdminJob } = jobSlice.actions;
export default jobSlice.reducer;
