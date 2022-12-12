import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../../zustand/useCart';

import { AiOutlineArrowDown, AiOutlineArrowUp, AiFillQuestionCircle } from 'react-icons/ai';
import { Tooltip, IconButton } from '@mui/material';

const OrderSummary = () => {
    const [isOpenSummary, setIsOpenSummary] = useState(false);
    const { subTotal, products } = useCart((state) => state);

    return (
        <div>
            <div
                className='flex justify-between items-center border-b cursor-pointer'
                onClick={() => setIsOpenSummary((prev) => !prev)}>
                <div className='font-semibold text-2xl mb-3'>
                    <h1>Order Summary</h1>
                </div>
                <div className='flex items-center gap-2 font-medium'>
                    <p>${subTotal}</p>
                    <p>({products.length} items)</p>
                    {isOpenSummary ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
                </div>
            </div>
            <div className={`${isOpenSummary ? 'hidden' : 'block'}`}>
                <div className='flex flex-col'>
                    <div className='border-b py-2'>
                        <div className='flex justify-between items-center gap-20 text-[#8d8d8d] pb-2'>
                            <div className='flex items-center'>
                                <p>Subtotal</p>
                                <span>
                                    <Tooltip title='The subtotal reflects the total price of your order, including taxes, before any applicable discounts. It does not include shipping costs.'>
                                        <IconButton>
                                            <AiFillQuestionCircle />
                                        </IconButton>
                                    </Tooltip>
                                </span>
                            </div>
                            <p>${subTotal}</p>
                        </div>
                        <div className='flex mb-2 justify-between gap-20 text-[#8d8d8d]'>
                            <p>Delivery/Shipping:</p>
                            <p>Free</p>
                        </div>
                    </div>
                    <div className='flex justify-between gap-20 font-medium py-3 '>
                        <p>Total:</p>
                        <p>${subTotal}</p>
                    </div>
                </div>
                <div className='scroll-bar flex flex-col gap-5 mt-5 max-h-[450px]'>
                    {products.map((product) => {
                        return (
                            <div key={product.productId} className='flex gap-5'>
                                <div className='w-[150px] h-[150px]'>
                                    <Image
                                        src={`${process.env.BASE_URL}${product.image}`}
                                        alt={product.name}
                                        width='200'
                                        height='200'
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                                <div className='flex flex-col gap-1 text-[#8d8d8d]'>
                                    <p className='font-medium text-black'>{product.name}</p>
                                    <div className='flex gap-5'>
                                        <p>Quantity:</p>
                                        <p>{product.quantity}</p>
                                    </div>
                                    <div className='flex gap-5'>
                                        <p>Size:</p>
                                        <p>{product.size}</p>
                                    </div>
                                    <div className='flex gap-5'>
                                        <p>Total:</p>
                                        <p>${product.price * product.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
