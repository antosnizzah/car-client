
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="lg:flex lg:flex-col bg-gray-800 text-white w-64 min-h-screen">
      <div className="flex items-center justify-center h-20 shadow-md">
        <h1 className="text-3xl font-semibold">Car Rental</h1>
      </div>
      <div className="lg:hidden p-4">
        <details className="relative">
          <summary className="btn btn-ghost text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </summary>
          <nav className="absolute right-0 bg-gray-800 shadow-lg p-4 mt-2 rounded-box w-64">
            <Link to="/dashboard" className="block py-2 px-8 bg-gray-700 text-white mb-2 rounded-md">
              Dashboard
            </Link>
            <Link to="/profile" className="block py-2 px-8 text-white hover:bg-gray-700 mb-2 rounded-md">
              Profile
            </Link>
            <Link to="/vehicles" className="block py-2 px-8 text-white hover:bg-gray-700 mb-2 rounded-md">
              Vehicles
            </Link>
            <Link to="/bookings" className="block py-2 px-8 text-white hover:bg-gray-700 mb-2 rounded-md">
              Bookings
            </Link>
            <Link to="/payments" className="block py-2 px-8 text-white hover:bg-gray-700 mb-2 rounded-md">
              Payments
            </Link>
          </nav>
        </details>
      </div>
      <nav className="hidden lg:block mt-10">
        <Link to="/dashboard" className="flex items-center py-2 px-8 bg-gray-700 text-white mb-2 rounded-md">
          Dashboard
        </Link>
        <Link to="/profile" className="flex items-center py-2 px-8 text-white hover:bg-gray-700 mb-2 rounded-md">
          Profile
        </Link>
        <Link to="/vehicles" className="flex items-center py-2 px-8 text-white hover:bg-gray-700 mb-2 rounded-md">
          Vehicles
        </Link>
        <Link to="/bookings" className="flex items-center py-2 px-8 text-white hover:bg-gray-700 mb-2 rounded-md">
          Bookings
        </Link>
        <Link to="/payments" className="flex items-center py-2 px-8 text-white hover:bg-gray-700 mb-2 rounded-md">
          Payments
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
