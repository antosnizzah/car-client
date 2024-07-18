import CarCard from './carcard';
import { useGetCarsQuery } from '../apiservices/car';
export interface Car {
  vehicle_id: number;
  vehicleSpecification: {
    manufacturer: string;
    model: string;
    year: number;
    image: string;
  };
  rental_rate: number;
}


const CarList= () => {
  const { data: cars, error, isLoading } = useGetCarsQuery(undefined);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading cars</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cars.map((car: Car) => (
        <CarCard key={car.vehicle_id} car={{
          manufacturer: car.vehicleSpecification.manufacturer,
          model: car.vehicleSpecification.model,
          year: car.vehicleSpecification.year,
          rentalRate: car.rental_rate,
          image: car.vehicleSpecification.image,
          vehicle_id: car.vehicle_id
        }} />
      ))}
    </div>
  );
};

export default CarList;
