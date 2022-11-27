import React, { useState } from 'react';
import { motion } from 'framer-motion';

const prices = ['under $100', '$100 - $200', 'above $200'];

const AllProducts = ({ categories, suppliers, isOpenFilter, products }) => {
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
                    <form className='border-b pb-3'>
                        <p className='font-medium pb-2'>Categories</p>
                        {categories.map((category) => {
                            return (
                                <div key={category._id} className='flex gap-2 py-1'>
                                    <input type='checkbox' value={category.name} className='w-5' />
                                    <label>{category.name}</label>
                                </div>
                            );
                        })}
                    </form>

                    <form className='border-b py-3'>
                        <p className='font-medium pb-2'>Brands</p>
                        {suppliers.map((supplier) => {
                            return (
                                <div key={supplier._id} className='flex gap-2 py-1'>
                                    <input
                                        type='checkbox'
                                        value={supplier.name}
                                        className='w-5'
                                        onChange={(e) => console.log(e.target.value)}
                                    />
                                    <label>{supplier.name}</label>
                                </div>
                            );
                        })}
                    </form>

                    <form className='border-b py-3'>
                        <p className='font-medium pb-2'>Prices</p>
                        {prices.map((price, index) => {
                            return (
                                <div key={index} className='flex gap-2 py-1'>
                                    <input type='checkbox' className='w-5' />
                                    <label>{price}</label>
                                </div>
                            );
                        })}
                    </form>
                </div>
            </motion.div>

            {/* PRODUCTS */}
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 w-full'>
                {products.map((product) => {
                    return (
                        <div key={product._id} className='border rounded-lg cursor-pointer'>
                            <div className='h-[200px] sm:h-[250px] lg:h-[400px] bg-[#f6f6f6]'>
                                <img
                                    src={`http://localhost:9000${product.imageURL[0]}`}
                                    alt={product.name}
                                    className='w-full h-full object-contain'
                                />
                            </div>
                            <div className='flex flex-col sm:flex-row justify-between items-start gap-5 py-2 sm:py-5 px-1'>
                                <p className='text-sm'>{product.name}</p>
                                <p className='font-semibold'>${product.price}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AllProducts;
