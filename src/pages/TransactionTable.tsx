import React, { useEffect } from "react";
import {
  setFilter,
  setTransactions,
} from "../features/transactions/transactionSlice";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store";
import TableRow from "./TableRow";
import { mockTransactionsData } from "../utils/data";

const TransactionTable: React.FC = () => {
  const dispatch = useDispatch();
  const { transactions, filter } = useSelector(
    (state: RootState) => state.transactions
  );

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((transaction) => transaction.status === filter);

  const handleFilterChange = (transactionStatus: string) =>
    dispatch(setFilter(transactionStatus));

  useEffect(() => {
    dispatch(setTransactions(mockTransactionsData));
  }, [dispatch]);

  return (
    <div className="md:px-8">
      <div className="flex items-center justify-between mb-4 flex-wrap">
        <h2 className="text-xl font-bold mb-5">Transactions History</h2>
        <div className="flex space-x-2">
          <button
            className={`px-5 py-1 rounded-full text-sm ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleFilterChange("all")}
          >
            All
          </button>
          <button
            className={`px-5 py-1 rounded-full text-sm ${
              filter === "success" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleFilterChange("success")}
          >
            Success
          </button>
          <button
            className={`px-5 py-1 rounded-full text-sm ${
              filter === "pending" ? "bg-gray-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleFilterChange("pending")}
          >
            Pending
          </button>
          <button
            className={`px-5 py-1 rounded-full text-sm ${
              filter === "failed" ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleFilterChange("failed")}
          >
            Failed
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left text-gray-600 font-bold">
                ID
              </th>
              <th className="px-6 py-3 border-b text-left text-gray-600 font-bold">
                Date
              </th>
              <th className="px-6 py-3 border-b text-left text-gray-600 font-bold">
                Amount
              </th>
              <th className="px-6 py-3 border-b text-left text-gray-600 font-bold">
                Description
              </th>
              <th className="px-6 py-3 border-b text-left text-gray-600 font-bold">
                Status
              </th>
              <th className="px-6 py-3 border-b text-left text-gray-600 font-bold">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id} {...transaction} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
