// components/CarCard.tsx
import React from 'react';
import { useCreateBookingMutation } from '../apiservices/car';

interface Car {
    manufacturer: string;
    model: string;
    year: number;
    rentalRate: number;
    image?: string;
    vehicle_id:number;
  }
  
  interface CarCardProps {
    car: Car;
  }
  
  const CarCard: React.FC<CarCardProps> = ({ car }) => {
    const [createBooking] = useCreateBookingMutation();
  
    const handleRentNow = async () => {
      const bookingData = {
        user_id: 3, // Replace with actual user ID
        vehicle_id: 5,
        status: 'pending',
        total_cost: car.rentalRate,
        payment_id: 'SB32W', // Replace with actual payment ID
        location_id: 1 // Replace with actual location ID
      };
    
      console.log('Booking Data:', bookingData);
    
      try {
        const response = await createBooking(bookingData).unwrap();
        console.log('Booking Response:', response);
        alert('Booking successful!');
      } catch (error) {
        console.error('Failed to book the car:', error);
        console.error('Error Details:', error.data);
        alert('Booking failed!');
      }
    };
    return (
      <div className="p-4 border rounded-lg shadow-md">
        {car.image ? (
          <img src={car.image} alt={`${car.manufacturer} ${car.model}`} className="w-full h-48 object-cover rounded-md" />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gray-200 rounded-md">
            No Image Available
          </div>
        )}
        <h3 className="mt-2 text-lg font-semibold">{`${car.manufacturer} ${car.model} (${car.year})`}</h3>
        <p>{`$${car.rentalRate}/day`}</p>
        <button onClick={handleRentNow} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Rent Now</button>
      </div>
    );
  };
  
  export default CarCard;
