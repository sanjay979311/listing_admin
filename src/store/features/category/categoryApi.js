



import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query with credentials
const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/`,
    credentials: 'include', // Equivalent to `withCredentials: true` in axios
});

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: baseQuery, // Use the base query with credentials
    tagTypes: ['category'],
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => 'category/list',
            providesTags: ['category'],
        }),
        getCategoryById: builder.query({
            query: (id) => `category/${id}`,
            providesTags: (result, error, id) => [{ type: 'category', id }],
        }),
        addCategory: builder.mutation({
            query: (categoryData) => ({
                url: 'category/create',
                method: 'POST',
                body: categoryData,
            }),
            invalidatesTags: ['category'],
        }),
        updateCategory: builder.mutation({
            query: ({ id, formData }) => ({
                url: `category/update/${id}`,
                method: 'PUT',
                body: formData,
                headers: {
                    Accept: 'application/json',
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'category', id }],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `category/remove/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['category'],
        }),
    }),
});

export const {
    useGetCategoryByIdQuery,
    useGetCategoryQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoryApi;
