import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types
export type TVehicle = {
  vehicle_id: number;
  manufacturer: string;
  model: string;
  year: number;
  engine_capacity: number;
  fuel_type: string;
  transmission: string;
  color: string;
  message: string;
  image: string;
  rental_rate: number;
};

export type TLocationBranch = {
  branch_id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  contact_number: string;
};

export type TMaintenanceRecord = {
  maintenance_id: number;
  vehicle_id: number;
  date: string;
  description: string;
  cost: number;
};

export type TPayment = {
  payment_id: number;
  user_id: number;
  booking_id: number;
  payment_date: string;
  payment_amount: number;
  payment_method: string;
  payment_status: string;
  transaction_id: string;
};

export type TPromotion = {
  promotion_id: number;
  title: string;
  description: string;
  discount_percentage: number;
  valid_from: string;
  valid_to: string;
};

export type TReviewRating = {
  review_id: number;
  vehicle_id: number;
  user_id: number;
  rating: number;
  comment: string;
  date: string;
};

export type TBookingOffer = {
  offer_id: number;
  booking_id: number;
  offer_details: string;
  discount_amount: number;
  valid_till: string;
};

// API Configuration
export const carApi = createApi({
  reducerPath: 'carApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (builder) => ({
    getCars: builder.query<TVehicle[], void>({
      query: () => '/vehicles',
    }),
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: '/bookings',
        method: 'POST',
        body: bookingData,
      }),
    }),
    getLocationsBranches: builder.query<TLocationBranch[], void>({
      query: () => '/locationbranches',
    }),
    getMaintenanceRecords: builder.query<TMaintenanceRecord[], void>({
      query: () => '/maintainanceRecords',
    }),
    getPayments: builder.query<TPayment[], void>({
      query: () => '/payments',
    }),
    getPromotions: builder.query<TPromotion[], void>({
      query: () => '/promotions',
    }),
    getReviewsRating: builder.query<TReviewRating[], void>({
      query: () => '/getReviewsRating',
    }),
    getBookingOffers: builder.query<TBookingOffer[], void>({
      query: () => '/bookingoffers',
    }),
  }),
});

export const {
  useGetCarsQuery,
  useCreateBookingMutation,
  useGetLocationsBranchesQuery,
  useGetMaintenanceRecordsQuery,
  useGetPaymentsQuery,
  useGetPromotionsQuery,
  useGetReviewsRatingQuery,
  useGetBookingOffersQuery,
} = carApi;
