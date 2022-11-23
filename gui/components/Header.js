import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { FiChevronDown, FiUser, FiShoppingCart, FiMenu } from "react-icons/fi";

const Header = () => {
  const MenuItems = ["All category", "Acessories", "Men", "Women"];
  return (
    <header>
      <div className="container m-auto">
        <div className="flex flex-col justify-center items-center max-w-maxW m-auto">
          <div className="flex justify-between items-center h-[80px] w-full gap-6">
            <Image
              src="/ss-logo.svg"
              alt="logo"
              width="60"
              height="40"
              className="hidden md:block h-[44px]"
            />

            <div className="border hover:border-orange-700 focus-within:border-orange-700 rounded-full flex items-center h-[44px] max-w-[670px] w-full hover:cursor-text overflow-hidden">
              <FiSearch className="text-[#BDBDBD] text-[20px] mx-[16px]" />
              <input className="flex-1 h-full" placeholder="Search..." />
              {/* Dropdown Menu */}
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      isActive={isOpen}
                      as={Button}
                      rightIcon={<FiChevronDown />}
                      px="20px"
                      py="10px"
                      transition="ease 0.5s"
                      className="bg-[#F2F2F2] w-fit h-fit hover:cursor-pointer "
                    >
                      All category
                    </MenuButton>
                    <MenuList className="flex flex-col justify-center items-center mt-[-9px] py-2 bg-white min-h-[100px] min-w-[100px] rounded-md shadow-2xl ">
                      {MenuItems.map((item) => (
                        <MenuItem
                          key={item}
                          className="hover:bg-[#F2F2F2] px-5 py-2 "
                        >
                          {item}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </>
                )}
              </Menu>
            </div>

            <div className="flex gap-6">
              <IconButton
                aria-label="User"
                colorScheme="gray"
                icon={<FiUser />}
                p="14px"
                className="rounded-full bg-[#F2F2F2] hover:bg-[#E0E0E0] hover:cursor-pointer"
              />
              <IconButton
                aria-label="Cart"
                colorScheme="gray"
                icon={<FiShoppingCart />}
                p="14px"
                className="rounded-full bg-[#F2F2F2] hover:bg-[#E0E0E0] hover:cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-between">Bottom nav</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
