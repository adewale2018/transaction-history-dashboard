import {
  Calendar,
  ChevronLeft,
  CircleCheckBig,
  CircleDashed,
  CircleDollarSign,
  CircleX,
  NotebookPen,
} from "lucide-react";
import { Link, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import DashboardWrapper from "../components/DashboardWrapper";
import { RootState } from "../store";
import Spinner from "../components/Spinner";
import UserInfo from "./User";
import { mockGetTransactionDetails } from "../features/transactions/transactionSlice";
import moment from "moment";
import { useEffect } from "react";

const TransactionDetailsPage = () => {
  const userEmail = localStorage.getItem("userEmail");
  const dispatch = useDispatch();
  const { transactionId } = useParams();
  const { loading, error, transactionDetails } = useSelector(
    (state: RootState) => state.transactions
  );

  useEffect(() => {
    if (transactionId) {
      dispatch(mockGetTransactionDetails(Number(transactionId)) as any);
    }
  }, [dispatch, transactionId]);

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
    <DashboardWrapper>
      <div className="mt-5 md:mt-10">
        <Link
          to={`/dashboard`}
          className="font-serif flex items-center mb-5 text-[#166CF3]"
        >
          <ChevronLeft className="h-8 w-8 cursor-pointer" color="#166CF3" />{" "}
          Back
        </Link>
        <UserInfo />
        <div className="shadow-md p-8 border rounded bg-gray-100 mb-10">
          <h2 className="font-serif text-[#166CF3] text-xl md:text-3xl font-bold">
            Transaction Details
          </h2>
          <p className="px-2 mt-5 text-xl font-serif">
            ID:{" "}
            <span className="md:ml-5 px-8 text-base md:text-lg font-semibold py-1 rounded-full bg-blue-200 text-blue-600">
              {transactionDetails?.id}
            </span>
          </p>
        </div>
        {/* Starts here */}
        <div className="cursor-pointer rounded-lg shadow-xl border border-gray-200 px-3 md:px-10 py-5">
          <div className="border-b py-4 flex justify-between items-center">
            <h4 className="font-serif text-base md:text-xl">Date</h4>
            <span className="flex items-center gap-2 capitalize bg-blue-100 rounded-full px-5 md:px-8 py-1 md:py-2  text-blue-600 font-medium">
              {moment(transactionDetails?.date).format("lll")}
              <Calendar />
            </span>
          </div>
          <div className="border-b py-4 flex justify-between items-center">
            <h4 className="font-serif text-base md:text-xl">Description</h4>
            <span className="flex items-center gap-2 capitalize bg-yellow-100 rounded-full px-5 md:px-8 py-1 md:py-2  text-yellow-600 font-medium">
              {transactionDetails?.description}
              <NotebookPen />
            </span>
          </div>

          <div className="border-b py-4 flex justify-between items-center">
            <h4 className="font-serif text-base md:text-xl">Amount</h4>
            <span className="flex items-center gap-2 capitalize bg-green-100 rounded-full px-5 md:px-8 py-1 md:py-2  text-green-600 font-medium">
              ₦{transactionDetails?.amount}
              <CircleDollarSign />
            </span>
          </div>
          <div className="border-b py-4 flex justify-between items-center">
            <h4 className="font-serif text-base md:text-xl">Status</h4>
            <span
              className={`flex items-center gap-2 rounded-full px-5 md:px-8 py-1 md:py-2 font-medium capitalize ${
                transactionDetails?.status === "success"
                  ? "text-green-600"
                  : transactionDetails?.status === "pending"
                  ? "text-gray-600"
                  : "text-red-600"
              }
        ${
          transactionDetails?.status === "success"
            ? "bg-green-100"
            : transactionDetails?.status === "pending"
            ? "bg-gray-100"
            : "bg-red-100"
        }`}
            >
              {transactionDetails?.status}
              {transactionDetails?.status === "success" ? (
                <CircleCheckBig />
              ) : transactionDetails?.status === "pending" ? (
                <CircleDashed />
              ) : (
                <CircleX />
              )}
            </span>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default TransactionDetailsPage;
