import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';


function Sliders({ sliders }) {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination, Autoplay]}
            className='h-[400px] lg:h-[600px]'>
            {sliders.map((slider, index) => {
                return (
                    <SwiperSlide key={index} className='relative flex justify-center items-center '>
                        <div className='absolute z-10 left-12 md:left-24 lg:left-56'>
                            <h1 className=' text-3xl font-medium'>{slider.title}</h1>
                            <p className='mb-5 mt-2'>{slider.description}</p>
                            <button className=' bg-black rounded-md w-32 text-white px-4 py-2 hover:opacity-80'>
                                SHOP NOW
                            </button>
                        </div>
                        <img
                            src={`${process.env.BASE_URL}${slider.imageUrl}`}
                            alt={slider.title}
                            className='w-[100%] h-[100%] object-fill opacity-70 rounded-lg'
                        />
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
}

export default Sliders;
