import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.js";
import authSliceReducer from "./slices/authSlice.js";
import teacherSliceReducer from "./slices/teacherSlice.js";
import semesterSliceReducer from "./slices/semesterSlice.js";
// import { apiSlice } from "./src/slices/apiSlice";
// import cartSliceReducer from "./src/slices/cartSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,

    teachers: teacherSliceReducer,
    // semesters: semesterSliceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
