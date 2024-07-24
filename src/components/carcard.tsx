// components/CarCard.tsx
import { Link } from 'react-router-dom';
import { Tcars, TVehicle, vehiclesApi } from '../apiservices/vehicles';

export interface Car {
  manufacturer: string;
  model: string;
  year: number;
  rentalRate: number;
  image?: string;
  vehicle_id: number;
}

const CarCard = () => {
  const { data: getVehicle } = vehiclesApi.useGetVehiclesSpecsQuery();
  const { data: vehicle } = vehiclesApi.useGetVehiclesQuery();

  const combineData = () => {
    if (!getVehicle || !vehicle) return [];

    return getVehicle?.map((car: TVehicle) => {
      const vehicleSpec = vehicle?.find((v: Tcars) => v.vehicle_id === car.vehicleSpec_id);
      return { ...car, ...vehicleSpec };
    });
  }

  const combined = combineData();

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4'>
      {combined?.map(car =>
        <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" key={car.vehicle_id}>
          <img src={car.image} alt={`${car.manufacturer} ${car.model}`} className="w-full h-48 object-cover rounded-md mb-4" />
          <h3 className="text-lg font-semibold">{`${car.manufacturer} ${car.model} (${car.year})`}</h3>
          <p className="text-gray-600">{`$${car.amount}/day`}</p>
          <div className="mt-4 flex justify-between">
            <Link to={`/vehicle/${car.vehicle_specification_id}`} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">details</Link>
            <Link to={`/vehicle/${car.vehicle_specification_id}/booking-details`} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700">rent now</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarCard;
