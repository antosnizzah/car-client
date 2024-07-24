import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/usersAPI.reducer';
import { getTotals, setBookings } from '../slices/bookingSlice';
import { useFetchBookingsQuery, useRemoveCarFromBookingMutation } from '../apiservices/bookingApi';
import BookingComponent, { Car } from '../components/BookingComponent';
import { TBooking } from './BookingForm';

const BookingContainer = () => {
  const booking = useSelector((state: RootState) => state.booking);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const { data: bookingsData, isLoading: isFetching, error: fetchError } = useFetchBookingsQuery();
  const [removeCarFromBooking, { error: removeError }] = useRemoveCarFromBookingMutation();

  useEffect(() => {
    if (bookingsData) {
      const carBookings = Array.isArray(bookingsData)
        ? bookingsData.map((booking: TBooking) => ({
            _id: booking.booking_id.toString(),
            name: `${booking.vehicle.vehicleSpecification.manufacturer} ${booking.vehicle.vehicleSpecification.model}`,
            desc: `${booking.vehicle.vehicleSpecification.year} ${booking.vehicle.vehicleSpecification.fuel_type}`,
            price: booking.vehicle.rental_rate,
            image: { url: booking.vehicle.vehicleSpecification.image },
            bookingQuantity: 1,
          }))
        : [];
      dispatch(setBookings(carBookings));
    }
    dispatch(getTotals());
  }, [bookingsData, dispatch]);

  const handleRemoveFromBooking = async (car: Car) => {
    try {
      await removeCarFromBooking({ carId: car._id }).unwrap();
    } catch (error) {
      console.error('Failed to remove car from booking:', error);
    }
  };

  const handleCheckout = () => {
    console.log('Checkout initiated');
  };

  // Type guard to check if the error is of type FetchBaseQueryError
  const isFetchBaseQueryError = (error:unknown): error is { status: number; data: unknown } => {
    return typeof error === 'object' && error !== null && 'status' in error;
  };

  // Type guard to check if the error is of type SerializedError
  const isSerializedError = (error: unknown): error is { message: string } => {
    return typeof error === 'object' && error !== null && 'message' in error;
  };

  return (
    <div>
      {fetchError && (
        <p className="error">
          Failed to fetch bookings: 
          {isFetchBaseQueryError(fetchError) 
            ? JSON.stringify(fetchError.data) 
            : isSerializedError(fetchError) 
              ? fetchError.message 
              : 'Unknown error'}
        </p>
      )}
      {removeError && (
        <p className="error">
          Failed to remove car from booking: 
          {isFetchBaseQueryError(removeError) 
            ? JSON.stringify(removeError.data) 
            : isSerializedError(removeError) 
              ? removeError.message 
              : 'Unknown error'}
        </p>
      )}
      <BookingComponent
        booking={{ ...booking, isLoading: isFetching }}
        auth={auth}
        onRemoveFromBooking={handleRemoveFromBooking}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default BookingContainer;
