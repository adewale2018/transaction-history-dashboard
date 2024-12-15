import CustomButton from "./Button";
import { Link } from "react-router-dom";
import Logo from "../assets/prophius.png";
import { RootState } from "../store";
import { useSelector } from "react-redux";
const Header = () => {
  const { email } = useSelector((state: RootState) => state.auth);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <header className="flex justify-between items-center border-b border-gray-200 bg-gray-50 px-3 md:px-20 py-5">
      <Link to={"/"}>
        <img src={Logo} alt="Prophius logo" className="w-20" />
      </Link>
      {email && <CustomButton label="Logout" handleClick={handleLogOut} />}
    </header>
  );
};

export default Header;
