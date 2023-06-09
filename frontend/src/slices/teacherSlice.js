import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teachers: null,
};
const teacherSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    setTeachers: (state, action) => {
      //   state.teacherInfo = action.payload;
      // storing in localstorage
      //   localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },
});

export const { setTeachers } = teacherSlice.actions;

export default teacherSlice.reducer;
