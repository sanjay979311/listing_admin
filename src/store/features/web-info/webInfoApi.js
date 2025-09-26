// src/redux/webInfoApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query with credentials
const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/`,
    credentials: 'include', // send cookies if needed
});

export const webInfoApi = createApi({
    reducerPath: 'webInfoApi',
    baseQuery: baseQuery,
    tagTypes: ['WebInfo'],
    endpoints: (builder) => ({
        getWebInfo: builder.query({
            query: () => 'web-info',
            providesTags: ['WebInfo'],
        }),
        createOrUpsertWebInfo: builder.mutation({
            query: (formData) => ({
                url: 'web-info',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['WebInfo'],
        }),
        updateWebInfo: builder.mutation({
            query: (formData) => ({
                url: 'web-info',
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['WebInfo'],
        }),
        deleteWebInfo: builder.mutation({
            query: () => ({
                url: 'web-info',
                method: 'DELETE',
            }),
            invalidatesTags: ['WebInfo'],
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useGetWebInfoQuery,
    useCreateOrUpsertWebInfoMutation,
    useUpdateWebInfoMutation,
    useDeleteWebInfoMutation,
} = webInfoApi;
