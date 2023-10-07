import api from "@/redux/api/apiSlice";

const productApi = api.injectEndpoints({

    // for network call endpoint code splitting

    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => '/products'
        }),

        getSingleProduct: builder.query({
            query: (id) => ({ url: `/product/${id}` }),
        }),

        postCommentForProduct: builder.mutation({
            query: ({ id, data }) => ({
                url: `/comment/${id}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['comment'], // invalid old case, after every POST network call...
        }),

        getProductComment: builder.query({
            query: (id) => (`/comment/${id}`),
            providesTags: ['comment'] // auto GET network call, for new POST-ed data by tag...
            // when previous case invalid, trigger new GET network call
            // to see live update your own POST-ed data
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useGetSingleProductQuery,
    useGetProductCommentQuery,
    usePostCommentForProductMutation,
} = productApi;