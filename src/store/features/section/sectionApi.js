

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query with credentials
const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/`,
    credentials: 'include', // Equivalent to `withCredentials: true` in axios
});

export const sectionApi = createApi({
    reducerPath: 'sectionApi',
    baseQuery: baseQuery, // Use the base query with credentials
    tagTypes: ['Section'],
    endpoints: (builder) => ({
        getSection: builder.query({
            query: () => 'section',
            providesTags: ['Section'],
        }),
        getSectionById: builder.query({
            query: (id) => `section/${id}`,
            providesTags: (result, error, id) => [{ type: 'Section', id }],
        }),

        getSectionByCourseId: builder.query({
            query: (id) => `section/by-course/${id}`,
            providesTags: (result, error, id) => [{ type: 'Section', id }],
        }),
        createSection: builder.mutation({
            query: (sectionData) => ({
                url: 'section',
                method: 'POST',
                body: sectionData,
            }),
            invalidatesTags: ['Section'],
        }),
        updateSection: builder.mutation({
            query: ({ id, formData }) => ({
                url: `section/${id}`,
                method: 'PUT',
                body: formData,
                headers: {
                    Accept: 'application/json',
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Section', id }],
        }),
        deleteSection: builder.mutation({
            query: (id) => ({
                url: `section/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Section'],
        }),
    }),
});

export const {
    useGetSectionQuery,
    useGetSectionByIdQuery,
    useGetSectionByCourseIdQuery,
    useCreateSectionMutation,
    useUpdateSectionMutation,
    useDeleteSectionMutation,
} = sectionApi;