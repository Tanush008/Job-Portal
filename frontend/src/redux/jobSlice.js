import { createSlice } from "@reduxjs/toolkit";
// import reducer from "./authSlice";
// import { act } from "react";
const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    allJobs: [],
    singleJob: null,
    adminJobs: [],
    searchJobByText: "",
    allAppiledJobs: [],
    searchedByQuery: "",
    searchedByQuerys: "",
    saveForlater: [],
    // saveForlaterIds: new Set(),
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
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAppliedJobs: (state, action) => {
      state.allAppiledJobs = action.payload;
    },
    setsearchedByQuery: (state, action) => {
      state.searchedByQuery = action.payload;
    },
    setsearchedByQuerys: (state, action) => {
      state.searchedByQuery = action.payload;
    },
    addSaveForLater: (state, action) => {
      const exists = state.saveForlater.some(
        (job) => job._id === action.payload._id
      );
      if (!exists) {
        state.saveForlater.push(action.payload);
      }
    },
    removeSaveForLater: (state, action) => {
      state.saveForlater = state.saveForlater.filter(
        (job) => job._id !== action.payload
      );
    },
  },
});
export const {
  setJobs,
  setSingleJob,
  setAdminJob,
  setSearchJobByText,
  setAppliedJobs,
  setsearchedByQuery,
  setsearchedByQuerys,
  addSaveForLater,
  removeSaveForLater,
} = jobSlice.actions;
export default jobSlice.reducer;
