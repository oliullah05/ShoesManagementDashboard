import { baseApi } from '../../api/baseApi'

export const shoeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addShoe: builder.mutation({
      query: (data) => ({
        url: '/shoe/create-shoe',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['shoe'] as unknown as undefined,
    }),
    updateShoe: builder.mutation({
      query: (data) => {
        if (data) {
          // console.log("Data value:", data.data);
        }
        return {
          url: `/shoe/${data.id}`,
          method: 'PATCH',
          body: data.data,
        }
      },
      invalidatesTags: ['shoe'] as unknown as undefined,
    }),

    getAllShoes: builder.query({
      query: (query) => {
        // console.log(query);

        if (query) {
          return {
            url: `/shoe/${query}&isDeleted=false`,
            method: 'GET',
          }
        }

        return {
          url: '/shoe/?isDeleted=false',
          method: 'GET',
        }
      },
      providesTags: ['shoe', 'saleToShoe'] as unknown as undefined,
    }),

    getSingleShoe: builder.query({
      query: (data) => {
        return {
          url: `/shoe/${data.id}`,
          method: 'GET',
        }
      },
    }),

    getSingleByAuthenticityCodeShoe: builder.query({
      query: (data) => {
        console.log(data,"api");
        return {
          url: `/shoe/verify/${data}`,
          method: 'GET',
        }
      },
    }),

    deleteShoe: builder.mutation({
      query: (id) => ({
        url: `/shoe/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['shoe'] as unknown as undefined,
    }),

    deleteShoesMany: builder.mutation({
      query: (shoeIds) => {
        // console.log(shoeIds);
        return {
          url: '/shoe/delete-shoes-many',
          method: 'POST',
          body: { shoeIds },
        }
      },
      invalidatesTags: ['shoe'] as unknown as undefined,
    }),

    getAllShowWithSearch: builder.query({
      query: (searchTerm) => ({
        url: `/shoe/?searchTerm=${searchTerm}`,
        method: 'GET',
      }),
      providesTags: ['shoe'],
    }),
  }),
})

export const {
  useAddShoeMutation,
  useGetAllShoesQuery,
  useDeleteShoeMutation,
  useUpdateShoeMutation,
  useGetSingleShoeQuery,
  useDeleteShoesManyMutation,
  useGetAllShowWithSearchQuery,
  useGetSingleByAuthenticityCodeShoeQuery
} = shoeApi
