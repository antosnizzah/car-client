// import React from 'react';
// import { Link } from 'react-router-dom';
// import NavigationButtons from './backbutton';

// export interface Car {
//   _id: string;
//   name: string;
//   desc: string;
//   price: number;
//   image?: { url: string };
//   bookingQuantity: number;
// }

// interface AuthState {
// }

// interface BookingProps {
//   booking: {
//     isLoading: boolean;
//     error: string | null;
//     bookedCars: Car[];
//     totalAmount: number;
//   };
//   auth: AuthState;
//   onRemoveFromBooking: (car: Car) => void;
//   onCheckout: () => void;
// }


// const BookingComponent: React.FC<BookingProps> = ({
//   booking,


//   onRemoveFromBooking,

//   onCheckout
// }) => {


//   return (
//     <div className="container mx-auto p-4">
//       <NavigationButtons/>
//       <h2 className="text-2xl font-bold text-white mb-6">Car Booking</h2>
//       {booking.isLoading ? (
//         <p>Loading bookings...</p>
//       ) : booking.error ? (
//         <p>Error fetching bookings</p>
//       ) : booking.bookedCars.length === 0 ? (
//         <div className="booking-empty">
//           <p>Your booking is currently empty</p>
//           <div className="start-booking mt-4">
//             <Link to="/carlist" className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20"
//                 height="20"
//                 fill="currentColor"
//                 className="bi bi-arrow-left mr-2"
//                 viewBox="0 0 16 16"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
//                 />
//               </svg>
//               Start Booking
//             </Link>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <div className="booking-items grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {booking.bookedCars.map((car: Car) => (
//               <div className="bg-gray-800 p-4 rounded-lg" key={car._id}>
//                 <img src={car.image?.url} alt={car.name} className="w-full h-48 object-cover rounded-lg mb-4" />
//                 <div className="flex flex-col items-center text-center">
//                   <h3 className="font-semibold text-white">{car.name}</h3>
//                   <p className="text-sm text-gray-400">{car.desc}</p>
  
//                   <div className="flex items-center justify-between w-full mt-2">
//                     <span className="text-white">${car.price * car.bookingQuantity}</span>
//                     <button
//                       onClick={() => onRemoveFromBooking(car)}
//                       className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-700"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="mt-6 flex justify-between items-center">
//             <div className="flex items-center">
//               <span className="text-xl font-semibold text-white mr-4">Total: ${booking.totalAmount}</span>
//               <Link to="/payments/54" className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center">
//                 <button onClick={onCheckout} className="bg-blue-500 text-white py-2 px-4 rounded-lg">
//                   Checkout
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingComponent;
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
  };
  auth: AuthState;
  onRemoveFromBooking: (car: Car) => void;
  onCheckout: () => void;
}

const BookingComponent: React.FC<BookingProps> = ({
  booking,
  onRemoveFromBooking,
  onCheckout,
}) => {
  // Notify user about errors or successful actions
  const notifyError = (message: string) => toast.error(message);
  // const notifySuccess = (message: string) => toast.success(message);

  React.useEffect(() => {
    if (booking.error) {
      notifyError('Error fetching bookings');
    }
  }, [booking.error]);

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
                onClick={onCheckout}
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

