// const VehicleList = () => {
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const vehicles: Vehicle[] = [
//     { id: 0, make: 'Toyota', model: 'Camry', year: 2010 },
//     { id: 18, make: 'Honda', model: 'Civic', year: 2019 },
//     { id: 16, make: 'Ford', model: 'Mustang', year: 2008 },
//   ];

//   const filteredVehicles = vehicles.filter(vehicle =>
//     vehicle.make.toLowerCase().includes(searchTerm.toLowerCase())
//   );




import  { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { EditIcon, TrashIcon } from 'lucide-react';


interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
}

const VehicleList = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const vehicles: Vehicle[] = [
    { id: 0, make: 'Toyota', model: 'Camry', year: 2010 },
    { id: 18, make: 'Honda', model: 'Civic', year: 2019 },
    { id: 16, make: 'Ford', model: 'Mustang', year: 2008 },
  ];

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.make.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-full max-w-xs"
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary ml-4">Add Vehicle</button>
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVehicles.map(vehicle => (
            <tr key={vehicle.id}>
              <td>{vehicle.id}</td>
              <td>{vehicle.make}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.year}</td>
              <td>
                <button className="btn btn-outline btn-primary btn-sm mr-2">
                  <EditIcon />
                </button>
                <button className="btn btn-outline btn-error btn-sm">
                  <TrashIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleList;
