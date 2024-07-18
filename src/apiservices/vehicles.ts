import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type TVehicle={
  vehicle_id: number;
  manufacturer: string;
  model: string;
  year: number;
  engine_capacity: number;
  fuel_type: string;
  transmission: string;
  color: string;
  message: string;
}

export interface DeleteResponse {
  msg: string;
}

export const vehiclesApi = createApi({
  reducerPath: 'vehiclesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://car-api-80da.onrender.com/',
  }),
  endpoints: (builder) => ({
    getVehicles: builder.query<TVehicle[], void>({
      query: () => 'vehicles',
    }),
    getVehiclesSpecs: builder.query<TVehicle[], void>({
        query: () => 'vehiclespecifications',
    }),
    deleteVehicle: builder.mutation<DeleteResponse, number>({
      query: (vehicle_id) => ({
        url: `vehicles/${vehicle_id}`,
        method: 'DELETE',
      }),
    }),
    addVehicle: builder.mutation<TVehicle, Partial<TVehicle>>({
      query: (newVehicle) => ({
        url: 'vehicles',
        method: 'POST',
        body: newVehicle,
      }),
    }),
    updateVehicle: builder.mutation<TVehicle, Partial<TVehicle>>({
      query: ({ vehicle_id, ...patch }) => ({
        url: `vehicles/${vehicle_id}`,
        method: 'PATCH',
        body: patch,
      }),
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useGetVehiclesSpecsQuery,
  useDeleteVehicleMutation,
  useAddVehicleMutation,
  useUpdateVehicleMutation,
} = vehiclesApi;
