import Image from 'next/image';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import { FiUser, FiShoppingCart, FiMenu } from 'react-icons/fi';
import DropDownMenu from './DropDownMenu';
import MobileMenuModal from './MobileMenuModal';

import SelectMenu from './SelectMenu';

const Header = () => {
    return (
        <header>
            <div className='container m-auto'>
                <div className='flex flex-col justify-center items-center m-auto'>
                    <div className='flex justify-between items-center h-[80px] w-full gap-2 md:gap-6'>
                        <Link href='/'>
                            <Image
                                src='/ss-logo.svg'
                                alt='logo'
                                width='100'
                                height='100'
                                className='hidden md:block h-fit'
                            />
                        </Link>

                        <div className='border-gray-3       00 border hover:border-orange-700 focus-within:border-orange-700 rounded-full flex items-center h-[44px] max-w-[670px] w-full hover:cursor-text truncate'>
                            <FiSearch className='text-[#BDBDBD] text-[20px] mx-[16px]' />
                            <input className='flex-1 min-w-0  h-full' placeholder='Search...' />

                            {/* Select Menu */}
                            <SelectMenu />

                            <div className='bg-[#F2F2F2] w-fit h-fit hover:cursor-pointer'></div>
                        </div>

                        <div className='flex gap-6'>
                            <div className='rounded-full p-4 bg-[#F2F2F2] hover:bg-[#E0E0E0] hover:cursor-pointer hidden md:block hover:animate-pulse border-gray-300 border'>
                                <FiUser />
                            </div>
                            <div className='rounded-full p-4 bg-[#F2F2F2] hover:bg-[#E0E0E0] hover:cursor-pointer hidden md:block hover:animate-pulse border-gray-300 border'>
                                <FiShoppingCart />
                            </div>
                            <div className='rounded-full p-4 bg-[#F2F2F2] hover:bg-[#E0E0E0] hover:cursor-pointer block md:hidden border-gray-300 border'>
                                {/* <FiMenu /> */}
                                <MobileMenuModal/>
                            </div>
                        </div>
                    </div>

                    <div className='hidden md:flex justify-between w-full mb-2'>
                        <DropDownMenu />
                        <div>Navbar</div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
