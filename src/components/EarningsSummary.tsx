
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Sample data
const data = [
  { name: 'Jan', earnings: 4000 },
  { name: 'Feb', earnings: 3000 },
  { name: 'Mar', earnings: 5000 },
  { name: 'Apr', earnings: 4000 },
  { name: 'May', earnings: 6000 },
  { name: 'Jun', earnings: 7000 },
  { name: 'Jul', earnings: 8000 },
  { name: 'Aug', earnings: 5000 },
  { name: 'Sep', earnings: 6000 },
  { name: 'Oct', earnings: 7000 },
  { name: 'Nov', earnings: 8000 },
  { name: 'Dec', earnings: 9000 },
];

const EarningsSummary = () => {
  return (
    <div className="bg-slate-500 p-4 shadow rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Earnings Summary</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="earnings" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EarningsSummary;
