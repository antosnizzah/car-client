import { useFetchBookingsQuery } from '../apiservices/bookingApi';
import CarCard from './AvailabeCars';
import '../index.css';


export interface TBooking {
  booking_id: number;
  location_id: number;
  booking_date: string;
  return_date: string;
  total_cost: string;
  status: string;
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
      engine_capacity: string;
      fuel_type: string;
      transmission: string;
      image: string;
    };
  };
}
const AvailableCars = () => {
  const { data: bookingsData, error, isLoading: isFetching } = useFetchBookingsQuery();

  return (
    <div className="available-cars p-4">
      <h2 className="text-2xl font-bold mb-4">Booked Cars</h2>
      {isFetching ? (
        <p className="text-gray-700">Loading cars...</p>
      ) : error ? (
        <p className="text-red-500">Error fetching cars</p>
      ) : (
        <div className="car-list flex flex-wrap -m-4">
          {Array.isArray(bookingsData) && bookingsData.map((booking: TBooking) => (
            <CarCard
              key={booking.booking_id}
              manufacturer={booking.vehicle.vehicleSpecification.manufacturer}
              model={booking.vehicle.vehicleSpecification.model}
              year={booking.vehicle.vehicleSpecification.year}
              engineCapacity={booking.vehicle.vehicleSpecification.engine_capacity}
              fuelType={booking.vehicle.vehicleSpecification.fuel_type}
              transmission={booking.vehicle.vehicleSpecification.transmission}
              rate={booking.vehicle.rental_rate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableCars;
