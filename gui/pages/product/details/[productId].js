import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import { Autoplay, Navigation, Thumbs, Scrollbar, FreeMode } from 'swiper';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import httpRequest from '../../../ultis/axios';

const Product = ({ product, products }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    const SizeSelect = [
        { value: '40', available: true },
        { value: '40.5', available: true },
        { value: '41', available: true },
        { value: '41.5', available: true },
        { value: '42', available: true },
        { value: '42.5', available: false },
        { value: '43', available: true },
        { value: '43.5', available: true },
        { value: '44', available: true },
        { value: '44.5', available: true },
        { value: '45', available: true },
        { value: '45.5', available: true },
        { value: '46', available: true },
        { value: '46.5', available: true },
        { value: '47', available: true },
        { value: '47.5', available: false },
    ];
    const [size, setSize] = useState('40');
    const handleSizeSelect = (targetSize) => {
        setSize(targetSize);
    };
    return (
        <div className='flex flex-col gap-5 justify-center items-center mt-5'>
            <div className='flex flex-col md:flex-row w-full'>
                <div className='flex-1 md:w-1/2 h-96 md:h-[600px]'>
                    <Swiper
                        className='h-full mb-2'
                        spaceBetween={10}
                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                        modules={[Autoplay, Thumbs]}>
                        {product.imageURL.map((image) => (
                            <SwiperSlide key={image}>
                                <img
                                    src={`http://localhost:9000${image}`}
                                    alt={product.name}
                                    className='w-full h-full object-cover rounded-xl overflow-hidden'
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        slidesPerView={product?.imageURL.length}
                        spaceBetween={10}
                        watchSlidesProgress
                        modules={[Autoplay, Navigation, Thumbs]}
                        className='[&_.swiper-wrapper]:justify-center [&_.swiper-wrapper]:flex-wrap'>
                        {product.imageURL.map((image, index) => (
                            <SwiperSlide key={image} className='cursor-pointer rounded-xl truncate !w-16 !h-16'>
                                <img
                                    src={`http://localhost:9000${image}`}
                                    alt={product.name}
                                    className='object-cover w-full h-full'
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className='flex flex-col w-full md:w-[464px]'>
                    <div className='flex flex-col mb-5 px-0 md:p-5'>
                        <h1 className='text-3xl font-semibold mb-1'>{product.name}</h1>
                        <h2 className='text-lg mb-3'>Men's Shoes</h2>
                        <span className='text-lg text-gray-700'>$ {product.price}</span>
                    </div>
                    {/* Size Selector */}
                    <div className='flex flex-col mb-5 md:p-5'>
                        <p className='text-lg'>Select Size</p>
                        <div className='grid grid-cols-3 gap-2 mt-2'>
                            {SizeSelect.map((item) =>
                                item.available ? (
                                    <div
                                        key={item.value}
                                        className={`flex justify-center items-center font-semibold w-full h-12 border border-solid border-gray-300 rounded-md cursor-pointer hover:border-black
                                ${item.value === size ? 'border-black' : ''}
                                `}
                                        onClick={() => handleSizeSelect(item.value)}>
                                        EU {item.value}
                                    </div>
                                ) : (
                                    <div
                                        key={item.value}
                                        className='flex justify-center items-center font-semibold w-full h-12 border border-solid border-gray-300 rounded-md cursor-default opacity-40 bg-slate-300'>
                                        EU {item.value}
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                    {/* Add to Cart */}
                    <div className='flex flex-col mb-10 p-0 md:p-5'>
                        <button className='flex justify-center items-center w-full h-16 bg-black text-white font-semibold rounded-full cursor-pointer hover:bg-gray-900'>
                            Add to Cart
                        </button>
                    </div>
                    {/* Product Description */}
                    <div className='flex flex-col mb-10 md:p-5'>
                        <p className='leading-7 mb-3'>{product.description}</p>
                    </div>
                </div>
            </div>
            {/* Related Products */}
            <div className='w-full'>
                <h3 className='text-2xl font-semibold mb-5'>Related Products</h3>
                {/* Navigation Button */}
                <div className='relative flex [&_.swiper-button-disabled]:opacity-40 [&_.swiper-button-disabled]:cursor-default [&_.swiper-button-disabled]:hover:bg-zinc-200 '>
                    <div
                        className='absolute truncate top-[-64px] right-16 z-2 flex items-center justify-center p-[14px] bg-zinc-200 rounded-full cursor-pointer hover:bg-zinc-400'
                        ref={navigationPrevRef}>
                        <BsChevronLeft className='w-5 h-5' />
                    </div>
                    <div
                        ref={navigationNextRef}
                        className='absolute truncate top-[-64px] right-0 z-2 flex items-center justify-center p-[14px] bg-zinc-200 rounded-full cursor-pointer hover:bg-zinc-400'>
                        <BsChevronRight className='w-5 h-5' />
                    </div>
                </div>
                <Swiper
                    breakpoints={{
                        0: {
                            slidesPerView: 1.5,
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 2.5,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    freeMode
                    spaceBetween={10}
                    scrollbar={{ draggable: true, dragSize: 100 }}
                    navigation={{
                        prevEl: navigationPrevRef.current,
                        nextEl: navigationNextRef.current,
                    }}
                    modules={[Scrollbar, Navigation, FreeMode]}
                    className='h-full'>
                    {products.map((product) => (
                        <SwiperSlide key={product._id}>
                            <div className='flex flex-col mb-10'>
                                <img
                                    src={`http://localhost:9000${product.imageURL[0]}`}
                                    alt={product.name}
                                    className='w-60 h-60 md:w-96 md:h-96 object-cover rounded-xl overflow-hidden'
                                />
                                <h3 className='text-lg leading-4 text-gray-700 font-semibold mt-2 text-left'>
                                    {product.name}
                                </h3>
                                <h4 className='text-lg mt-1 mb-2 font-semibold text-gray-500 text-left'>
                                    {product.categoryId === '635f9e383c3d25b35278f650'
                                        ? "Women's Shoes"
                                        : product.categoryId === '6365e30a668ae24012c1dabf'
                                        ? "Men's Shoes"
                                        : 'Accessories'}
                                </h4>
                                <span className='text-lg text-gray-700'>$ {product.price}</span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};
export async function getServerSideProps(context) {
    const { productId } = context.params;
    const product = await httpRequest.get(`/products/v2/${productId}`);
    const resProducts = await httpRequest.get('/products/v1');
    return {
        props: {
            product: product.data,
            products: resProducts.data,
        },
    };
}

export default Product;