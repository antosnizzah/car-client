import { useParams, Link } from 'react-router-dom';
import { vehiclesApi } from '../apiservices/vehicles';
import NavigationButtons from '../components/backbutton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader2, AlertTriangle } from 'lucide-react';

const Cardetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: getVehicle, isLoading, error } = vehiclesApi.useGetVehiclesSpecsQuery();
  const vehicle = getVehicle?.find(v => v.vehicleSpec_id === Number(id));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-600">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    toast.error('Failed to fetch vehicle details');
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-600">
        <div className="text-red-500">
          <AlertTriangle className="h-8 w-8 inline-block" /> Error loading details.
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return <div className="text-center mt-10 text-gray-700">Vehicle not found</div>;
  }

  return (
    <>
      <NavigationButtons />
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} pauseOnHover={true} draggable={true} />
      <div className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto mt-10">
        <img src={vehicle.image} alt={vehicle.model} className="w-full h-64 object-cover rounded-md" />
        <h1 className="text-2xl font-bold mt-4 mb-2">{vehicle.model}</h1>
        <p className="text-gray-700"><span className="font-semibold">Manufacturer:</span> {vehicle.manufacturer}</p>
        <p className="text-gray-700"><span className="font-semibold">Year:</span> {vehicle.year}</p>
        <p className="text-gray-700"><span className="font-semibold">Engine Capacity:</span> {vehicle.engine_capacity} cc</p>
        <p className="text-gray-700"><span className="font-semibold">Fuel Type:</span> {vehicle.fuel_type}</p>
        <p className="text-gray-700"><span className="font-semibold">Transmission:</span> {vehicle.transmission}</p>
        <p className="text-gray-700"><span className="font-semibold">Color:</span> {vehicle.color}</p>
        <p className="text-gray-700"><span className="font-semibold">Price:</span> ${vehicle.total_cost}</p>
        <p className="text-gray-700 mt-4">{vehicle.message}</p>
        <Link
          to={`/vehicle/${vehicle.vehicleSpec_id}/booking-details`}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Book Now
        </Link>
      </div>
    </>
  );
};

export default Cardetails;
