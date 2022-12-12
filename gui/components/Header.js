import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiUser, FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';

import Cart from './Cart/Cart';
import { useCart } from '../zustand/useCart';
import MobileMenuModal from './MobileMenuModal';
import SearchBar from './SearchBar';

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

    return (
        <header>
            <motion.div
                initial={{ y: 0 }}
                animate={{ y: hideHeader ? -100 : 0 }}
                className='bg-white ease-out duration-300 flex justify-between items-center md:h-20 gap-2 md:gap-6 py-2 md:py-0 mx-[-5px]'>
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
                        <SearchBar />
                    </div>
                </div>
                {/* End search bar */}
                <div className='flex md:gap-2 items-center'>
                    <span className='rounded-full text-lg p-4 hover:bg-[#E0E0E0] hover:cursor-pointer hidden md:block'>
                        <FiUser />
                    </span>
                    <div className='relative p-4'>
                        <span
                            className='rounded-full hover:bg-[#E0E0E0] hover:cursor-pointer'
                            onClick={() => setOpenCart((prev) => !prev)}>
                            <FiShoppingCart />
                        </span>
                        {products?.length > 0 && (
                            <p className='absolute top-0 right-0 translate-x-[10px] translate-y-[-5px] hidden md:block w-[25px] border rounded-full text-center bg-black text-white font-bold text-'>
                                {products.length}
                            </p>
                        )}
                    </div>
                    <span className='rounded-full text-lg p-4 hover:bg-[#E0E0E0] hover:cursor-pointer block md:hidden'>
                        {/* <FiMenu /> */}
                        <MobileMenuModal />
                    </span>
                </div>
            </motion.div>

            <Cart openCart={openCart} setOpenCart={setOpenCart} />
        </header>
    );
};

export default Header;
