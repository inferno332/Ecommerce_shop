import Image from "next/image";
import { FiSearch } from "react-icons/fi";

const Header = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex justify-between items-center h-[80px] w-full lg:max-w-maxW">
        <Image
          src="/ss-logo.svg"
          alt="logo"
          width="60"
          height="40"
          className="hidden md:block h-[44px]"
        />
        <div className="border rounded-full flex items-center h-[44px] max-w-[670px] w-full mx-auto hover:cursor-text ">
          <FiSearch className="text-[#BDBDBD] text-[20px] mx-[16px]" />
          <input className="flex-1 h-full" placeholder="Search..." />
          <button className="w-[160px] px-6 ">All Category</button>
        </div>
        <h1>User</h1>
      </div>
      <div className="flex justify-between">Bottom nav</div>
    </div>
  );
};

export default Header;
