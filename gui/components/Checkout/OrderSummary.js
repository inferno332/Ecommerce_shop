import React from 'react';
import Image from 'next/image';
import { useCart } from '../../zustand/useCart';

const OrderSummary = () => {
    const { subTotal, products } = useCart((state) => state);
    return (
        <div>
            <h1 className='font-semibold text-2xl mb-3'>Order Summary</h1>
            <div>
                <div className='flex flex-col'>
                    <div className='border-b pb-2'>
                        <div className='flex justify-between gap-20 text-[#8d8d8d] pb-2'>
                            <p>Subtotal:</p>
                            <p>${subTotal}</p>
                        </div>
                        <div className='flex justify-between gap-20 text-[#8d8d8d]'>
                            <p>Delivery/Shipping:</p>
                            <p>Free</p>
                        </div>
                    </div>
                    <div className='flex justify-between gap-20 font-medium py-3 border-b'>
                        <p>Total:</p>
                        <p>${subTotal}</p>
                    </div>
                </div>
                <div className='flex flex-col gap-5 mt-5 max-h-[500px] overflow-y-scroll'>
                    {products.map((product) => {
                        return (
                            <div className='flex gap-5'>
                                <div className='w-[150px] h-[150px]'>
                                    <Image
                                        src={`http://localhost:9000${product.product.imageURL[0]}`}
                                        alt={product.product.name}
                                        width='200'
                                        height='200'
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                                <div className='flex flex-col gap-1 text-[#8d8d8d]'>
                                    <p className='font-medium text-black'>{product.product.name}</p>
                                    <div className='flex gap-5'>
                                        <p>Quantity:</p>
                                        <p>{product.quantity}</p>
                                    </div>
                                    <div className='flex gap-5'>
                                        <p>Size:</p>
                                        <p>EU 38</p>
                                    </div>
                                    <div className='flex gap-5'>
                                        <p>Total:</p>
                                        <p>${product.product.price * product.quantity}</p>
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