import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';

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
        <div className='sticky h-14 sm:h-20 top-0 container mx-auto z-[10]'>
            <header>
                <div
                    className={`${
                        hideHeader ? 'h-0 translate-y-[-100px]' : 'h-[80px] translate-y-0'
                    } bg-white ease-linear duration-150 flex justify-between items-center h-full gap-2 md:gap-6 mx-[-5px] sm:mx-auto`}>
                    <Link href='/'>
                        <Image
                            src='/ss-logo.svg'
                            alt='logo'
                            width={300}
                            height={300}
                            priority
                            className='hidden md:inline-block hover:opacity-70 h-28 w-28'
                        />
                    </Link>
                    <div className='hidden lg:flex flex-1 gap-10'>
                        <Link href='/'>
                            <div className='opacity-80 duration-200 hover:opacity-100'>Home</div>
                        </Link>
                        <Link href='/product/filter'>
                            <div className='opacity-80 duration-200 hover:opacity-100'>Products</div>
                        </Link>
                        <Link href='/about-us'>
                            <div className='opacity-80 duration-200 hover:opacity-100'>About Us</div>
                        </Link>
                    </div>
                    {/* Search bar */}
                    <div className='items-center flex flex-grow rounded-full bg-transparent relative'>
                        <div className='relative w-full flex flex-row-reverse'>
                            <SearchBar />
                        </div>
                    </div>
                    {/* End search bar */}
                    <div className='flex md:gap-2 items-center'>
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
                        <span className='rounded-full text-lg p-4 hover:bg-[#E0E0E0] hover:cursor-pointer block lg:hidden'>
                            {/* <FiMenu /> */}
                            <MobileMenuModal />
                        </span>
                    </div>
                </div>

                <Cart openCart={openCart} setOpenCart={setOpenCart} />
            </header>
        </div>
    );
};

export default Header;
