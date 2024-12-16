import CustomButton from "./Button";
import { Link } from "react-router-dom";
import Logo from "../assets/prophius.png";
const Header = () => {
  const token  = localStorage.getItem('token');
  
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  
  return (
    <header className="md:flex md:justify-between md:items-center flex-wrap border-b border-gray-200 bg-gray-50 px-3 md:px-20 py-5">
      <Link to={"/dashboard"}>
        <img src={Logo} alt="Prophius logo" className="w-24 mb-4" />
      </Link>
      <a className="text-[#166CF3] cursor-pointer" href="https://github.com/adewale2018/transaction-history-dashboard" target="_blank">Project Repo</a>
      {token && <CustomButton label="Logout" handleClick={handleLogOut} />}
    </header>
  );
};

export default Header;
