import Header from "./Header";
import React from "react";

const DashboardWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <section>
      <Header />
      <div className="max-w-screen-xl mx-auto  px-5">{children}</div>
    </section>
  );
};

export default DashboardWrapper;
