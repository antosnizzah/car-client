
import { useSelector } from 'react-redux';
import { RootState } from '../store/usersAPI.reducer';
import Sidebar from '../components/Sidebar';
import { HomeIcon, CarIcon, LogOut, User, Bitcoin } from 'lucide-react';
import Metrics from './usersmetrics';

const UserDashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const userLinks = [
    { to: '/User-dashboard', label: 'Dashboard', icon: <HomeIcon className="w-6 h-6" /> },
    { to: '/carlist', label: 'Cars', icon: <CarIcon className="w-6 h-6" /> },
    { to: '/bookings', label: 'My Bookings', icon: <CarIcon className="w-6 h-6" /> },
    { to: '/login', label: 'Logout', icon: <LogOut className="w-6 h-6" /> },
    { to: '/profile', label: 'Profile', icon: <User className="w-6 h-6" /> },
    { to: '/payments', label: 'my payments', icon: <Bitcoin className="w-6 h-6" /> },
  ]; 

  return (
    <>
      <h2>Anthony's Co Ltd</h2>
      <div className="flex bg-gray-800">
        <Sidebar title="Car Rentals" links={userLinks} />
        <div className="flex-1 p-6 text-white">
          <h2 className="text-2xl font-semibold">
            Welcome back, {user?.username || 'Guest'}!
          </h2>
          <div className="mt-6">
            <Metrics />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
