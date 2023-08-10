import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // teachers: null,
  semesters: localStorage.getItem("teacherInfo")
    ? JSON.parse(localStorage.getItem("teacherInfo"))
    : null,
};
const semesterSlice = createSlice({
  name: "semesters",
  initialState,
  reducers: {
    setSemesters: (state, action) => {
      //   state.teacherInfo = action.payload;
      // storing in localstorage
      localStorage.setItem("semestrInfo", JSON.stringify(action.payload));
    },
  },
});

export const { setSemesters } = semesterSlice.actions;

export default semesterSlice.reducer;
