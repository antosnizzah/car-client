
import 'tailwindcss/tailwind.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Statistics = () => {
  const data = {
    labels: ['Hire', 'Cancel'],
    datasets: [
      {
        label: 'Hire vs Cancel',
        data: [75, 25], // Example data
        backgroundColor: ['#4CAF50', '#FF6384'],
        hoverBackgroundColor: ['#45a049', '#FF4E72'],
      },
    ],
  };

  return (
    <div className="bg-slate-500 p-4 shadow rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Today's Statistics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-lg">Income</h4>
          <p className="text-2xl font-semibold">$9460.00</p>
          <p className="text-sm text-gray-500">Compared to $9940 yesterday</p>
        </div>
        <div>
          <h4 className="text-lg">Expenses</h4>
          <p className="text-2xl font-semibold">$5660.00</p>
          <p className="text-sm text-gray-500">Compared to $5240 yesterday</p>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-lg">Hire vs Cancel</h4>
        <div className="h-32">
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
