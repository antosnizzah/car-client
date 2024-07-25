import React from 'react';
import 'tailwindcss/tailwind.css';
import '../Confetti.css';
import { Link } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-100 overflow-hidden">
      {/* Confetti Animation */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="confetti-piece"></div>
        ))}
      </div>

      {/* Success Message */}
      <div className="bg-white p-10 rounded-lg shadow-lg text-center animate-fade-in">
        <div className="text-5xl text-green-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-2">Payment Succeeded!</h1>
        <p className="text-gray-700 mb-4">
          Thank you for processing your most recent payment.
        </p>
        <Link to ='/' className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">Your Dashboard</Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
