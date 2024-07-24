import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type Tfleet = {
  vehicle_id: number;
  fleet_id: number;
  vehicle_status: string;
  current_value: number;
  maintainance_status: string;
  insurance_status: string;
};

export const fleetApi = createApi({
  reducerPath: 'fleetApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://car-api-80da.onrender.com/' }), // Replace with your backend URL
  endpoints: (builder) => ({
    fetchFleets: builder.query<Tfleet[], void>({
      query: () => '/fleetmanagement',
    }),
    getFleet: builder.query<Tfleet, number>({
      query: (fleet_id) => `/fleetmanagement/${fleet_id}`,
    }),
    addFleet: builder.mutation<Tfleet, Partial<Tfleet>>({
      query: (newFleet) => ({
        url: '/fleetmanagement',
        method: 'POST',
        body: newFleet,
      }),
    }),
    updateFleet: builder.mutation<Tfleet, { fleet_id: number; data: Partial<Tfleet> }>({
      query: ({ fleet_id, data }) => ({
        url: `/fleetmanagement/${fleet_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    removeFleet: builder.mutation<{ success: boolean }, number>({
      query: (fleet_id) => ({
        url: `/fleetmanagement/${fleet_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchFleetsQuery,
  useGetFleetQuery,
  useAddFleetMutation,
  useUpdateFleetMutation,
  useRemoveFleetMutation,
} = fleetApi;
