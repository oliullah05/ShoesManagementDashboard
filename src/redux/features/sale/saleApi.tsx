import { baseApi } from '../../api/baseApi'

export const saleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSale: builder.mutation({
      query: (saleInfo) => ({
        url: '/sale/create-sale',
        method: 'POST',
        body: saleInfo,
      }),
      invalidatesTags: ['saleToShoe',"polish"],
    }),

    getAllSale: builder.query({
      query: (period) => ({
        url: `/sale${period ? `/${period}` : ''}`,
        method: 'GET',
      }),
      providesTags: ['saleToShoe',"polish"],
    }),
  }),
})

export const { useCreateSaleMutation, useGetAllSaleQuery } = saleApi
