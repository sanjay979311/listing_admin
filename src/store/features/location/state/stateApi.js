import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query with credentials
const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/`,
    credentials: 'include', // Equivalent to `withCredentials: true` in axios
});

export const stateApi = createApi({
    reducerPath: 'stateApi',
    baseQuery: baseQuery, // Use the base query with credentials
    tagTypes: ['State'],
    endpoints: (builder) => ({
        getState: builder.query({
            query: () => 'state',
            providesTags: ['State'],
        }),
        getStateById: builder.query({
            query: (id) => `state/${id}`,
            providesTags: (result, error, id) => [{ type: 'State', id }],
        }),
        getStateByCountryId: builder.query({
            query: (id) => `state/get-state-by-country/${id}`,
            providesTags: (result, error, id) => [{ type: 'State', id }],
        }),
        addState: builder.mutation({
            query: (stateData) => ({
                url: 'state',
                method: 'POST',
                body: stateData,
            }),
            invalidatesTags: ['State'],
        }),
        updateState: builder.mutation({
            query: ({ id, formData }) => ({
                url: `state/${id}`,
                method: 'PUT',
                body: formData,
                headers: {
                    Accept: 'application/json',
                },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'State', id }],
        }),
        deleteState: builder.mutation({
            query: (id) => ({
                url: `state/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['State'],
        }),
    }),
});

export const {
    useGetStateQuery,
    useGetStateByIdQuery,
    useGetStateByCountryIdQuery,
    useAddStateMutation,
    useUpdateStateMutation,
    useDeleteStateMutation,
} = stateApi;

