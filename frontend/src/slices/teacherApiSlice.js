import { TEACHERS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const teacherApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query({
      query: () => ({
        url: TEACHERS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Teachers"],
    }),
    getTeacherDetails: builder.query({
      query: (teacherId) => ({
        url: `${TEACHERS_URL}/${teacherId}`,
      }),
      // keepUnusedDataFor: 5,
      providesTags: ["Teachers"],
    }),
    createTeacher: builder.mutation({
      query: (data) => ({
        url: `${TEACHERS_URL}`,
        method: "POST",

        body: data,
      }),
      invalidatesTags: ["Teachers"],
    }),
    uploadTeacherImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    updateTeacher: builder.mutation({
      query: (data) => ({
        url: `${TEACHERS_URL}/${data.teacherId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Teachers"],
    }),
    deleteTeacher: builder.mutation({
      query: (teacherId) => ({
        url: `${TEACHERS_URL}/${teacherId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teachers"],
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: `${TEACHERS_URL}/${data.id}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useGetTeacherDetailsQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useUploadTeacherImageMutation,
  useDeleteTeacherMutation,
  useCreateReviewMutation,
} = teacherApiSlice;
