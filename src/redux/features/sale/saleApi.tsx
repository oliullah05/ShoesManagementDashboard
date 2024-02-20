import { baseApi } from '../../api/baseApi'

export const saleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSale: builder.mutation({
      query: (saleInfo) => ({
        url: '/sale/create-sale',
        method: 'POST',
        body: saleInfo,
      }),
      invalidatesTags: ['saleToShoe'],
    }),

    getAllSale: builder.query({
      query: () => ({
        url: `/sale`,
        method: 'GET',
      }),
      providesTags: ['saleToShoe',"shoePolishToSale"],
    }),
  }),
})

export const { useCreateSaleMutation, useGetAllSaleQuery } = saleApi
