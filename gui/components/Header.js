import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { FiSearch } from 'react-icons/fi';
import { FiUser, FiShoppingCart, FiMenu } from 'react-icons/fi';
import DropDownMenu from './DropDownMenu';
import SelectMenu from './SelectMenu';
import Cart from './Cart/Cart';

import { useCart } from '../zustand/useCart';

const Header = () => {
    const { products } = useCart((state) => state);
    const [openCart, setOpenCart] = useState(false);

    // EVENT SCROLL HEADER
    const [hideHeader, sethideHeader] = useState(false);
    const [position, setPosition] = useState(0);

    const handleScroll = useCallback(() => {
        sethideHeader(window.pageYOffset > position);
        setPosition(window.pageYOffset);
    }, [position, hideHeader]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
    //END

    //Fix Next.js “Text content does not match server-rendered HTML” React hydration error
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        return null;
    }
    //END

    return (
        <header
            className={`${
                hideHeader ? 'translate-y-[-130px]' : 'translate-y-0'
            } container mx-auto bg-white ease-out duration-300 z-10`}>
            <div className='flex flex-col justify-center items-center '>
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

                    <div className='border-gray-300 border hover:border-orange-700 focus-within:border-orange-700 rounded-full flex items-center h-[44px] max-w-[670px] w-full hover:cursor-text truncate'>
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
                        <div className='relative'>
                            <div
                                className='rounded-full p-4 bg-[#F2F2F2] hover:bg-[#E0E0E0] hover:cursor-pointer hidden md:block hover:animate-pulse border-gray-300 border'
                                onClick={() => setOpenCart((prev) => !prev)}>
                                <FiShoppingCart />
                            </div>
                            {products.length > 0 && (
                                <p className='absolute top-0 right-0 translate-x-[10px] translate-y-[-5px] hidden md:block w-[25px] border rounded-full text-center bg-black text-white font-bold text-'>
                                    {products.length}
                                </p>
                            )}
                        </div>
                        <div className='rounded-full p-4 bg-[#F2F2F2] hover:bg-[#E0E0E0] hover:cursor-pointer block md:hidden border-gray-300 border'>
                            <FiMenu />
                        </div>
                    </div>
                </div>

                <div className='hidden md:flex justify-between w-full mb-2'>
                    <DropDownMenu />
                    <div>Navbar</div>
                </div>
            </div>

            <Cart openCart={openCart} setOpenCart={setOpenCart} />
        </header>
    );
};

export default Header;
