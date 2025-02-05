import { createSlice } from "@reduxjs/toolkit";
const companySlice = createSlice({
  name: "companys",
  initialState: {
    setSingleCompany: null, 
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.setSingleCompany = action.payload;
    },
  },
});
export const { setSingleCompany } = companySlice.actions;
export default companySlice.reducer;
