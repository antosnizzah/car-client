
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const carApi = createApi({
  reducerPath: 'carApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (builder) => ({
    getCars: builder.query({
      query: () => '/vehicles',
    }),
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: '/bookings',
        method: 'POST',
        body: bookingData,
      }),
    }),
  }),
});

export const { useGetCarsQuery, useCreateBookingMutation } = carApi;
