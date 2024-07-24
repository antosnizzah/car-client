import React from 'react';
import { Link } from 'react-router-dom';

export interface Car {
  _id: string;
  name: string;
  desc: string;
  price: number;
  image?: { url: string };
  bookingQuantity: number;
}

interface AuthState {
}

interface BookingProps {
  booking: {
    isLoading: boolean;
    error: string | null;
    bookedCars: Car[];
    totalAmount: number;
  };
  auth: AuthState;
  onRemoveFromBooking: (car: Car) => void;
  onCheckout: () => void;
}


const BookingComponent: React.FC<BookingProps> = ({
  booking,


  onRemoveFromBooking,

  onCheckout
}) => {


  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-white mb-6">Car Booking</h2>
      {booking.isLoading ? (
        <p>Loading bookings...</p>
      ) : booking.error ? (
        <p>Error fetching bookings</p>
      ) : booking.bookedCars.length === 0 ? (
        <div className="booking-empty">
          <p>Your booking is currently empty</p>
          <div className="start-booking mt-4">
            <Link to="/carlist" className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left mr-2"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              Start Booking
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="booking-items grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {booking.bookedCars.map((car: Car) => (
              <div className="bg-gray-800 p-4 rounded-lg" key={car._id}>
                <img src={car.image?.url} alt={car.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <div className="flex flex-col items-center text-center">
                  <h3 className="font-semibold text-white">{car.name}</h3>
                  <p className="text-sm text-gray-400">{car.desc}</p>
  
                  <div className="flex items-center justify-between w-full mt-2">
                    <span className="text-white">${car.price * car.bookingQuantity}</span>
                    <button
                      onClick={() => onRemoveFromBooking(car)}
                      className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-white mr-4">Total: ${booking.totalAmount}</span>
              <Link to="/payments/54" className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center">
                <button onClick={onCheckout} className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingComponent;
