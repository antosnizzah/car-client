import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Payment {
  payment_id: number;
  user_id: number;
  booking_id: number;
  payment_date: string;
  payment_amount: string;
  payment_method: string;
  payment_status: string;
  transaction_id: string;
}


export interface CreatePaymentRequest {
    booking_id: number;
    user_id: number;
    payment_amount: number;
    payment_method: string;
    amount: number; // Ensure this is included
  }

export interface CreatePaymentResponse {
  message: string;
  client_secret: string;
}

export const paymentsApi = createApi({
  reducerPath: 'paymentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://car-api-80da.onrender.com/' }),
  endpoints: (builder) => ({
    createPayment: builder.mutation<CreatePaymentResponse, CreatePaymentRequest>({
      query: (payment) => ({
        url: '/payments',
        method: 'POST',
        body: payment,
      }),
    }),
    getPaymentByBooking: builder.query<Payment, number>({
      query: (bookingId) => `/payments/${bookingId}`,
    }),
    updatePayment: builder.mutation<Payment, { id: number; payment: Partial<Payment> }>({
      query: ({ id, payment }) => ({
        url: `/payments/${id}`,
        method: 'PUT',
        body: payment,
      }),
    }),
    deletePayment: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/payments/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useGetPaymentByBookingQuery,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentsApi;
