import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/authSlice.js";
import jobSlice from "./jobSlice.js";
const store = configureStore({
  reducer: {
    auth: authSlice,
    jobs: jobSlice,
  },
});
export default store;
