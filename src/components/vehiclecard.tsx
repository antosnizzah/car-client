import React from 'react';
import { EditIcon, TrashIcon } from 'lucide-react';
import { TVehicle } from '../apiservices/vehicles';

interface VehicleCardProps {
  vehicle: TVehicle;
  onEdit: () => void;
  onDelete: () => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">{vehicle.manufacturer} {vehicle.model}</h3>
        <div className="flex gap-2">
          <button className="btn btn-sm btn-outline btn-info" onClick={onEdit} title="Edit Vehicle">
            <EditIcon />
          </button>
          <button className="btn btn-sm btn-outline btn-warning" onClick={onDelete} title="Delete Vehicle">
            <TrashIcon />
          </button>
        </div>
      </div>
      <p><strong>Year:</strong> {vehicle.year}</p>
      <p><strong>Engine Capacity:</strong> {vehicle.engine_capacity} cc</p>
      <p><strong>Fuel Type:</strong> {vehicle.fuel_type}</p>
      <p><strong>Transmission:</strong> {vehicle.transmission}</p>
      <p><strong>Color:</strong> {vehicle.color}</p>
    </div>
  );
};

export default VehicleCard;
