import React from 'react';
import { Link } from 'react-router-dom';
import NavigationButtons from './backbutton';
import { Loader2, ArrowLeft, Trash2 } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface Car {
  _id: number;
  name: string;
  desc: string;
  price: number;
  image?: { url: string };
  bookingQuantity: number;
}

export interface AuthState {}

export interface BookingProps {
  booking: {
    isLoading: boolean;
    error: string | null;
    bookedCars: Car[];
    totalAmount: number;
    booking_id: number;
  };
  auth: AuthState;
  onRemoveFromBooking: (car: Car) => void;
}

const BookingComponent: React.FC<BookingProps> = ({
  booking,
  onRemoveFromBooking,
}) => {
  // Notify user about errors or successful actions
  const notifyError = (message: string) => toast.error(message);
  // const notifySuccess = (message: string) => toast.success(message);

  React.useEffect(() => {
    if (booking.error) {
      notifyError('Error fetching bookings');
    }
  }, [booking.error]);

  const makePayment = async (bookingId: number, amount: number) => {
    console.log('Booking ID:', bookingId);
    console.log('Amount:', amount);
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

  return (
    <>
      <div className="container mx-auto p-4">
        <NavigationButtons />
        <h2 className="text-2xl font-bold text-white mb-6">Car Booking</h2>
        {booking.isLoading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <Loader2 className="animate-spin h-8 w-8 text-white" />
          </div>
        ) : booking.error ? (
          <p className="text-red-600">Error fetching bookings</p>
        ) : booking.bookedCars.length === 0 ? (
          <div className="text-center text-white">
            <p>Your booking is currently empty</p>
            <div className="mt-4">
              <Link to="/carlist" className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center">
                <ArrowLeft className="mr-2" />
                Start Booking
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {booking.bookedCars.map((car: Car) => (
                <div className="bg-gray-800 p-4 rounded-lg shadow-md" key={car._id}>
                  <img src={car.image?.url} alt={car.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                  <div className="text-center text-white">
                    <h3 className="font-semibold text-lg">{car.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">{car.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold">${car.price * car.bookingQuantity}</span>
                      <button
                        onClick={() => onRemoveFromBooking(car)}
                        className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-700 flex items-center"
                      >
                        <Trash2 className="mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between items-center text-white">
              <span className="text-xl font-semibold">Total: ${booking.totalAmount}</span>
              <button
                onClick={() => makePayment(booking.booking_id, booking.totalAmount)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default BookingComponent;
