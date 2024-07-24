
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface Car {
  _id: string;
  name: string;
  desc: string;
  price: number;
  image?: { url: string };
  bookingQuantity: number;
}

export interface Booking {
  booking_id: number;
  location_id: number;
  booking_date: string;
  return_date: string;
  total_cost: number;
  status: string;
  user_id: number;
  vehicleSpec_id: number;
  payment_id: string;
  user: {
    full_name: string;
    contact_phone: number;
    email: string;
    address: string;
  };
  vehicle: {
    rental_rate: number;
    rented_out: boolean;
    vehicleSpecification: {
      manufacturer: string;
      model: string;
      year: number;
      engine_capacity: number;
      fuel_type: string;
      image: string;
    };
  };
}
export interface Tlocation {
  location_id: number;
  location_name: string;
  address: string;
  contact_phone: number;
  email: string;

}
export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://car-api-80da.onrender.com/' }), // Replace with your backend URL
  endpoints: (builder) => ({
    fetchBookings: builder.query<Booking[], void>({
      query: () => '/bookings',
    }),
    fetchLocation: builder.query<Tlocation[], void>({
      query: () => '/locationbranches',
    }),
    bookCar: builder.mutation<Booking, Partial<Booking>>({
      query: (booking) => ({
        url: '/bookings',
        method: 'POST',
        body: booking,
      }),
    }),
    removeCarFromBooking: builder.mutation<Car, { carId: string }>({
      query: ({ carId }) => ({
        url: `/bookings/${carId}`,
        method: 'DELETE',
      }),
    }),
    addCarToBooking: builder.mutation<Booking[], Partial<Booking>>({
      query: (data) => ({
        url: `/bookings`,
        method: 'POST',
        body:data,
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
