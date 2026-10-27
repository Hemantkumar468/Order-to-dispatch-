import { baseApi } from './baseApi';

export const challanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChallans: builder.query({
      query: (params) => ({ url: '/challans', params }),
      providesTags: ['Challan'],
    }),
    getChallan: builder.query({
      query: (id) => `/challans/${id}`,
      providesTags: (result, error, id) => [{ type: 'Challan', id }],
    }),
    createChallan: builder.mutation({
      query: (body) => ({ url: '/challans', method: 'POST', body }),
      invalidatesTags: ['Challan', 'Order'],
    }),
    updateChallan: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/challans/${id}`, method: 'PUT', body }),
      invalidatesTags: (result, error, { id }) => ['Challan', { type: 'Challan', id }],
    }),
    deleteChallan: builder.mutation({
      query: (id) => ({ url: `/challans/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Challan'],
    }),
  }),
});

export const {
  useGetChallansQuery,
  useGetChallanQuery,
  useCreateChallanMutation,
  useUpdateChallanMutation,
  useDeleteChallanMutation,
} = challanApi;
