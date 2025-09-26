import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query with credentials
const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/`,
    credentials: 'include', // Equivalent to `withCredentials: true` in axios
});

export const doctorApi = createApi({
    reducerPath: 'doctorApi',
    baseQuery: baseQuery, // Use the base query with credentials
    tagTypes: ['Doctor'],
    endpoints: (builder) => ({
        getDoctorList: builder.query({
            query: () => 'doctor/list',
            providesTags: ['Doctor'],
        }),
        getAvailabilityList: builder.query({
            query: () => 'availability/list',
            providesTags: ['Doctor'],
        }),
        getDoctorById: builder.query({
            query: (id) => `doctor/${id}`,
            providesTags: (result, error, id) => [{ type: 'Doctor', id }],
        }),
        saveAvailability: builder.mutation({
            query: (formData) => ({
                url: 'availability/save-availability',
                method: 'POST',
                body: formData,
            }),
            // After saving availability, invalidate relevant tags
            invalidatesTags: ['Doctor'],
        }),
        getDocterByID: builder.query({
            query: (id) => `availability/getDoctor/${id}`,
            providesTags: (result, error, id) => [{ type: 'Doctor', id }],

        }),


        getAvailibilityId: builder.query({
            query: (id) => `availability/${id}`,
            providesTags: (result, error, id) => [{ type: 'Doctor', id }],
        }),
        updateAvailability: builder.mutation({
            query: ({ id, formData }) => ({
                url: `availability/update/${id}`, // API endpoint to update availability by ID
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['Doctor'], // Invalidate the doctor list cache
        }),


        createDoctor: builder.mutation({
            query: (formData) => ({
                url: 'register-new-doctor',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['doctor'], // Optional: if you want to refetch doctor lists after creation
        }),

        getProfile: builder.query({
            query: (id) => `get-profile/${id}`,
            providesTags: ['doctor'],
        }),

        updateDoctorProfile: builder.mutation({
            query: ({ id, formData }) => {
                return {
                    url: `update-doctor-profile/${id}`,
                    method: 'PUT',
                    body: formData,  // This will automatically handle FormData
                };
            },
            invalidatesTags: ['doctor'],
        }),

    }),
});

export const {
    useGetDoctorListQuery,
    useGetAvailabilityListQuery,
    useSaveAvailabilityMutation,
    useGetDocterByIDQuery,
    useGetAvailibilityIdQuery,
    useCreateDoctorMutation,
    useUpdateAvailabilityMutation,
    useGetProfileQuery,
    useUpdateDoctorProfileMutation


} = doctorApi;