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
    createTeacher: builder.mutation({
      query: (data) => ({
        url: `${TEACHERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    updateTeacher: builder.mutation({
      query: (data) => ({
        url: `${TEACHERS_URL}/${data.productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    // getProductDetails: builder.query({
    //   query: (productId) => ({
    //     url: `${PRODUCTS_URL}/${productId}`,
    //   }),
    //   keepUnusedDataFor: 5,
    // }),
  }),
});

export const {
  useGetTeachersQuery,
  useGetTeacherDetailsQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation
} = teacherApiSlice;
