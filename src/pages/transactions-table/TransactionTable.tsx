import React, { useEffect } from "react";
import {
  TransactionProps,
  mockGetTransactions,
} from "../../features/transactions/transactionSlice";
import {
  setCurrentPage,
  setFilter,
  setSortConfig,
} from "../../features/transactions/transactionSlice";
import { useDispatch, useSelector } from "react-redux";

import Papa from "papaparse";
import { RootState } from "../../store";
import Spinner from "../../components/Spinner";
import TableRow from "./TableRow";
import { saveAs } from "file-saver";

const TransactionTable: React.FC = () => {
  const dispatch = useDispatch();
  const {
    transactions,
    loading,
    error,
    filter,
    pageSize,
    currentPage,
    sortConfig,
  } = useSelector((state: RootState) => state.transactions);

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((transaction) => transaction.status === filter);

  const handleFilterChange = (transactionStatus: string) =>
    dispatch(setFilter(transactionStatus));

  const totalPages = Math.ceil(filteredTransactions.length / pageSize);

  // sort transactions based on sortConfig
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const isAsc = sortConfig.direction === "asc";
    if (a[sortConfig.key] < b[sortConfig.key]) return isAsc ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return isAsc ? 1 : -1;
    return 0;
  });

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedTransactions.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleSort = (key: keyof TransactionProps) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    dispatch(setSortConfig({ key, direction }));
  };

  const handleDownloadCSV = () => {
    const csv = Papa.unparse(transactions); 
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "transactions.csv");
  };

  useEffect(() => {
    dispatch(mockGetTransactions() as any);
  }, [dispatch]);

  if (error) {
    return (
      <p className="text-red-500 text-center text-lg md:text-2xl">{error}</p>
    );
  }

  if (loading) {
    return (
      <div className="mt-40 flex flex-col justify-center items-center  text-base">
        <p className="text-base md:text-2xl animate-bounce font-thin">
          Loading transactions, please wait...
        </p>
        <Spinner />
      </div>
    );
  }

  return (
    <section className="mb-10">
      {/* Here */}
      <div className="flex items-center justify-between mb-5 flex-wrap">
        <h2 className="font-serif text-xl font-medium mt-10 mb-5 text-[#166CF3]">
          Transactions History
        </h2>
        <button
          onClick={handleDownloadCSV}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download CSV
        </button>
      </div>
      {/* Here */}
      <div className="border shadow-md rounded-md md:px-10 px-2 py-5 flex items-center justify-end mb-4 flex-wrap">
        <div className="flex space-x-2">
          <button
            className={`px-3 md:px-5 py-1 rounded-full text-sm ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleFilterChange("all")}
          >
            All
          </button>
          <button
            className={`px-3 md:px-5 py-1 rounded-full text-sm ${
              filter === "success" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleFilterChange("success")}
          >
            Success
          </button>
          <button
            className={`px-3 md:px-5 py-1 rounded-full text-sm ${
              filter === "pending" ? "bg-gray-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleFilterChange("pending")}
          >
            Pending
          </button>
          <button
            className={`px-3 md:px-5 py-1 rounded-full text-sm ${
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
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3  text-left text-gray-600 font-bold">
                ID
              </th>
              <th
                className="px-2 md:px-6 py-1 md:py-3  text-left text-gray-600 font-bold cursor-pointer"
                onClick={() => handleSort("date")}
              >
                Date{" "}
                {sortConfig.key === "date" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-2 md:px-6 py-1 md:py-3  text-left text-gray-600 font-bold cursor-pointer"
                onClick={() => handleSort("amount")}
              >
                Amount{" "}
                {sortConfig.key === "amount" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th className="px-6 py-3  text-left text-gray-600 font-bold">
                Description
              </th>
              <th className="px-6 py-3  text-left text-gray-600 font-bold">
                Status
              </th>
              <th className="px-6 py-3  text-left text-gray-600 font-bold">
                Details
              </th>
            </tr>
          </thead>
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
    </section>
  );
};

export default TransactionTable;
