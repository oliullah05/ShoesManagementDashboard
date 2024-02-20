import { baseApi } from '../../api/baseApi'

export const shoePolishApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShoePolish: builder.mutation({
      query: (data) => ({
        url: '/shoePolish/create-shoe-polish',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['shoePolish',"shoePolishToSale"] as unknown as undefined,
    }),
    updateShoePolish: builder.mutation({
      query: (data) => ({
        url: `/shoePolish/${data.id}`,
        method: 'PUT',
        body: data.data,
      }),
      invalidatesTags: ['shoePolish'] as unknown as undefined,
    }),

    getAllShoePolish: builder.query({
        query: () => ({
          url: `/shoePolish`,
          method: 'GET',
        }),
        providesTags: ['shoePolish',"shoePolishToSale"] as unknown as undefined,
      }),


  }),
})

export const {
  useCreateShoePolishMutation,
  useGetAllShoePolishQuery,
  useUpdateShoePolishMutation

} = shoePolishApi
