// // src/components/Metrics.tsx
// import { useGetCarsQuery } from '../apiservices/car';
// import { useFetchBookingsQuery } from '../apiservices/bookingApi';
// import { useFetchFleetsQuery } from '../apiservices/fleetmanagement';
// import { useGetUsersQuery } from '../apiservices/users';
// import { Truck, Calendar, Users, FileText } from 'lucide-react';
// import 'tailwindcss/tailwind.css';
// import { Pie, Bar, Line } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement } from 'chart.js';

// ChartJS.register(ArcElement, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement);

// const Metrics = () => {
//   const { data: cars, isLoading: loadingCars, isError: errorCars } = useGetCarsQuery();
//   const { data: bookings, isLoading: loadingBookings, isError: errorBookings } = useFetchBookingsQuery();
//   const { data: fleets, isLoading: loadingFleets, isError: errorFleets } = useFetchFleetsQuery();
//   const { data: users, isLoading: loadingUsers, isError: errorUsers } = useGetUsersQuery();

//   if (loadingCars || loadingBookings || loadingFleets || loadingUsers) return <p>Loading...</p>;
//   if (errorCars || errorBookings || errorFleets || errorUsers) return <p>Error loading data</p>;

//   const totalCars = cars?.length || 0;
//   const totalBookings = bookings?.length || 0;
//   const totalFleets = fleets?.length || 0;
//   const totalUsers = users?.length || 0;

//   const pieData = {
//     labels: ['Cars', 'Bookings', 'Fleets', 'Users'],
//     datasets: [
//       {
//         data: [totalCars, totalBookings, totalFleets, totalUsers],
//         backgroundColor: ['#60a5fa', '#34d399', '#fbbf24', '#f87171'],
//         hoverBackgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
//       },
//     ],
//   };

//   const barData = {
//     labels: ['Cars', 'Bookings', 'Fleets', 'Users'],
//     datasets: [
//       {
//         label: 'Count',
//         data: [totalCars, totalBookings, totalFleets, totalUsers],
//         backgroundColor: ['#60a5fa', '#34d399', '#fbbf24', '#f87171'],
//       },
//     ],
//   };

//   const lineData = {
//     labels: ['Cars', 'Bookings', 'Fleets', 'Users'],
//     datasets: [
//       {
//         label: 'Count',
//         data: [totalCars, totalBookings, totalFleets, totalUsers],
//         borderColor: '#60a5fa',
//         backgroundColor: '#60a5fa',
//         fill: false,
//       },
//     ],
//   };

//   return (
//     <div className="p-4 space-y-4">
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
//           <Truck className="w-8 h-8 text-blue-500" />
//           <div>
//             <h3 className="text-lg font-semibold">Total Cars</h3>
//             <p className="text-2xl font-bold">{totalCars}</p>
//           </div>
//         </div>

//         <div className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
//           <Calendar className="w-8 h-8 text-green-500" />
//           <div>
//             <h3 className="text-lg font-semibold">Total Bookings</h3>
//             <p className="text-2xl font-bold">{totalBookings}</p>
//           </div>
//         </div>

//         <div className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
//           <FileText className="w-8 h-8 text-yellow-500" />
//           <div>
//             <h3 className="text-lg font-semibold">Total Fleets</h3>
//             <p className="text-2xl font-bold">{totalFleets}</p>
//           </div>
//         </div>

//         <div className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
//           <Users className="w-8 h-8 text-red-500" />
//           <div>
//             <h3 className="text-lg font-semibold">Total Users</h3>
//             <p className="text-2xl font-bold">{totalUsers}</p>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-white shadow-md rounded-lg p-4">
//           <h3 className="text-lg font-semibold mb-4">Metrics Pie Chart</h3>
//           <div className="h-48">
//             <Pie data={pieData} />
//           </div>
//         </div>

//         <div className="bg-white shadow-md rounded-lg p-4">
//           <h3 className="text-lg font-semibold mb-4">Metrics Bar Chart</h3>
//           <div className="h-48">
//             <Bar data={barData} />
//           </div>
//         </div>

//         <div className="bg-white shadow-md rounded-lg p-4">
//           <h3 className="text-lg font-semibold mb-4">Metrics Line Graph</h3>
//           <div className="h-48">
//             <Line data={lineData} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Metrics;


import React from 'react';
import { useGetCarsQuery, useGetLocationsBranchesQuery, useGetMaintenanceRecordsQuery, useGetPromotionsQuery, useGetReviewsRatingQuery, useGetBookingOffersQuery } from '../apiservices/car';
import { useFetchBookingsQuery } from '../apiservices/bookingApi';
import { useFetchFleetsQuery } from '../apiservices/fleetmanagement';
import { useGetUsersQuery } from '../apiservices/users';
import { Truck, Calendar, Users, FileText, MapPin, Wrench, Tag, Star } from 'lucide-react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement } from 'chart.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import ClipLoader from 'react-spinners/ClipLoader';

