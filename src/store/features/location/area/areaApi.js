



import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query with credentials
const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/`,
    credentials: 'include', // Equivalent to `withCredentials: true` in axios
});

export const areaApi = createApi({
    reducerPath: 'areaApi',
    baseQuery: baseQuery, // Use the base query with credentials
    tagTypes: ['Area'],
    endpoints: (builder) => ({
        getArea: builder.query({
            query: () => 'area',
            providesTags: ['Area'],
        }),
        getAreaById: builder.query({
            query: (id) => `area/${id}`,
            providesTags: (result, error, id) => [{ type: 'Area', id }],
        }),
        getAreaByCountryId: builder.query({
            query: (id) => `area/get-Area-by-country/${id}`,
            providesTags: (result, error, id) => [{ type: 'Area', id }],
        }),
        getAreaByStateId: builder.query({
            query: (id) => `area/get-Area-by-state/${id}`,
            providesTags: (result, error, id) => [{ type: 'Area', id }],
        }),

        addArea: builder.mutation({
            query: (formData) => ({
                url: 'area/create',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Area'],
        }),
        updateArea: builder.mutation({
            query: ({ id, formData }) => ({
                url: `Area/${id}`,
                method: 'PUT',
                body: formData,
                headers: {
                    Accept: 'application/json',
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Area', id }],
        }),
        deleteArea: builder.mutation({
            query: (id) => ({
                url: `area/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Area'],
        }),
    }),
});

export const {
    useGetAreaQuery,
    useGetAreaByIdQuery,
    useGetAreaByCountryIdQuery,
    useGetAreaByStateIdQuery,
    useAddAreaMutation,
    useUpdateAreaMutation,
    useDeleteAreaMutation,

} = areaApi;