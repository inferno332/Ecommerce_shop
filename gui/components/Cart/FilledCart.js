import React from 'react';
import { useRouter } from 'next/router';

import { RiDeleteBin7Line } from 'react-icons/ri';

import { useCart } from '../../zustand/useCart';

const FilledCart = ({ setOpenCart }) => {
    const router = useRouter();
    const { products, remove, increase, decrease } = useCart((state) => state);
    return (
        <div className='mt-8'>
            <div className='flow-root'>
                <ul className='-my-6 divide-y divide-gray-200'>
                    {products.map((product) => (
                        <li key={product.product._id} className='flex py-6'>
                            <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                <img
                                    src={`http://localhost:9000${product.product.imageURL[0]}`}
                                    alt={product.product.name}
                                    className='h-full w-full object-cover object-center cursor-pointer'
                                    onClick={() => {
                                        router.push(`/product/details/${product.product._id}`);
                                        setOpenCart(false);
                                    }}
                                />
                            </div>

                            <div className='ml-4 flex flex-1 flex-col'>
                                <div
                                    className='flex justify-between text-base font-medium text-gray-900 cursor-pointer'
                                    onClick={() => {
                                        router.push(`/product/details/${product.product._id}`);
                                        setOpenCart(false);
                                    }}>
                                    <h3>{product.product.name}</h3>
                                    <p className='ml-4'>${product.product.price * product.quantity}</p>
                                </div>

                                <div className='flex flex-1 items-end justify-between text-sm'>
                                    <div className='flex items-center gap-5'>
                                        <button
                                            className='border rounded-full p-2 hover:bg-gray-50'
                                            onClick={() => decrease(product.product._id)}>
                                            <strong>-</strong>
                                        </button>
                                        <p className='text-orange-500 font-semibold'>{product.quantity}</p>
                                        <button
                                            className='border rounded-full p-2 hover:bg-gray-50'
                                            onClick={() => increase(product.product._id)}>
                                            <strong>+</strong>
                                        </button>
                                    </div>

                                    <div className='flex'>
                                        <button
                                            type='button'
                                            className='flex items-center gap-1 border border-red-300 px-5 py-2 rounded-lg font-medium text-gray-600 hover:text-gray-800 hover:border-red-600'
                                            onClick={() => remove(product.product._id)}>
                                            Remove <RiDeleteBin7Line />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FilledCart;
