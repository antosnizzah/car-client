import { useGetCarsQuery, useGetLocationsBranchesQuery, useGetPromotionsQuery, useGetBookingOffersQuery } from '../apiservices/car';
import { Truck, MapPin, Tag, Calendar } from 'lucide-react';
import 'tailwindcss/tailwind.css';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement } from 'chart.js';

ChartJS.register(ArcElement, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement);

const Metrics = () => {
  const { data: cars, isLoading: loadingCars, isError: errorCars } = useGetCarsQuery();
  const { data: locationsBranches, isLoading: loadingLocations, isError: errorLocations } = useGetLocationsBranchesQuery();
  const { data: promotions, isLoading: loadingPromotions, isError: errorPromotions } = useGetPromotionsQuery();
  const { data: bookingOffers, isLoading: loadingBookingOffers, isError: errorBookingOffers } = useGetBookingOffersQuery();

  if (loadingCars || loadingLocations || loadingPromotions || loadingBookingOffers) return <p>Loading...</p>;
  if (errorCars || errorLocations || errorPromotions || errorBookingOffers) return <p>Error loading data</p>;

  const totalCars = cars?.length || 0;
  const totalLocationsBranches = locationsBranches?.length || 0;
  const totalPromotions = promotions?.length || 0;
  const totalBookingOffers = bookingOffers?.length || 0;

  const pieData = {
    labels: ['Cars', 'Locations', 'Promotions', 'Booking Offers'],
    datasets: [
      {
        data: [totalCars, totalLocationsBranches, totalPromotions, totalBookingOffers],
        backgroundColor: ['#60a5fa', '#34d399', '#fbbf24', '#f87171'],
        hoverBackgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
      },
    ],
  };

  const barData = {
    labels: ['Cars', 'Locations', 'Promotions', 'Booking Offers'],
    datasets: [
      {
        label: 'Count',
        data: [totalCars, totalLocationsBranches, totalPromotions, totalBookingOffers],
        backgroundColor: ['#60a5fa', '#34d399', '#fbbf24', '#f87171'],
      },
    ],
  };

  const lineData = {
    labels: ['Cars', 'Locations', 'Promotions', 'Booking Offers'],
    datasets: [
      {
        label: 'Count',
        data: [totalCars, totalLocationsBranches, totalPromotions, totalBookingOffers],
        borderColor: '#60a5fa',
        backgroundColor: '#60a5fa',
        fill: false,
      },
    ],
  };

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
          <Truck className="w-8 h-8 text-blue-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Cars</h3>
            <p className="text-2xl font-bold">{totalCars}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-4 transform transition-transform duration-300 hover:scale-105">
          <MapPin className="w-8 h-8 text-purple-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Locations</h3>
            <p className="text-2xl font-bold">{totalLocationsBranches}</p>
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
          <Calendar className="w-8 h-8 text-green-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Booking Offers</h3>
            <p className="text-2xl font-bold">{totalBookingOffers}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Metrics Pie Chart</h3>
          <div className="h-48">
            <Pie data={pieData} />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Metrics Bar Chart</h3>
          <div className="h-48">
            <Bar data={barData} />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Metrics Line Graph</h3>
          <div className="h-48">
            <Line data={lineData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