ChartJS.register(ArcElement, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement);

const Metrics = () => {
  const { data: cars, isLoading: loadingCars, isError: errorCars } = useGetCarsQuery();
  const { data: bookings, isLoading: loadingBookings, isError: errorBookings } = useFetchBookingsQuery();
  const { data: fleets, isLoading: loadingFleets, isError: errorFleets } = useFetchFleetsQuery();
  const { data: users, isLoading: loadingUsers, isError: errorUsers } = useGetUsersQuery();
  const { data: locationsBranches, isLoading: loadingLocations, isError: errorLocations } = useGetLocationsBranchesQuery();
  const { data: maintenanceRecords, isLoading: loadingMaintenance, isError: errorMaintenance } = useGetMaintenanceRecordsQuery();
  const { data: promotions, isLoading: loadingPromotions, isError: errorPromotions } = useGetPromotionsQuery();
  const { data: reviews, isLoading: loadingReviews, isError: errorReviews } = useGetReviewsRatingQuery();
  const { data: bookingOffers, isLoading: loadingBookingOffers, isError: errorBookingOffers } = useGetBookingOffersQuery();

  React.useEffect(() => {
    if (errorCars || errorBookings || errorFleets || errorUsers || errorLocations || errorMaintenance || errorPromotions || errorReviews || errorBookingOffers) {
      toast.error('Error loading data');
    }
  }, [errorCars, errorBookings, errorFleets, errorUsers, errorLocations, errorMaintenance, errorPromotions, errorReviews, errorBookingOffers]);

  if (loadingCars || loadingBookings || loadingFleets || loadingUsers || loadingLocations || loadingMaintenance || loadingPromotions || loadingReviews || loadingBookingOffers) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#4A90E2" />
      </div>
    );
  }

  // Debugging data fetching
  console.log('Cars:', cars);
  console.log('Bookings:', bookings);
  console.log('Fleets:', fleets);
  console.log('Users:', users);
  console.log('LocationsBranches:', locationsBranches);
  console.log('MaintenanceRecords:', maintenanceRecords);
  console.log('Promotions:', promotions);
  console.log('Reviews:', reviews);
  console.log('BookingOffers:', bookingOffers);

  const totalCars = cars?.length || 0;
  const totalBookings = bookings?.length || 0;
  const totalFleets = fleets?.length || 0;
  const totalUsers = users?.length || 0;
  const totalLocationsBranches = locationsBranches?.length || 0;
  const totalMaintenanceRecords = maintenanceRecords?.length || 0;
  const totalPromotions = promotions?.length || 0;
  const totalReviews = reviews?.length || 0;

  const pieData = {
    labels: ['Cars', 'Bookings', 'Fleets', 'Users'],
    datasets: [
      {
        data: [totalCars, totalBookings, totalFleets, totalUsers],
        backgroundColor: ['#60a5fa', '#34d399', '#fbbf24', '#f87171'],
        hoverBackgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
      },
    ],
  };

  const barData = {
    labels: ['Cars', 'Bookings', 'Fleets', 'Users'],
    datasets: [
      {
        label: 'Count',
        data: [totalCars, totalBookings, totalFleets, totalUsers],
        backgroundColor: ['#60a5fa', '#34d399', '#fbbf24', '#f87171'],
      },
    ],
  };

  const lineData = {
    labels: ['Cars', 'Bookings', 'Fleets', 'Users'],
    datasets: [
      {
        label: 'Count',
        data: [totalCars, totalBookings, totalFleets, totalUsers],
        borderColor: '#60a5fa',
        backgroundColor: '#60a5fa',
        fill: false,
      },
    ],
  };

  return (
    <div className="p-4 space-y-4">
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
          <Truck className="w-8 h-8 text-blue-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Cars</h3>
            <p className="text-2xl font-bold">{totalCars}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
          <Calendar className="w-8 h-8 text-green-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Bookings</h3>
            <p className="text-2xl font-bold">{totalBookings}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
          <FileText className="w-8 h-8 text-yellow-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Fleets</h3>
            <p className="text-2xl font-bold">{totalFleets}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
          <Users className="w-8 h-8 text-red-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
          <MapPin className="w-8 h-8 text-purple-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Locations</h3>
            <p className="text-2xl font-bold">{totalLocationsBranches}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
          <Wrench className="w-8 h-8 text-indigo-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Maintenance</h3>
            <p className="text-2xl font-bold">{totalMaintenanceRecords}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
          <Tag className="w-8 h-8 text-pink-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Promotions</h3>
            <p className="text-2xl font-bold">{totalPromotions}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
          <Star className="w-8 h-8 text-orange-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Reviews</h3>
            <p className="text-2xl font-bold">{totalReviews}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Metrics Pie Chart</h3>
          <div className="h-64">
            <Pie data={pieData} />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Metrics Bar Chart</h3>
          <div className="h-64">
            <Bar data={barData} />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Metrics Line Graph</h3>
          <div className="h-64">
            <Line data={lineData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metrics;

