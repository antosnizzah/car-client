
// import { useForm } from 'react-hook-form';
// import { bookingApi } from '../apiservices/bookingApi';
// import { TUser } from '../apiservices/users';
// import { RootState } from '../store/usersAPI.reducer';
// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { vehiclesApi } from '../apiservices/vehicles';

// export interface Booking {
//   location_id: number;
//   booking_date: string;
//   return_date: string;
//   total_cost: number;
//   user_id: number;
//   vehicleSpec_id: number;
// }

// const BookingForm = () => {
//   const { data: getVehicle } = vehiclesApi.useGetVehiclesQuery();
//   const { data: VehicleSpecs } = vehiclesApi.useGetVehiclesSpecsQuery();
//   const { data: getLocations } = bookingApi.useFetchLocationQuery();
//   const { register, handleSubmit, formState: { errors } } = useForm<Booking>();
//   const [createBooking] = bookingApi.useAddCarToBookingMutation();

//   const { id } = useParams<{ id: string }>();
//   const vehicle = getVehicle?.find(v => v.vehicle_id === Number(id));
//   const vehicleSpec = VehicleSpecs?.find(v => v.vehicleSpec_id === Number(id));

//   // Get user id from the store
//   const state = useSelector((state: RootState) => state.auth);
//   const user = state.user as TUser | null;
//   const { id: uid } = user as TUser;


//   const onSubmit = async (data:Booking) => {
//     try {

//       data.user_id = uid;
//       data.vehicleSpec_id = vehicleSpec?.vehicleSpec_id || 0;
//       data.total_cost = Number(vehicleSpec?.total_cost) || 0;
//       data.location_id = Number(data.location_id)

//       console.log('Booking Data:', data);

//       const response = await createBooking(data).unwrap();
//       console.log('Booking Response:', response);

//       alert('Booking created successfully');
//     } catch (error) {
//       console.error('Failed to create booking:', error);
//     }
//   };

//   return (
//     <div className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto mt-10">
//       <h1 className="text-2xl font-bold mb-4">Book a Vehicle</h1>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="mb-4">
//           <label className="block text-gray-700">Location</label>
//           <select
//             {...register('location_id', { required: 'Location is required' })}
//             className="w-full p-2 border border-gray-300 rounded mt-1"
//           >
//             {getLocations?.map(location => (
//               <option key={location.location_id} value={location.location_id}>
//                 {location.location_name}
//               </option>
//             ))}
//           </select>
//           {errors.location_id && <p className="text-red-500">{errors.location_id.message}</p>}
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Booking Date</label>
//           <input
//             type="date"
//             {...register('booking_date', { required: 'Booking date is required' })}
//             className="w-full p-2 border border-gray-300 rounded mt-1"
//           />
//           {errors.booking_date && <p className="text-red-500">{errors.booking_date.message}</p>}
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Return Date</label>
//           <input
//             type="date"
//             {...register('return_date', { required: 'Return date is required' })}
//             className="w-full p-2 border border-gray-300 rounded mt-1"
//           />
//           {errors.return_date && <p className="text-red-500">{errors.return_date.message}</p>}
//         </div>

//         <input
//           type="hidden"
//           value={uid}
//         />

//         <input
//           type="hidden"
//           value={vehicle?.vehicle_id || 0}
//         />

//         <input
//           type="hidden"
//           value={vehicleSpec?.total_cost || 0}
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
//         >
//           Book Now
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BookingForm;
import { useForm } from 'react-hook-form';
import { bookingApi } from '../apiservices/bookingApi';
import { TUser } from '../apiservices/users';
import { RootState } from '../store/usersAPI.reducer';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { vehiclesApi } from '../apiservices/vehicles';

export interface TBooking {
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


const BookingForm = () => {
  // const { data: getVehicle } = vehiclesApi.useGetVehiclesQuery();
  const { data: VehicleSpecs } = vehiclesApi.useGetVehiclesSpecsQuery();
  const { data: getLocations } = bookingApi.useFetchLocationQuery();
  const { register, handleSubmit, formState: { errors } } = useForm<TBooking>();
  const [createBooking] = bookingApi.useAddCarToBookingMutation();

  const { id } = useParams<{ id: string }>();
  // const vehicle = getVehicle?.find(v => v.vehicle_id === Number(id));
  const vehicleSpec = VehicleSpecs?.find(v => v.vehicleSpec_id === Number(id));

  const state = useSelector((state: RootState) => state.auth);
  const user = state.user as TUser | null;
  const uid = user?.id || 0;

  const onSubmit = async (data: TBooking) => {
    try {
      data.user_id = uid;
      data.vehicleSpec_id = vehicleSpec?.vehicleSpec_id || 0;
      data.total_cost = vehicleSpec?.total_cost || 0;
      data.location_id = Number(data.location_id);

      console.log('Booking Data:', data);

      const response = await createBooking(data).unwrap();
      console.log('Booking Response:', response);

      alert('Booking created successfully');
    } catch (error) {
      console.error('Failed to create booking:', error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Book a Vehicle</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <select
            {...register('location_id', { required: 'Location is required' })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            {getLocations?.map(location => (
              <option key={location.location_id} value={location.location_id}>
                {location.location_name}
              </option>
            ))}
          </select>
          {errors.location_id && <p className="text-red-500">{errors.location_id.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Booking Date</label>
          <input
            type="date"
            {...register('booking_date', { required: 'Booking date is required' })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.booking_date && <p className="text-red-500">{errors.booking_date.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Return Date</label>
          <input
            type="date"
            {...register('return_date', { required: 'Return date is required' })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.return_date && <p className="text-red-500">{errors.return_date.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
