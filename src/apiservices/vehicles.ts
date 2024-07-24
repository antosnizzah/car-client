import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type TVehicle={
  vehicleSpec_id: number;
  manufacturer: string;
  model: string;
  year: number;
  engine_capacity: number;
  fuel_type: string;
  transmission: string;
  color: string;
  message: string;
  image:string;
  total_cost: number;
vehicle_id: number;
}
export type Tcars ={
  vehicle_id: number;
  vehicle_specification_id: number;
  rental_rate: number;
  rented_out: boolean;
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
    getVehicles: builder.query<Tcars[], void>({
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
    updateVehicle: builder.mutation<Tcars, Partial<Tcars>>({
      query: ({ vehicle_id, ...patch }) => ({
        url: `vehicles/${vehicle_id}`,
        method: 'PATCH',
        body: patch,
      }),
    }),
    // get vehicle by id
    getVehicleById: builder.query<TVehicle, number>({
      query: (vehicle_id) => `vehicles/${vehicle_id}`,
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useGetVehiclesSpecsQuery,
  useDeleteVehicleMutation,
  useAddVehicleMutation,
  useUpdateVehicleMutation,
  useGetVehicleByIdQuery,

} = vehiclesApi;
