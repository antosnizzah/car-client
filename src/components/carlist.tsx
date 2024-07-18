// components/CarList.tsx
import React from 'react';
import CarCard from './carcard';
import { useGetCarsQuery } from '../apiservices/car';

const CarList: React.FC = () => {
  // Pass an empty object or undefined if no argument is needed
  const { data: cars, error, isLoading } = useGetCarsQuery(undefined);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading cars</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cars.map((car: any) => (
        <CarCard key={car.vehicle_id} car={{
          manufacturer: car.vehicleSpecification.manufacturer,
          model: car.vehicleSpecification.model,
          year: car.vehicleSpecification.year,
          rentalRate: car.rental_rate,
          image: car.vehicleSpecification.image
        }} />
      ))}
    </div>
  );
};

export default CarList;
