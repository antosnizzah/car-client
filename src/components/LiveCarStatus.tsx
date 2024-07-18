import React from 'react';

const LiveCarStatus: React.FC = () => {
  return (
    <div className="bg-slate-500 p-4 shadow rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Live Car Status</h3>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>No.</th>
            <th>Car no.</th>
            <th>Driver</th>
            <th>Status</th>
            <th>Earning</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01</td>
            <td>6465</td>
            <td>Alex Noman</td>
            <td><span className="text-green-500">Completed</span></td>
            <td>$35.44</td>
            <td><button className="bg-blue-500 text-white p-2 rounded">Details</button></td>
          </tr>
          <tr>
            <td>02</td>
            <td>5665</td>
            <td>Razib Rahman</td>
            <td><span className="text-yellow-500">Pending</span></td>
            <td>$0.00</td>
            <td><button className="bg-blue-500 text-white p-2 rounded">Details</button></td>
          </tr>
          <tr>
            <td>03</td>
            <td>1755</td>
            <td>Luke Norton</td>
            <td><span className="text-red-500">In route</span></td>
            <td>$23.50</td>
            <td><button className="bg-blue-500 text-white p-2 rounded">Details</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LiveCarStatus;
