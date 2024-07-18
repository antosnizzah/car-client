import { useFetchBookingsQuery } from '../apiservices/bookingApi';
import CarCard from './AvailabeCars';
import '../index.css';

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
          {bookingsData && bookingsData.map((booking: any) => (
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
