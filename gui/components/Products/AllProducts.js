import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';

import { AiOutlineEye, AiOutlineShoppingCart } from 'react-icons/ai';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';

import { useCart } from '../../zustand/useCart';

const AllProducts = ({ products, page }) => {
    const { add } = useCart((state) => state);
    const router = useRouter();
    return (
        <div className='flex flex-col w-full gap-5'>
            <Toaster position='top-center' reverseOrder={false} />
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 w-full'>
                {products.map((product) => {
                    return (
                        <div key={product._id} className='group relative border rounded-lg cursor-pointer'>
                            <div className=' h-[200px] sm:h-[250px] lg:h-[400px] bg-[#f6f6f6]'>
                                <Link href={`/product/details/${product._id}`}>
                                    <Image
                                        src={`${process.env.BASE_URL}${product.imageURL[0]}`}
                                        alt={product.name}
                                        width='300'
                                        height='300'
                                        className=' w-full h-full object-contain'
                                    />
                                    {product.discount > 0 && (
                                        <div className='discount absolute top-3 sm:top-5'>{product.discount}% Off</div>
                                    )}
                                </Link>
                                <div className='absolute duration-300 lg:translate-x-5 lg:opacity-0 top-2 md:top-5 right-2 md:right-5 md:group-hover:translate-x-0 md:group-hover:opacity-100'>
                                    <AiOutlineShoppingCart
                                        className='border border-[#ccc] rounded-full text-3xl text-[#999] md:text-4xl p-1 mb-1 bg-white  duration-200 hover:scale-110'
                                        onClick={() => {
                                            toast.success('Successfully Add To Cart!');
                                            add({
                                                productId: product._id,
                                                name: product.name,
                                                price: product.discountPrice,
                                                image: product.imageURL[0],
                                                quantity: 1,
                                            });
                                        }}
                                    />
                                    <Link href={`/product/details/${product._id}`}>
                                        <AiOutlineEye className='border border-[#ccc] rounded-full text-3xl text-[#999] md:text-4xl p-1 bg-white  duration-200 hover:scale-110' />
                                    </Link>
                                </div>
                            </div>
                            <div className=' py-2 sm:py-5 px-1'>
                                <p className='text-sm'>{product.name}</p>
                                {product.discount > 0 ? (
                                    <div className='flex gap-3'>
                                        <del className='text-xl text-gray-500'>${product.price}</del>
                                        <span> &rarr;</span>
                                        <p className=' font-semibold text-xl text-orange-500'>
                                            ${product.discountPrice}
                                        </p>
                                    </div>
                                ) : (
                                    <p className='font-semibold text-xl'>${product.price}</p>
                                )}
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
