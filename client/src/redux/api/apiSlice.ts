import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const api = createApi({
    reducerPath: 'api',

    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),

    tagTypes: ['comment'], // refetch tags...

    endpoints: () => ({}), // for network call endpoint code splitting
});

export default api;