import DashboardWrapper from "../components/DashboardWrapper";
import { RootState } from "../store";
import TransactionTable from "./TransactionTable";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { email } = useSelector((state: RootState) => state.auth);
  const userEmail = localStorage.getItem('userEmail');
  return (
    <DashboardWrapper>
      <div className="mt-5 md:mt-10">
        <h1 className="font-serif text-[#166CF3] text-xl md:text-3xl font-bold">
          Dashboard
        </h1>
        <p className="mt-4 md:text-center">
          👋 Welcome back, <span className="text-[#166CF3]">{email || userEmail}</span>
        </p>
      </div>
      <TransactionTable />
    </DashboardWrapper>
  );
};

export default Dashboard;
