import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import toast, { Toaster } from 'react-hot-toast';

import { BsArrowRight, BsCart2 } from 'react-icons/bs';

import { useCart } from '../../zustand/useCart';

const Products = ({ products }) => {
    const router = useRouter();
    const { add } = useCart((state) => state);

    return (
        <div className='mt-10'>
            <Toaster position='top-center' reverseOrder={false} />
            <div className='flex justify-between items-center mb-5'>
                <h1 className='font-bold text-xl'>Our Products</h1>
                <div
                    className='flex items-center gap-2 cursor-pointer border-dashed border-b border-gray-300 duration-300 sm:hover:scale-[1.1]'
                    onClick={() => router.push('/product/filter')}>
                    More products
                    <BsArrowRight className='text-xs' />
                </div>
            </div>

            <Swiper
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                    1024: {
                        slidesPerView: 3.5  ,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    638: {
                        slidesPerView: 2,
                    },
                }}
                centeredSlides={true}
                loop={true}
                navigation={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Navigation, Autoplay]}
                style={{
                    '--swiper-navigation-size': '20px',
                    '--swiper-navigation-color': 'black',
                }}
                className='[&_.swiper-button-prev]:w-[50px] [&_.swiper-button-prev]:h-[50px] [&_.swiper-button-prev]:border [&_.swiper-button-prev]:border-[#999] [&_.swiper-button-prev]:rounded-full [&_.swiper-button-next]:w-[50px] [&_.swiper-button-next]:h-[50px] [&_.swiper-button-next]:border [&_.swiper-button-next]:border-[#999] [&_.swiper-button-next]:rounded-full rounded-xl'>
                {products.map((product) => {
                    return (
                        <SwiperSlide key={product._id} className='group border rounded-lg cursor-pointer'>
                            <Link href={`/product/details/${product._id}`}>
                                <div className='relative h-[450px] sm:h-[350px] bg-transparent border-b-[#ccc] border truncate'>
                                    <Image
                                        src={`${process.env.BASE_URL}/${product?.imageURL[0]}`}
                                        alt={product.name}
                                        width='200'
                                        height='200'
                                        className='w-full h-full object-contain xl:object-cover group-hover:scale-110 transition-all duration-300'
                                    />
                                </div>
                                {product.sizes[0].discount > 0 && (
                                    <div className='discount absolute top-5'>{product.sizes[0].discount}% Off</div>
                                )}
                            </Link>
                            <i
                                className='absolute top-5 right-5  animate-[wiggle_1s_ease-in-out_infinite] lg:animate-none lg:group-hover:animate-[wiggle_1s_ease-in-out_infinite] text-2xl p-3 opacity-50 border border-black rounded-full bg-white'
                                onClick={() => {
                                    toast.success('Successfully Add To Cart!');
                                    add({
                                        productId: product._id,
                                        name: product.name,
                                        price: Math.floor(product.sizes[0].discountPrice),
                                        image: product.imageURL[0],
                                        size: product.sizes[0].name,
                                        quantity: 1,
                                    });
                                }}>
                                <BsCart2 />
                            </i>
                            <div className='py-4 px-2'>
                                <div className='flex flex-col justify-between gap-1'>
                                    <h1 className='text-lg md:text-base capitalize md:tracking-[0.2px] h-12'>
                                        {product.name.toLowerCase()}
                                    </h1>
                                    {product.sizes && (
                                        <h1 className='text-lg md:text-base font-semibold'>
                                            Size: {product.sizes[0].name}
                                        </h1>
                                    )}
                                    {product?.sizes[0].discount > 0 ? (
                                        <div className='flex gap-3 items-end'>
                                            <p className='font-semibold text-xl text-orange-600'>
                                                ${Math.floor(product.sizes[0].discountPrice)}
                                            </p>
                                            <del className='text-sm text-gray-500'>${product.price}</del>
                                        </div>
                                    ) : (
                                        <p className='text-xl text-orange-700 font-semibold'>${product.price}</p>
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default Products;
