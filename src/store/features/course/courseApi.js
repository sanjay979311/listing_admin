



import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query with credentials
const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/`,
    credentials: 'include', // Equivalent to `withCredentials: true` in axios
});

export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: baseQuery, // Use the base query with credentials
    tagTypes: ['course'],
    endpoints: (builder) => ({
        getCourse: builder.query({
            query: () => 'course/list',
            providesTags: ['course'],
        }),
        getCourseById: builder.query({
            query: (id) => `course/${id}`,
            providesTags: (result, error, id) => [{ type: 'course', id }],
        }),
        getSubCourseByCatId: builder.query({
            query: (catId) => `sub-course/by-course/${catId}`,
            providesTags: (result, error, id) => [{ type: 'Course', id }],
        }),
        addCourse: builder.mutation({
            query: (courseData) => ({
                url: 'course/create',
                method: 'POST',
                body: courseData,
            }),
            invalidatesTags: ['course'],
        }),
        updateCourse: builder.mutation({
            query: ({ id, formData }) => ({
                url: `course/update/${id}`,
                method: 'PUT',
                body: formData,
                headers: {
                    Accept: 'application/json',
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'course', id }],
        }),
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `course/remove/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['course'],
        }),
    }),
});

export const {
    useGetCourseQuery,
    useGetCourseByIdQuery,
    useGetSubCourseByCatIdQuery,
    useAddCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation
} = courseApi;
