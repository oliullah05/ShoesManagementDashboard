import { baseApi } from '../../api/baseApi'

export const shoePolishApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addShoePolish: builder.mutation({
      query: (data) => ({
        url: '/shoePolish/create-shoe-polish',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['shoePolish'] as unknown as undefined,
    }),

    getAllShoePolish: builder.query({
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
      providesTags: ['shoePolish'] as unknown as undefined,
    }),


  }),
})

export const {
  useAddShoePolishMutation,
  useGetAllShoePolishQuery

} = shoePolishApi
