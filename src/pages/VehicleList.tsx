import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import {
  useGetVehiclesQuery,
  useGetVehiclesSpecsQuery,
  useDeleteVehicleMutation,
  useAddVehicleMutation,
  useUpdateVehicleMutation,
  TVehicle,
} from '../apiservices/vehicles';
import { toast, Toaster } from 'sonner';
import VehicleCard from '../components/vehiclecard'; // Import the new component

const VehicleList = () => {
  const { data: vehicleData, error, isLoading, isError } = useGetVehiclesQuery();
  const { data: vehicleSpecsData } = useGetVehiclesSpecsQuery();
  const [deleteVehicle] = useDeleteVehicleMutation();
  const [addVehicle] = useAddVehicleMutation();
  const [updateVehicle] = useUpdateVehicleMutation();
  const [editingVehicle, setEditingVehicle] = useState<TVehicle | null>(null);
  const [newVehicle, setNewVehicle] = useState<Partial<TVehicle>>({});
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleDelete = async (vehicle_id: number) => {
    await deleteVehicle(vehicle_id);
    toast.success('Vehicle deleted successfully');
  };

  const handleAdd = async () => {
    if (
      newVehicle.manufacturer &&
      newVehicle.model &&
      newVehicle.year &&
      newVehicle.engine_capacity &&
      newVehicle.fuel_type &&
      newVehicle.transmission &&
      newVehicle.color
    ) {
      await addVehicle(newVehicle as TVehicle);
      setNewVehicle({});
      toast.success('Vehicle added successfully');
    } else {
      toast.error('All fields are required');
    }
  };

  const handleUpdate = async (vehicle_id: number) => {
    if (editingVehicle) {
      const { vehicle_id: _, ...rest } = editingVehicle;
      await updateVehicle({ vehicle_id, ...rest });
      setEditingVehicle(null);
      toast.success('Vehicle updated successfully');
    }
  };

  return (
    <>
      <Toaster toastOptions={{ classNames: { error: 'bg-red-400', success: 'text-green-400', warning: 'text-yellow-400', info: 'bg-blue-400' } }} />
      <div className="overflow-x-auto text-base-content bg-gray-800 rounded-lg p-4">
        <h1 className="text-xl my-4 text-white">Vehicle Data</h1>
        <div className="mb-4 flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Search vehicles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full md:w-auto"
          />
          <input
            type="text"
            placeholder="Manufacturer"
            value={newVehicle.manufacturer || ''}
            onChange={(e) => setNewVehicle({ ...newVehicle, manufacturer: e.target.value })}
            className="input input-bordered w-full md:w-auto"
          />
          <input
            type="text"
            placeholder="Model"
            value={newVehicle.model || ''}
            onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
            className="input input-bordered w-full md:w-auto"
          />
          <input
            type="number"
            placeholder="Year"
            value={newVehicle.year || ''}
            onChange={(e) => setNewVehicle({ ...newVehicle, year: parseInt(e.target.value) })}
            className="input input-bordered w-full md:w-auto"
          />
          <input
            type="number"
            placeholder="Engine Capacity"
            value={newVehicle.engine_capacity || ''}
            onChange={(e) => setNewVehicle({ ...newVehicle, engine_capacity: parseInt(e.target.value) })}
            className="input input-bordered w-full md:w-auto"
          />
          <input
            type="text"
            placeholder="Fuel Type"
            value={newVehicle.fuel_type || ''}
            onChange={(e) => setNewVehicle({ ...newVehicle, fuel_type: e.target.value })}
            className="input input-bordered w-full md:w-auto"
          />
          <input
            type="text"
            placeholder="Transmission"
            value={newVehicle.transmission || ''}
            onChange={(e) => setNewVehicle({ ...newVehicle, transmission: e.target.value })}
            className="input input-bordered w-full md:w-auto"
          />
          <input
            type="text"
            placeholder="Color"
            value={newVehicle.color || ''}
            onChange={(e) => setNewVehicle({ ...newVehicle, color: e.target.value })}
            className="input input-bordered w-full md:w-auto"
          />
          <button className="btn btn-primary" onClick={handleAdd}>
            Add Vehicle
          </button>
        </div>

        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error: {error?.message}</p>
          ) : (
            vehicleSpecsData &&
            vehicleSpecsData
              .filter((vehicle: TVehicle) => {
                if (searchTerm === '') return vehicle;
                return (
                  vehicle.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
                );
              })
              .map((vehicle) => (
                <VehicleCard
                  key={vehicle.vehicle_id}
                  vehicle={vehicle}
                  onEdit={() => setEditingVehicle(vehicle)}
                  onDelete={() => handleDelete(vehicle.vehicle_id)}
                />
              ))
          )}
        </div>

        {editingVehicle && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-4">Update Vehicle</h3>
              <input
                type="text"
                placeholder="Manufacturer"
                value={editingVehicle.manufacturer}
                onChange={(e) => setEditingVehicle({ ...editingVehicle, manufacturer: e.target.value })}
                className="input input-bordered mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Model"
                value={editingVehicle.model}
                onChange={(e) => setEditingVehicle({ ...editingVehicle, model: e.target.value })}
                className="input input-bordered mb-2 w-full"
              />
              <input
                type="number"
                placeholder="Year"
                value={editingVehicle.year}
                onChange={(e) => setEditingVehicle({ ...editingVehicle, year: parseInt(e.target.value) })}
                className="input input-bordered mb-2 w-full"
              />
              <input
                type="number"
                placeholder="Engine Capacity"
                value={editingVehicle.engine_capacity}
                onChange={(e) => setEditingVehicle({ ...editingVehicle, engine_capacity: parseInt(e.target.value) })}
                className="input input-bordered mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Fuel Type"
                value={editingVehicle.fuel_type}
                onChange={(e) => setEditingVehicle({ ...editingVehicle, fuel_type: e.target.value })}
                className="input input-bordered mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Transmission"
                value={editingVehicle.transmission}
                onChange={(e) => setEditingVehicle({ ...editingVehicle, transmission: e.target.value })}
                className="input input-bordered mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Color"
                value={editingVehicle.color}
                onChange={(e) => setEditingVehicle({ ...editingVehicle, color: e.target.value })}
                className="input input-bordered mb-2 w-full"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button className="btn btn-primary" onClick={() => handleUpdate(editingVehicle.vehicle_id)}>
                  Save
                </button>
                <button className="btn" onClick={() => setEditingVehicle(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VehicleList;
