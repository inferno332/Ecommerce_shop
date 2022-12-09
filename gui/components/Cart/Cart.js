import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';

import { MdOutlineCancel } from 'react-icons/md';
import EmptyCart from './EmptyCart';
import FilledCart from './FilledCart';

import { useCart } from '../../zustand/useCart';

export default function Cart({ setOpenCart, openCart }) {
    const router = useRouter();
    const { products, sum, subTotal } = useCart((state) => state);

    const quantity = products
        .map((item) => item.quantity)
        .reduce((total, value) => {
            total += value;
            return total;
        }, 0);

    useEffect(() => {
        sum();
    }, [quantity]);

    return (
        <Transition show={openCart} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={setOpenCart}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'>
                    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-hidden'>
                    <div className='absolute inset-0 overflow-hidden'>
                        <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                            <Transition.Child
                                as={Fragment}
                                enter='transform transition ease-in-out duration-500 sm:duration-700'
                                enterFrom='translate-x-full'
                                enterTo='translate-x-0'
                                leave='transform transition ease-in-out duration-500 sm:duration-700'
                                leaveFrom='translate-x-0'
                                leaveTo='translate-x-full'>
                                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                                    <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                                        <div className='overflow-y-auto py-6 px-4 sm:px-6'>
                                            <div className='flex items-start justify-between'>
                                                <Dialog.Title className='text-lg font-medium text-gray-900'>
                                                    SHOPPING CART
                                                </Dialog.Title>
                                                <div className='ml-3 flex h-7 items-center'>
                                                    <button
                                                        type='button'
                                                        className='-m-2 p-2 outline-none text-gray-400 hover:text-gray-500'
                                                        onClick={() => setOpenCart(false)}>
                                                        <MdOutlineCancel className='h-6 w-6' aria-hidden='true' />
                                                    </button>
                                                </div>
                                            </div>
                                            {products?.length > 0 ? (
                                                <FilledCart setOpenCart={setOpenCart} />
                                            ) : (
                                                <EmptyCart setOpenCart={setOpenCart} />
                                            )}
                                        </div>

                                        {products?.length > 0 && (
                                            <div className='border-t border-gray-200 py-6 px-4 sm:px-6'>
                                                <div className='flex justify-between text-base font-medium text-gray-900'>
                                                    <p>Subtotal:</p>
                                                    <p>${subTotal}</p>
                                                </div>
                                                <p className='mt-0.5 text-sm text-gray-500'>
                                                    Shipping and taxes calculated at checkout.
                                                </p>
                                                <button
                                                    className='mt-6 w-full flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm opacity-90 hover:opacity-100'
                                                    onClick={() => {
                                                        router.push('/checkout');
                                                        setOpenCart(false);
                                                    }}>
                                                    Checkout
                                                </button>
                                                <div className='flex justify-center text-center text-sm '>
                                                    <div className='flex flex-col'>
                                                        <p className='my-2'>or</p>
                                                        <button
                                                            className='font-medium opacity-80 hover:opacity-100'
                                                            onClick={() => {
                                                                router.push('/product');
                                                                setOpenCart(false);
                                                            }}>
                                                            Continue Shopping
                                                            <span aria-hidden='true'> &rarr;</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
