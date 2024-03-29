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
    const [isOpen, setIsOpen] = useState(false);

    // EVENT SCROLL HEADER
    const [hideHeader, sethideHeader] = useState(false);
    const [position, setPosition] = useState(window.pageYOffset);

    const handleScroll = useCallback(() => {
        let moving = window.pageYOffset;
        if (moving < -10) {
            sethideHeader(false);
        }
        sethideHeader(moving > position);
        setPosition(moving);
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
                    } bg-white ease-linear duration-150 flex justify-between items-center h-full gap-2 md:gap-6 mx-[-5px] sm:mx-auto pb-2`}>
                    <Link href='/'>
                        <div className={`${isOpen ? 'hidden md:block' : ''} transition-all`}>
                            <Image
                                src='/ss-logo.svg'
                                alt='logo'
                                width={200}
                                height={200}
                                priority
                                className='hover:opacity-70 h-24 w-24'
                            />
                        </div>
                    </Link>

                    <div className='hidden lg:flex gap-10'>
                        <Link href='/'>
                            <div className='border-b-2 duration-200 border-transparent hover:border-black text-xl'>
                                <h4>Home</h4>
                            </div>
                        </Link>
                        <Link href='/product/filter'>
                            <div className='border-b-2 duration-200 border-transparent hover:border-black text-xl'>
                                <h4>Products</h4>
                            </div>
                        </Link>
                        <Link href='/about-us'>
                            <div className='border-b-2 duration-200 border-transparent hover:border-black text-xl'>
                                <h4>About Us</h4>
                            </div>
                        </Link>
                    </div>

                    {/* Search bar */}
                    <div className='items-center flex flex-grow rounded-full bg-transparent relative'>
                        <div className='relative w-full flex flex-row-reverse'>
                            <SearchBar setIsOpen={setIsOpen} isOpen={isOpen} />
                        </div>
                    </div>
                    {/* End search bar */}
                    <div className={`flex md:gap-2 items-center transition-all ${isOpen ? 'hidden sm:flex' : ''}`}>
                        <div className='relative p-4'>
                            <span
                                className='rounded-full hover:opacity-70 hover:cursor-pointer'
                                onClick={() => setOpenCart((prev) => !prev)}>
                                <FiShoppingCart />
                            </span>
                            {products?.length > 0 && (
                                <div className='absolute top-0 right-0 translate-x-[5px] translate-y-[-2px] border rounded-full text-center bg-black text-white font-bold text-xs'>
                                    <span className='text-center leading-5 p-2'>{products.length}</span>
                                </div>
                            )}
                        </div>
                        <span className='rounded-full text-lg p-4 hover:opacity-70 hover:cursor-pointer block lg:hidden'>
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
