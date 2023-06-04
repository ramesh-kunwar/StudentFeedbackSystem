import { TEACHERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const teacherApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query({
      query: () => ({
        url: TEACHERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getTeacherDetails: builder.query({
      query: (teacherId) => ({
        url: `${TEACHERS_URL}/${teacherId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // getProductDetails: builder.query({
    //   query: (productId) => ({
    //     url: `${PRODUCTS_URL}/${productId}`,
    //   }),
    //   keepUnusedDataFor: 5,
    // }),
  }),
});

export const { useGetTeachersQuery, useGetTeacherDetailsQuery } = teacherApiSlice;
