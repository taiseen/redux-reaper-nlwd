import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => '/products'
        }),

        getSingleProduct: builder.query({
            query: (id) => ({ url: `/product/${id}` }),
        }),

        postCommentForProduct: builder.mutation({
            query: ({ id, commentData }) => ({
                url: `/comment/${id}`,
                method: 'POST',
                data: commentData,
            })
        })
    })
});

export const {
    useGetAllProductsQuery,
    useGetSingleProductQuery,
    usePostCommentForProductMutation,
} = api;

export default api;