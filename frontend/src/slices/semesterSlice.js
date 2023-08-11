import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // teachers: null,
  semesters: localStorage.getItem("semesterInfo")
    ? JSON.parse(localStorage.getItem("semesterInfo"))
    : null,
};
const semesterSlice = createSlice({
  name: "semesters",
  initialState,
  reducers: {
    setSemesters: (state, action) => {
      //   state.semesterInfo = action.payload;
      // storing in localstorage
      localStorage.setItem("semesterInfo", JSON.stringify(action.payload));
    },
  },
});

export const { setSemesters } = semesterSlice.actions;

export default semesterSlice.reducer;
