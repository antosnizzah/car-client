// src/components/BackButton.tsx
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavigationButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-4 left-4 flex space-x-2">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-200 rounded shadow-md hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
      >
        <ArrowLeft className="w-5 h-5 transition-transform duration-300 ease-in-out group-hover:-translate-x-1" />
        <span className="transition-transform duration-300 ease-in-out group-hover:scale-105">Back</span>
      </button>
      <button
        onClick={() => navigate(1)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-200 rounded shadow-md hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
      >
        <ArrowRight className="w-5 h-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
        <span className="transition-transform duration-300 ease-in-out group-hover:scale-105">Front</span>
      </button>
    </div>
  );
};

export default NavigationButtons;
