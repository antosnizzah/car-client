import React from 'react';

interface CarCardProps {
  manufacturer: string;
  model: string;
  year: number;
  engineCapacity: string;
  fuelType: string;
  transmission: string;
  rate: number;
}

const CarCard: React.FC<CarCardProps> = ({ manufacturer, model, year, engineCapacity, fuelType, transmission, rate }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-4 w-full md:w-1/3 lg:w-1/4">
      <h3 className="text-xl font-semibold mb-2">{model}</h3>
      <p className="text-gray-700">Manufacturer: {manufacturer}</p>
      <p className="text-gray-700">Year: {year}</p>
      <p className="text-gray-700">Engine Capacity: {engineCapacity}</p>
      <p className="text-gray-700">Fuel Type: {fuelType}</p>
      <p className="text-gray-700">Transmission: {transmission}</p>
      <p className="text-gray-800 font-bold mt-4">Rate: ${rate}</p>
    </div>
  );
};

export default CarCard;
