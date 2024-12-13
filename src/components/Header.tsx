import CustomButton from "./Button";
import Logo from "../assets/prophius.png";
import { useNavigate } from "react-router";
const Header = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <header className="flex justify-between items-center border-b border-gray-200 bg-gray-50 px-3 md:px-20 py-5">
      <img src={Logo} alt="Prophius logo" className="w-20" />
      <CustomButton label="Logout" handleClick={handleLogOut} />
    </header>
  );
};

export default Header;
