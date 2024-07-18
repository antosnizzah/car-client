
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const carApi = createApi({
  reducerPath: 'carApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://car-api-80da.onrender.com' }),
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
