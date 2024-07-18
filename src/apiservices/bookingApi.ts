// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export interface Car {
//   _id: string;
//   name: string;
//   desc: string;
//   price: number;
//   image?: { url: string };
//   bookingQuantity: number;
// }

// export interface Booking {
//   booking_id: number;
//   location_id: number;
//   booking_date: string;
//   return_date: string;
//   total_cost: string;
//   status: string;
//   payment_id: string;
//   user: {
//     full_name: string;
//     contact_phone: number;
//     email: string;
//     address: string;
//   };
//   vehicle: {
//     rental_rate: number;
//     rented_out: boolean;
//     vehicleSpecification: {
//       manufacturer: string;
//       model: string;
//       year: number;
//       engine_capacity: number;
//       fuel_type: string;
//     };
//   };
// }

// export const bookingApi = createApi({
//   reducerPath: 'bookingApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
//   endpoints: (builder) => ({
//     bookCar: builder.mutation<{ success: boolean }, { carId: string; quantity: number }>({
//       query: (booking) => ({
//         url: '/bookings',
//         method: 'POST',
//         body: booking,
//       }),
//     }),
//     fetchBooking: builder.query<Booking, number>({
//       query: (bookingId) => `/bookings/${bookingId}`,
//     }),
//     fetchBookings: builder.query<Booking[], void>({
//       query: () => '/bookings',
//     }),
//     fetchvehicle: builder.query<Booking[], void>({
//       query: () => '/vehicles',
//     }),
//   }),
// });

// export const { useBookCarMutation, useFetchBookingQuery, useFetchBookingsQuery,useFetchvehicleQuery } = bookingApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://car-api-80da.onrender.com/' }), // Replace with your backend URL
  endpoints: (builder) => ({
    fetchBookings: builder.query<any, void>({
      query: () => '/bookings',
    }),
    bookCar: builder.mutation<any, any>({
      query: (booking) => ({
        url: '/bookings',
        method: 'POST',
        body: booking,
      }),
    }),
    removeCarFromBooking: builder.mutation<any, { carId: string }>({
      query: ({ carId }) => ({
        url: `/bookings/${carId}`,
        method: 'DELETE',
      }),
    }),
    addCarToBooking: builder.mutation<any, { carId: string }>({
      query: ({ carId }) => ({
        url: `/bookings/${carId}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useFetchBookingsQuery,
  useBookCarMutation,
  useRemoveCarFromBookingMutation,
  useAddCarToBookingMutation,
} = bookingApi;
