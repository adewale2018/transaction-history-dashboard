import Header from "../components/Header";
import TransactionTable from "./TransactionTable";
const Dashboard = () => {
  return (
    <section>
      <Header />
      <div className="py-8 md:py-20 px-5 md:px-20">
        <h1 className="text-[#166CF3] text-xl md:text-3xl font-bold mb-10">
          Transaction Dashboard
        </h1>
        <TransactionTable />
      </div>
    </section>
  );
};

export default Dashboard;
