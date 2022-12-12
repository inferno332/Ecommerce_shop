import React from 'react';
import { useRouter } from 'next/router';

const EmptyCart = ({ setOpenCart }) => {
    const router = useRouter();
    return (
        <div className='flex flex-col gap-5 justify-center items-center h-[70vh]'>
            <img
                src='https://bengo.vn/static/version1650994791/frontend/MageBig/martfury_layout01/vi_VN/images/empty-cart.svg'
                alt='empty-cart'
            />
            <h2 className='font-semibold'>YOUR CART IS EMPTY!</h2>
            <div className='flex flex-col items-center text-sm font-thin'>
                <p>You have no items in your shopping cart.</p>
                <p>Let's go buy something!</p>
            </div>
            <button
                className='border rounded-xl px-5 py-2 bg-orange-200 opacity-80 hover:opacity-100'
                onClick={() => {
                    router.push('/product');
                    setOpenCart(false);
                }}>
                <p className='text-lg font-semibold text-gray-800'>Shop Now</p>
            </button>
        </div>
    );
};

export default EmptyCart;
