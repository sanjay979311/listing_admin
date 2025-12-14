import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query with credentials
const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/`,
  credentials: 'include', // like axios withCredentials
});

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: baseQuery,
  tagTypes: ['Post'], // changed from City to Post
  endpoints: (builder) => ({
    // Get all posts
    getPosts: builder.query({
      query: () => 'bulk-post/list',
      providesTags: ['Post'],
    }),

    // Get post by ID
    getPostById: builder.query({
      query: (id) => `bulk-post/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),

    // Create post
    createPost: builder.mutation({
      query: (postData) => ({
        url: 'bulk-post/create',
        method: 'POST',
        body: postData,
      }),
      invalidatesTags: ['Post'],
    }),

    // Update post
    updatePost: builder.mutation({
      query: ({ id, formData }) => ({
        url: `bulk-post/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }],
    }),

    // Delete post
    deletePost: builder.mutation({
      query: (id) => ({
        url: `post/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
