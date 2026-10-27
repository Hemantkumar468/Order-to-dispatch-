import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.DEV
      ? import.meta.env.VITE_API_URL_LOCAL
      : import.meta.env.VITE_API_URL_LIVE,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Party', 'SKU', 'Order', 'Challan', 'Invoice', 'Auth', 'PPC', 'Shipment', 'Payment', 'TransportBill'],
  endpoints: () => ({}),
});
