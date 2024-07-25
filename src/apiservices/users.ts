import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TUser {
  id: number;
  full_name: string;
  email: string;
  contact_phone: string;
  address: string;
  user_id:number;
  is_active: boolean;
}

export interface DeleteResponse {
  msg: string;
}
export interface UserDetails {
  email: string;
  contact_phone: number;
  email_verified: boolean;
  address: string;
  user_id:number;
  full_name: string;
  profile_image?: string;
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://car-api-80da.onrender.com/' }),
  endpoints: (builder) => ({
    getUsers: builder.query<TUser[], void>({
      query: () => 'users',
    }),
    addUser: builder.mutation<TUser, Partial<TUser>>({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: newUser,
      }),
    }),
    updateUser: builder.mutation<TUser, { id: number; } & Partial<TUser>>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: patch,
      }),
    }),
    deleteUser: builder.mutation<DeleteResponse, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
    getUserDetails: builder.query<UserDetails, number>({
      query: (id) => `users/${id}`, 
  }),
  uploadProfileImage: builder.mutation<{ imageUrl: string }, FormData>({
    query: (formData) => ({
      url: 'users',
      method: 'POST',
      body: formData,
    }),
  }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation,useUploadProfileImageMutation,useGetUserDetailsQuery, useUpdateUserMutation, useDeleteUserMutation }= usersApi;
