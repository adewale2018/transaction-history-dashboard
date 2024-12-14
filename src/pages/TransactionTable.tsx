import React from "react";
import { transactions } from '../utils/data';
const TransactionTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 border-b text-left text-gray-600 font-bold">Date</th>
            <th className="px-6 py-3 border-b text-left text-gray-600 font-bold">Amount</th>
            <th className="px-6 py-3 border-b text-left text-gray-600 font-bold">Description</th>
            <th className="px-6 py-3 border-b text-left text-gray-600 font-bold">Status</th>
            <th className="px-6 py-3 border-b text-left text-gray-600 font-bold">Details</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 border-b">{transaction.date}</td>
              <td className="px-6 py-4 border-b">${transaction.amount.toFixed(2)}</td>
              <td className="px-6 py-4 border-b">{transaction.description}</td>
              <td
                className={`px-6 py-4 border-b ${
                  transaction.status === "success" ? "text-green-500" : "text-red-500"
                }`}
              >
                {transaction.status}
              </td>
              <td className="px-6 py-4 border-b">Link icon later</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
