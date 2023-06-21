import { SEMESTERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const semesterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSemesters: builder.query({
      query: () => ({
        url: SEMESTERS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Semester"],
    }),
  }),
});

export const { useGetSemestersQuery } = semesterApiSlice;
