import { Link } from 'react-router-dom';
import { HomeIcon, CarIcon, LogOut, User, Bitcoin, Ticket, HelpCircle } from 'lucide-react';

const AdminSidebar = () => {
  return (
    <div className="w-64 fixed top-0 bottom-0 left-0 bg-gray-800 text-white shadow-lg overflow-y-auto">
      <div className="flex items-center justify-center h-20 shadow-md bg-gray-900">
        <h1 className="text-3xl font-semibold">Car Rental</h1>
      </div>
      <nav className="mt-10 space-y-2 px-4">
        <Link to="/metrics" className="flex items-center py-2 px-4 bg-gray-700 text-white rounded-md hover:bg-gray-600">
        <HomeIcon/> Dashboard
        </Link>
        <Link to="/users" className="flex items-center py-2 px-4 text-white hover:bg-gray-700 rounded-md">
        <User/> Manage Users 
        </Link>
        <Link to="/vehicles" className="flex items-center py-2 px-4 text-white hover:bg-gray-700 rounded-md">
        <CarIcon/> Manage Vehicles 
        </Link>
        <Link to="/fleet-management" className="flex items-center py-2 px-4 text-white hover:bg-gray-700 rounded-md">
         <Ticket/> Manage Fleet
        </Link>
        <Link to="/payments" className="flex items-center py-2 px-4 text-white hover:bg-gray-700 rounded-md">
        <Bitcoin/> Manage Payments
        </Link>
        <Link to="/customer-support" className="flex items-center py-2 px-4 text-white hover:bg-gray-700 rounded-md">
         <HelpCircle/> Customer Support
        </Link>
        <Link to="/login" className="flex items-center py-2 px-4 text-white hover:bg-gray-700 rounded-md">
        <LogOut/> logout 
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
