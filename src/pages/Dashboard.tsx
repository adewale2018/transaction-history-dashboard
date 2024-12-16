import DashboardWrapper from "../components/DashboardWrapper";
import TransactionTable from './transactions-table/TransactionTable';
import UserInfo from "./User";

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <div className="mt-5 md:mt-10">
        <h1 className="font-serif text-[#166CF3] text-xl md:text-3xl font-bold">
          Dashboard
        </h1>
        <UserInfo message="Welcome back 👋," />
      </div>
      <TransactionTable />
    </DashboardWrapper>
  );
};

export default Dashboard;
