import React, { useState } from 'react';
import { Tfleet, useFetchFleetsQuery, useRemoveFleetMutation, useUpdateFleetMutation } from '../apiservices/fleetmanagement'; // Adjust the path as necessary
import NavigationButtons from '../components/backbutton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader2, Trash2, Edit } from 'lucide-react';

const FleetList: React.FC = () => {
  const { data: fleets, error, isLoading } = useFetchFleetsQuery();
  const [removeFleet] = useRemoveFleetMutation();
  const [updateFleet] = useUpdateFleetMutation();
  
  const [showModal, setShowModal] = useState(false);
  const [selectedFleet, setSelectedFleet] = useState<Tfleet | null>(null);
  const [formData, setFormData] = useState({
    vehicle_id: 0,
    fleet_id: 0,
    vehicle_status: '',
    current_value: 0,
    maintainance_status: '',
    insurance_status: '',
  });

  const handleDelete = async (fleet_id: number) => {
    try {
      await removeFleet(fleet_id);
      toast.success('Fleet removed successfully');
    } catch (err) {
      toast.error('Failed to remove fleet');
    }
  };

  const handleUpdateClick = (fleet: Tfleet) => {
    setSelectedFleet(fleet);
    setFormData(fleet);
    setShowModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFleet) {
      try {
        await updateFleet({ fleet_id: selectedFleet.fleet_id, data: formData });
        toast.success('Fleet updated successfully');
        setShowModal(false);
      } catch (err) {
        toast.error('Failed to update fleet');
      }
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen bg-slate-600">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
    </div>
  );

  if (error) return <div className="text-center text-red-500">Error loading fleets</div>;

  return (
    <div className="container mx-auto p-4">
      <NavigationButtons/>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} pauseOnHover={true} draggable={true} />
      <h1 className="text-2xl font-bold mb-4">Fleet List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fleets?.map((fleet) => (
          <div key={fleet.vehicle_id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
            <h2 className="text-xl font-semibold mb-2">Vehicle ID: {fleet.vehicle_id}</h2>
            <p>Status: {fleet.vehicle_status}</p>
            <p>Current Value: ${fleet.current_value}</p>
            <p>Maintenance Status: {fleet.maintainance_status}</p>
            <p>Insurance Status: {fleet.insurance_status}</p>
            <div className="mt-4 flex space-x-2">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded flex items-center hover:bg-red-600 transition-colors duration-200"
                onClick={() => handleDelete(fleet.fleet_id)}
              >
                <Trash2 className="mr-2 h-5 w-5" /> Delete
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded flex items-center hover:bg-blue-600 transition-colors duration-200"
                onClick={() => handleUpdateClick(fleet)}
              >
                <Edit className="mr-2 h-5 w-5" /> Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Update Fleet</h2>
            <form onSubmit={handleUpdateSubmit}>
              <input
                type="number"
                name="vehicle_id"
                value={formData.vehicle_id}
                onChange={handleChange}
                placeholder="Vehicle ID"
                className="mb-2 p-2 border rounded w-full"
              />
              <input
                type="text"
                name="vehicle_status"
                value={formData.vehicle_status}
                onChange={handleChange}
                placeholder="Vehicle Status"
                className="mb-2 p-2 border rounded w-full"
              />
              <input
                type="number"
                name="current_value"
                value={formData.current_value}
                onChange={handleChange}
                placeholder="Current Value"
                className="mb-2 p-2 border rounded w-full"
              />
              <input
                type="text"
                name="maintainance_status"
                value={formData.maintainance_status}
                onChange={handleChange}
                placeholder="Maintenance Status"
                className="mb-2 p-2 border rounded w-full"
              />
              <input
                type="text"
                name="insurance_status"
                value={formData.insurance_status}
                onChange={handleChange}
                placeholder="Insurance Status"
                className="mb-4 p-2 border rounded w-full"
              />
              <div className="flex justify-between">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Update
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FleetList;
