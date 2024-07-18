import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/usersAPI.reducer';
import { getTotals, setBookings } from '../slices/bookingSlice';
import { useFetchBookingsQuery, useRemoveCarFromBookingMutation } from '../apiservices/bookingApi';
import BookingComponent, { Car } from '../components/BookingComponent';

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
      engine_capacity: number;
      fuel_type: string;
      image: string;
    };
  };
}

const BookingContainer = () => {
  const booking = useSelector((state: RootState) => state.booking);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const { data: bookingsData, isLoading: isFetching } = useFetchBookingsQuery();
  const [removeCarFromBooking] = useRemoveCarFromBookingMutation();

  useEffect(() => {
    if (bookingsData) {
      const carBookings = bookingsData.map((booking: TBooking) => ({
        _id: booking.booking_id,
        name: `${booking.vehicle.vehicleSpecification.manufacturer} ${booking.vehicle.vehicleSpecification.model}`,
        desc: `${booking.vehicle.vehicleSpecification.year} ${booking.vehicle.vehicleSpecification.fuel_type}`,
        price: booking.vehicle.rental_rate,
        image: { url: booking.vehicle.vehicleSpecification.image },
        bookingQuantity: 1,
      }));
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

  return (
    <BookingComponent
      booking={{ ...booking, isLoading: isFetching }}
      auth={auth}
      onRemoveFromBooking={handleRemoveFromBooking}
      onCheckout={handleCheckout}
    />
  );
};

export default BookingContainer;
