import Header from "../components/Header";
import TransactionTable from "./TransactionTable";
const Dashboard = () => {
  return (
    <section>
      <Header />
      <div className="pt-20 px-5 md:px-20">
        <h1 className="text-[#166CF3] text-xl md:text-3xl font-bold">
          Dashboard
        </h1>
      </div>
      <TransactionTable />
    </section>
  );
};

export default Dashboard;
