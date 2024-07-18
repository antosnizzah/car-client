
import AdminSidebar from '../components/AdminSidebar';
import Statistics from '../components/Statistics';
import CarAvailability from '../components/CarAvailability';
import LiveCarStatus from '../components/LiveCarStatus';
import EarningsSummary from '../components/EarningsSummary';
import VehicleList from './VehicleList';
import BookingList from '../components/BookingList';
import PaymentList from '../components/PaymentList';
import UserTable from '../components/UserList';

const AdminDashboard = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Statistics />
          <CarAvailability />
        </div>
        <div className="mt-4">
          <LiveCarStatus />
        </div>
        <div className="mt-4">
          <EarningsSummary />
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Manage Bookings</h3>
          <BookingList />
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Manage Payments</h3>
          <PaymentList />
          </div>

          <div className="mt-4">
          <h3 className="text-xl font-semibold">Manage vehicles</h3>
          <VehicleList />
          <div className="mt-4">
          <h3 className="text-xl font-semibold">Manage Users</h3>
          <UserTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
