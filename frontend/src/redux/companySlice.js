import { createSlice } from "@reduxjs/toolkit";
const companySlice = createSlice({
  name: "company",
  initialState: {
    setSingleCompany: null,
    companies: [],
    searchCompanyByText: "",
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.setSingleCompany = action.payload;
    },
    setCompany: (state, action) => {
      state.companies = action.payload;
    },
    setsearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },
  },
});
export const { setSingleCompany, setCompany, setsearchCompanyByText } =
  companySlice.actions;
export default companySlice.reducer;
