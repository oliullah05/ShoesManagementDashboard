import { baseApi } from '../../api/baseApi'

const saleApi = baseApi.injectEndpoints({
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
      query: (period) => ({
        url: `/sale${period ? `/${period}` : ''}`,
        method: 'GET',
      }),
      providesTags: ['saleToShoe'],
    }),
  }),
})

export const { useCreateSaleMutation, useGetAllSaleQuery } = saleApi
