// src/redux/features/section/sectionApi.js

import { baseApi } from "../../baseApi";

export const sectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getSection: builder.query({
      query: () => `section`,
      providesTags: ["Section"],
    }),

    getSectionById: builder.query({
      query: (id) => `section/${id}`,
      providesTags: (result, error, id) => [{ type: "Section", id }],
    }),

    getSectionByCourseId: builder.query({
      query: (id) => `section/by-course/${id}`,
      providesTags: (result, error, id) => [{ type: "Section", id }],
    }),

    createSection: builder.mutation({
      query: (sectionData) => ({
        url: "section",
        method: "POST",
        body: sectionData,
      }),
      invalidatesTags: ["Section"],
    }),

    createLesson: builder.mutation({
      query: (lessonData) => ({
        url: "lesson",
        method: "POST",
        body: lessonData,
      }),
      invalidatesTags: ["Lesson"],
    }),

    updateSection: builder.mutation({
      query: ({ id, formData }) => ({
        url: `section/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Section", id }],
    }),

    deleteSection: builder.mutation({
      query: (id) => ({
        url: `section/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Section"],
    }),
  }),
});

export const {
  useGetSectionQuery,
  useGetSectionByIdQuery,
  useGetSectionByCourseIdQuery,
  useCreateSectionMutation,
  useCreateLessonMutation,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
} = sectionApi;
