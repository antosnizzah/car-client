
import AdminSidebar from '../components/AdminSidebar';
import Statistics from '../components/Statistics';
import LiveCarStatus from '../components/LiveCarStatus';
import EarningsSummary from '../components/EarningsSummary';
const AdminDashboard = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Statistics />
        </div>
        <div className="mt-4">
          <LiveCarStatus />
        </div>
        <div className="mt-4">
          <EarningsSummary />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
