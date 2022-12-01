import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AiOutlineEye, AiOutlineShoppingCart } from 'react-icons/ai';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';

const AllProducts = ({ products, page }) => {
    const router = useRouter();
    return (
        <div className='flex flex-col w-full gap-5'>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 w-full'>
                {products.map((product) => {
                    return (
                        <div key={product._id} className='group relative border rounded-lg cursor-pointer'>
                            <div className=' h-[200px] sm:h-[250px] lg:h-[400px] bg-[#f6f6f6]'>
                                <Link href={`/product/details/${product._id}`}>
                                    <img
                                        src={`http://localhost:9000${product.imageURL[0]}`}
                                        alt={product.name}
                                        className=' w-full h-full object-contain'
                                    />
                                </Link>
                                <div className='absolute duration-300 lg:translate-x-5 lg:opacity-0 top-2 md:top-5 right-2 md:right-5 md:group-hover:translate-x-0 md:group-hover:opacity-100'>
                                    <AiOutlineShoppingCart className='border border-[#ccc] rounded-full text-3xl text-[#999] md:text-4xl p-1 mb-1 bg-white  duration-200 hover:scale-110' />
                                    <AiOutlineEye className='border border-[#ccc] rounded-full text-3xl text-[#999] md:text-4xl p-1 bg-white  duration-200 hover:scale-110' />
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
                    }}>
                    <HiOutlineArrowLeft />
                </button>
                <button
                    disabled={products.length <= 11}
                    className={`${
                        products.length <= 11 && 'disabled:opacity-20'
                    } text-3xl border rounded-full p-2 duration-300 hover:scale-110`}
                    onClick={() => {
                        router.push(`/product?page=${++page}`);
                    }}>
                    <HiOutlineArrowRight />
                </button>
            </div>
        </div>
    );
};

export default AllProducts;
