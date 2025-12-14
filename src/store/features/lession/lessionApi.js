import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query with credentials
const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/`,
    credentials: 'include', // send cookies
});

export const lessonApi = createApi({
    reducerPath: 'lessonApi',
    baseQuery: baseQuery,
    tagTypes: ['Lesson'],

    endpoints: (builder) => ({

        // Get all lessons
        getLessons: builder.query({
            query: () => 'lesson',
            providesTags: ['Lesson'],
        }),

        // Get lesson by ID
        getLessonById: builder.query({
            query: (id) => `lesson/${id}`,
            providesTags: (result, error, id) => [{ type: 'Lesson', id }],
        }),

        // Get lessons by Section ID
        getLessonsBySectionId: builder.query({
            query: (sectionId) => `lesson/by-section/${sectionId}`,
            providesTags: (result, error, sectionId) => [{ type: 'Lesson', id: sectionId }],
        }),

        // Create lesson
        createLesson: builder.mutation({
            query: (lessonData) => ({
                url: 'lesson',
                method: 'POST',
                body: lessonData,
            }),
            invalidatesTags: ['Lesson'],
        }),

        // Update lesson
        updateLesson: builder.mutation({
            query: ({ id, formData }) => ({
                url: `lesson/${id}`,
                method: 'PUT',
                body: formData,
                headers: {
                    Accept: 'application/json',
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Lesson', id }],
        }),

        // Delete lesson
        deleteLesson: builder.mutation({
            query: (id) => ({
                url: `lesson/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Lesson'],
        }),
    }),
});

// Export Hooks
export const {
    useGetLessonsQuery,
    useGetLessonByIdQuery,
    useGetLessonsBySectionIdQuery,
    useCreateLessonMutation,
    useUpdateLessonMutation,
    useDeleteLessonMutation,
} = lessonApi;
