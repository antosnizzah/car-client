import  { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { EditIcon, TrashIcon } from 'lucide-react';

interface Payment {
  id: number;
  user: string;
  amount: number;
  date: string;
}

const PaymentList = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const payments: Payment[] = [
    { id: 1, user: 'John Doe', amount: 150.0, date: '2023-07-01' },
    { id: 2, user: 'Jane Smith', amount: 200.0, date: '2023-07-02' },
    { id: 3, user: 'Alice Johnson', amount: 250.0, date: '2023-07-03' },
  ];

  const filteredPayments = payments.filter(payment =>
    payment.user.toLowerCase().includes(searchTerm.toLowerCase())
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
        <button className="btn btn-primary ml-4">Add Payment</button>
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map(payment => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.user}</td>
              <td>{payment.amount}</td>
              <td>{payment.date}</td>
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

export default PaymentList;
