import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TUser {
  user_id: number;
  full_name: string;
  email: string;
  contact_phone: string;
  address: string;
}

export interface DeleteResponse {
  msg: string;
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: ' http://localhost:8000/' }),
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
  }),
});

export const { useGetUsersQuery, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation }= usersApi;
