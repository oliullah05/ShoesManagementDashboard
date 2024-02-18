import { baseApi } from "../../api/baseApi";

export const shoeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getSingleUser: builder.mutation({
        query: (data) => ({
          url: '/shoe/create-shoe',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['shoe'] as unknown as undefined,
      }),
    }),
  })