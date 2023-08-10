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
    getSemesterDetails: builder.query({
      query: (semesterId) => ({
        url: `${SEMESTERS_URL}/${semesterId}`,
      }),
      providesTags: ["Semester"],
    }),

    createSemester: builder.mutation({
      query: (data) => ({
        url: `${SEMESTERS_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["Semester"],
    }),
    updateSemester: builder.mutation({
      query: (data) => ({
        url: `${SEMESTERS_URL}/${data.semesterId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Teachers"],
    }),
  }),
});

export const {
  useGetSemestersQuery,
  useGetSemesterDetailsQuery,
  useCreateSemesterMutation,
  useUpdateSemesterMutation
} = semesterApiSlice;
