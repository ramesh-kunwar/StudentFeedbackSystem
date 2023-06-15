import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // teachers: null,
  teachers: localStorage.getItem("teacherInfo")
    ? JSON.parse(localStorage.getItem("teacherInfo"))
    : null,
};
const teacherSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    setTeachers: (state, action) => {
      //   state.teacherInfo = action.payload;
      // storing in localstorage
      localStorage.setItem("teacherInfo", JSON.stringify(action.payload));
    },
  },
});

export const { setTeachers } = teacherSlice.actions;

export default teacherSlice.reducer;
