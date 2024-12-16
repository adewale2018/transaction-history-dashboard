import { CircleUserRound } from "lucide-react";

type UserInfoProps = {
  message?: string;
};

const UserInfo = ({ message }: UserInfoProps) => {
  const userEmail = localStorage.getItem("userEmail");
  return (
    <div className="hidden md:flex gap-5 mt-10 mb-4">
      <CircleUserRound />
      <p>
      {message} <span className="text-[#166CF3]">{userEmail}</span>
    </p>
    </div>
   
  );
};

export default UserInfo;
