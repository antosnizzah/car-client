import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/usersAPI.reducer';
import { getTotals, setBookings } from '../slices/bookingSlice';
import { useFetchBookingsQuery, useRemoveCarFromBookingMutation } from '../apiservices/bookingApi';
import BookingComponent, { Car } from '../components/BookingComponent';
import { TBooking } from './BookingForm';
import NavigationButtons from './backbutton';
import { Loader2, AlertTriangle } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            _id: booking.booking_id,
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
      await removeCarFromBooking({ carId: car._id.toString() }).unwrap();
      toast.success('Car removed from booking successfully!');
    } catch (error) {
      toast.error('Failed to remove car from booking.');
      console.error('Failed to remove car from booking:', error);
    }
  };

  const handleCheckout = () => {
    const bookingId = booking.bookedCars[0]._id;  // example logic
    const amount = booking.totalAmount;  // example logic
    makePayment(bookingId, amount);
    toast.success('Checkout process started.');
  };

  // Type guard to check if the error is of type FetchBaseQueryError
  const isFetchBaseQueryError = (error: unknown): error is { status: number; data: unknown } => {
    return typeof error === 'object' && error !== null && 'status' in error;
  };

  // Type guard to check if the error is of type SerializedError
  const isSerializedError = (error: unknown): error is { message: string } => {
    return typeof error === 'object' && error !== null && 'message' in error;
  };

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <NavigationButtons />
      {fetchError && (
        <div className="flex items-center bg-red-800 p-4 rounded-md mb-4">
          <AlertTriangle className="h-6 w-6 text-red-400 mr-2" />
          <p className="text-white">
            Failed to fetch bookings: 
            {isFetchBaseQueryError(fetchError) 
              ? JSON.stringify(fetchError.data) 
              : isSerializedError(fetchError) 
                ? fetchError.message 
                : 'Unknown error'}
          </p>
        </div>
      )}
      {removeError && (
        <div className="flex items-center bg-red-800 p-4 rounded-md mb-4">
          <AlertTriangle className="h-6 w-6 text-red-400 mr-2" />
          <p className="text-white">
            Failed to remove car from booking: 
            {isFetchBaseQueryError(removeError) 
              ? JSON.stringify(removeError.data) 
              : isSerializedError(removeError) 
                ? removeError.message 
                : 'Unknown error'}
          </p>
        </div>
      )}
      {isFetching && (
        <div className="flex items-center justify-center min-h-[200px]">
          <Loader2 className="animate-spin h-8 w-8 text-white" />
        </div>
      )}
      <BookingComponent
        booking={{ ...booking, isLoading: isFetching }}
        auth={auth}
        onRemoveFromBooking={handleRemoveFromBooking}
        onCheckout={handleCheckout}
      />
      <ToastContainer />
    </div>
  );
};

const makePayment = async (bookingId: number, amount: number) => {
  console.log(bookingId, amount);
  try {
    const response = await fetch('https://car-api-80da.onrender.com/checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookingId, amount }),
    });

    const { checkoutUrl } = await response.json();
    window.location.href = checkoutUrl;
  } catch (error) {
    console.error('Error creating checkout session:', error);
  }
};

export default BookingContainer;
