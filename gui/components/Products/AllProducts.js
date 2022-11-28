import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { AiOutlineEye, AiOutlineShoppingCart } from 'react-icons/ai';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';

const prices = ['under $100', '$100 - $200', 'above $200'];

const AllProducts = ({ categories, suppliers, isOpenFilter, products, page }) => {
    const router = useRouter();

    const listVariants = {
        close: { width: 0, height: 0, opacity: 0, transition: { duration: 0.5 } },
        open: { width: '200px', height: '85vh', opacity: 1, transition: { duration: 0.5 } },
    };

    return (
        <div className='sm:flex'>
            {/* SIDEBAR */}
            <motion.div
                animate={isOpenFilter ? 'open' : 'close'}
                variants={listVariants}
                className='sm:sticky sm:top-[50px] flex'
            >
                <div>
                    <div className='border-b pb-3'>
                        <p className='font-medium pb-2'>Categories</p>
                        {categories.map((category) => {
                            return (
                                <div key={category._id} className='flex gap-2 py-1'>
                                    <input
                                        type='checkbox'
                                        value={category.name}
                                        className='w-5'
                                        onChange={(e) => console.log(e.target.value)}
                                    />
                                    <label>{category.name}</label>
                                </div>
                            );
                        })}
                    </div>

                    <div className='border-b py-3'>
                        <p className='font-medium pb-2'>Brands</p>
                        {suppliers.map((supplier) => {
                            return (
                                <div key={supplier._id} className='flex gap-2 py-1'>
                                    <input type='checkbox' value={supplier.name} className='w-5' />
                                    <label>{supplier.name}</label>
                                </div>
                            );
                        })}
                    </div>

                    <div className='border-b py-3'>
                        <p className='font-medium pb-2'>Prices</p>
                        {prices.map((price, index) => {
                            return (
                                <div key={index} className='flex gap-2 py-1'>
                                    <input type='checkbox' className='w-5' />
                                    <label>{price}</label>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>

            {/* PRODUCTS */}
            <div className='flex flex-col w-full gap-5'>
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 w-full'>
                    {products.map((product) => {
                        return (
                            <div key={product._id} className='group relative border rounded-lg cursor-pointer'>
                                <div className=' h-[200px] sm:h-[250px] lg:h-[400px] bg-[#f6f6f6]'>
                                    <img
                                        src={`http://localhost:9000${product.imageURL[0]}`}
                                        alt={product.name}
                                        className=' w-full h-full object-contain'
                                    />
                                    <div className='absolute duration-300 lg:translate-x-5 lg:opacity-0 top-2 md:top-5 right-2 md:right-5 md:group-hover:translate-x-0 md:group-hover:opacity-100'>
                                        <i>
                                            <AiOutlineShoppingCart className='border border-[#ccc] rounded-full text-3xl text-[#999] md:text-4xl p-1 mb-1 bg-white  duration-200 hover:scale-110' />
                                        </i>
                                        <i>
                                            <AiOutlineEye className='border border-[#ccc] rounded-full text-3xl text-[#999] md:text-4xl p-1 bg-white  duration-200 hover:scale-110' />
                                        </i>
                                    </div>
                                </div>
                                <div className='flex flex-col sm:flex-row justify-between items-start gap-5 py-2 sm:py-5 px-1'>
                                    <p className='text-sm'>{product.name}</p>
                                    <p className='font-semibold'>${product.price}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className='flex justify-center gap-14'>
                    <button
                        disabled={page == 0}
                        className={`${
                            page == 0 && 'disabled:opacity-20'
                        } text-3xl border rounded-full p-2 duration-300 hover:scale-110`}
                        onClick={() => {
                            router.push(`/product?page=${--page}`);
                        }}
                    >
                        <HiOutlineArrowLeft />
                    </button>
                    <button
                        disabled={products.length <= 11}
                        className={`${
                            products.length <= 11 && 'disabled:opacity-20'
                        } text-3xl border rounded-full p-2 duration-300 hover:scale-110`}
                        onClick={() => {
                            router.push(`/product?page=${++page}`);
                        }}
                    >
                        <HiOutlineArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
