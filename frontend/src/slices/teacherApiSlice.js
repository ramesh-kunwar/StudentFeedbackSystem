import { TEACHERS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const teacherApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query({
      query: () => ({
        url: TEACHERS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Teacher"],
    }),
    getTeacherDetails: builder.query({
      query: (teacherId) => ({
        url: `${TEACHERS_URL}/${teacherId}`,
      }),
      // keepUnusedDataFor: 5,
      providesTags: ["Teacher"],
    }),
    createTeacher: builder.mutation({
      query: (data) => ({
        url: `${TEACHERS_URL}`,
        method: "POST",

        body: data,
      }),
      invalidatesTags: ["Teacher"],
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
      invalidatesTags: ["Teacher"],
    }),

    deleteTeacher: builder.mutation({
      query: (teacherId) => ({
        url: `${TEACHERS_URL}/${teacherId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teacher"],
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: `${TEACHERS_URL}/${data.id}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Teacher"],
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
