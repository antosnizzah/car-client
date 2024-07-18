// src/api/authApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface User {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        username: string;
        role: string;
    };
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://car-api-80da.onrender.com/' }),
    endpoints: (builder) => ({
        register: builder.mutation<AuthResponse, User>({
            query: (user) => ({
                url: 'auth/register',
                method: 'POST',
                body: user,
            }),
        }),
        login: builder.mutation<AuthResponse, User>({
            query: (user) => ({
                url: 'auth/login',
                method: 'POST',
                body: user,
            }),
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } :any= authApi;
