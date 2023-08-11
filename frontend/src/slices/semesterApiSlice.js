import { SEMESTERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const semesterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSemesters: builder.query({
      query: () => ({
        url: SEMESTERS_URL,
      }),
      keepUnusedDataFor: 5,
      providedTags: ["Semesters"],
    }),
    getSemesterDetails: builder.query({
      query: (semesterId) => ({
        url: `${SEMESTERS_URL}/${semesterId}`,
      }),
      providesTags: ["Semesters"],
      // invalidatesTags: ['Semester']
    }),

    createSemester: builder.mutation({
      query: (data) => ({
        url: `${SEMESTERS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Semesters"],
    }),
    updateSemester: builder.mutation({
      query: (data) => ({
        url: `${SEMESTERS_URL}/${data.semesterId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Semesters"],
    }),
  }),
});

export const {
  useGetSemestersQuery,
  useGetSemesterDetailsQuery,
  useCreateSemesterMutation,
  useUpdateSemesterMutation,
} = semesterApiSlice;
