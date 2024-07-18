
import Sidebar from '../components/Sidebar';
import { HomeIcon, CarIcon, UserIcon, CalendarIcon, BarChartIcon, LogOut } from 'lucide-react';

const UserDashboard = () => {
  const userLinks = [
    { to: '/User-dashboard', label: 'Dashboard', icon: <HomeIcon className="w-6 h-6" /> },
    { to: '/carlist', label: 'Cars', icon: <CarIcon className="w-6 h-6" /> },
    { to: '/bookings', label: 'my bookings', icon: <CarIcon className="w-6 h-6" /> },
    { to: '/login', label: 'Logout', icon: <LogOut className="w-6 h-6" /> },
  ]; 
  return (
    <>
    <h2>anthonys co lltc</h2>
    <div className="flex bg-gray-800">
      <Sidebar title="Car Rentals" links={userLinks} />
      <div className="flex-1 p-6 text-white">
        <h2 className="text-2xl font-semibold">User Dashboard</h2>
        <div className="mt-6">
        </div>
      </div>
    </div>
    </>
  );
};

export default UserDashboard;
