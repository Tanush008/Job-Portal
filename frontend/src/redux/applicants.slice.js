import { createSlice } from "@reduxjs/toolkit";
const applicantsSlice = createSlice({
  name: "application",
  initialState: {
    applicants: [],
  },
  reducers: {
    setapplicant: (state, action) => {
      state.applicants = action.payload;
    },
  },
});
export const { setapplicant } = applicantsSlice.actions;
export default applicantsSlice.reducer;
