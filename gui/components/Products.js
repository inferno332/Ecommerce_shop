import React, { useState, useEffect } from 'react';
import { BsArrowRight, BsCart2 } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

const Products = ({ products }) => {
    //Fix Next.js “Text content does not match server-rendered HTML” React hydration error
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        return null;
    }
    //END

    return (
        <div className='mt-10'>
            <div className='flex justify-between items-center mb-5'>
                <h1 className='font-bold text-xl'>Recommend For You</h1>
                <div className='flex items-center gap-2 cursor-pointer border-dashed border-b border-gray-300 duration-300 sm:hover:scale-[1.1]'>
                    More products
                    <BsArrowRight className='text-xs' />
                </div>
            </div>

            <Swiper
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                    1024: {
                        slidesPerView: 4,
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
                className='[&_.swiper-button-prev]:w-[50px] [&_.swiper-button-prev]:h-[50px] [&_.swiper-button-prev]:border [&_.swiper-button-prev]:border-[#999] [&_.swiper-button-prev]:rounded-full [&_.swiper-button-next]:w-[50px] [&_.swiper-button-next]:h-[50px] [&_.swiper-button-next]:border [&_.swiper-button-next]:border-[#999] [&_.swiper-button-next]:rounded-full rounded-xl'
            >
                {products
                    .map((product) => {
                        return (
                            <SwiperSlide key={product._id} className='group border rounded-lg cursor-pointer'>
                                <div className='relative h-[600px] sm:h-[400px]'>
                                    <img
                                        src={`http://localhost:9000${product.imageURL[0]}`}
                                        alt={product.name}
                                        className='w-[100%] h-[100%] object-fill'
                                    />
                                </div>
                                <i className='absolute top-5 right-5  animate-[wiggle_1s_ease-in-out_infinite] lg:animate-none lg:group-hover:animate-[wiggle_1s_ease-in-out_infinite] text-2xl p-3 opacity-50 border border-black rounded-full bg-white'>
                                    <BsCart2 />
                                </i>
                                <div className='flex items-center justify-between py-5 px-2'>
                                    <h1 className='text-md sm:text-xs'>{product.name}</h1>
                                    <p className=' font-bold text-xl'>${product.price}</p>
                                </div>
                            </SwiperSlide>
                        );
                    })
                    .slice(0, 5)}
            </Swiper>
        </div>
    );
};

export default Products;
