import React, { useEffect } from "react";
import { data, mockTransactionsData } from "../utils/data";
import {
  setCurrentPage,
  setFilter,
  setTransactions,
} from "../features/transactions/transactionSlice";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

const TransactionTable: React.FC = () => {
  const dispatch = useDispatch();
  const { transactions, filter, pageSize, currentPage } = useSelector(
    (state: RootState) => state.transactions
  );

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((transaction) => transaction.status === filter);

  const handleFilterChange = (transactionStatus: string) =>
    dispatch(setFilter(transactionStatus));

  const totalPages = Math.ceil(filteredTransactions.length / pageSize);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredTransactions.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

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
          <TableHead data={data} />
          <tbody>
            {getCurrentPageData().map((transaction) => (
              <TableRow key={transaction.id} {...transaction} />
            ))}
          </tbody>
        </table>
      </div>
      <div className=" overflow-x-auto flex justify-start items-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded mb-2 ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransactionTable;
