import Header from "../components/Header";
import TransactionTable from "./TransactionTable";
const Dashboard = () => {
  return (
    <section>
      <Header />
      <div className="p-8">
      <h1 className="text-[#166CF3] text-3xl font-bold mb-10">Transaction Dashboard</h1>
      <TransactionTable />
    </div>
    </section>
  );
};

export default Dashboard;
