import Image from 'next/image';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import { FiUser, FiShoppingCart } from 'react-icons/fi';
import DropDownMenu from './DropDownMenu';
import MobileMenuModal from './MobileMenuModal';
import SearchAutoComplete from './SearchAutoComplete';


const Header = () => {
    return (
        <header>
            <div className='container m-auto'>
                <div className='flex flex-col justify-center items-center m-auto'>
                    <div className='flex justify-between items-center h-16 md:h-20 w-full gap-2 md:gap-6'>
                        <Link href='/'>
                            <Image
                                src='/ss-logo.svg'
                                alt='logo'
                                width='100'
                                height='100'
                                className='hidden md:inline-block h-fit hover:opacity-70'
                            />
                        </Link>
                        {/* Search bar */}
                        <div className='items-center flex flex-grow rounded-full bg-transparent relative'>
                            <div className='relative w-full flex flex-row-reverse'>
                                <SearchAutoComplete />
                            </div>
                        </div>

                        <div className='flex md:gap-2 items-center'>
                            <span className='rounded-full text-lg p-4 hover:bg-[#E0E0E0] hover:cursor-pointer hidden md:block'>
                                <FiUser />
                            </span>
                            <span className='rounded-full text-lg p-4 hover:bg-[#E0E0E0] hover:cursor-pointer'>
                                <FiShoppingCart />
                            </span>
                            <span className='rounded-full text-lg p-4 hover:bg-[#E0E0E0] hover:cursor-pointer block md:hidden'>
                                {/* <FiMenu /> */}
                                <MobileMenuModal />
                            </span>
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
