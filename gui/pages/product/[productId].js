import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import { Autoplay, Navigation, Thumbs, FreeMode, Scrollbar } from 'swiper';
import httpRequest from '../../ultis/axios';

const Product = ({ product }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
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
                        className='[&_.swiper-wrapper]:justify-center'>
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
                    <div className='flex flex-col p-5'>
                        <h1 className='text-3xl font-semibold mb-1'>{product.name}</h1>
                        <h2 className='text-lg mb-3'>Men's Shoes</h2>
                        <span className='text-lg text-gray-700'>$ {product.price}</span>
                    </div>
                    {/* Size Selector */}
                    <div className='flex flex-col p-5'>
                        <p className='text-lg'>Select Size</p>
                        <div className='grid grid-cols-3 gap-2 mt-2'>
                            {SizeSelect.map((item) =>
                                item.available ? (
                                    <div
                                        key={item.value}
                                        className={`flex justify-center items-center font-semibold w-full h-12 border border-gray-300 rounded-md cursor-pointer hover:border-black
                                ${item.value === size ? 'border-black' : ''}
                                `}
                                        onClick={() => handleSizeSelect(item.value)}>
                                        EU {item.value}
                                    </div>
                                ) : (
                                    <div
                                        key={item.value}
                                        className='flex justify-center items-center font-semibold w-full h-12 border border-gray-300 rounded-md cursor-default opacity-40 bg-slate-300'>
                                        EU {item.value}
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                    {/* Add to Cart */}
                    <div className='flex flex-col mb-10 p-5'>
                        <button className='flex justify-center items-center w-full h-16 bg-black text-white font-semibold rounded-full cursor-pointer hover:bg-gray-900'>
                            Add to Cart
                        </button>
                    </div>
                    {/* Product Description */}
                    <div className='flex flex-col mb-2 p-5'>
                        <p className='leading-7 mb-3'>{product.description}</p>
                    </div>
                </div>
            </div>
            {/* Related Products */}
            <div className='h-96 md:h-[300px] w-full'>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={10}
                    freeMode={true}
                    scrollbar={{ draggable: true, dragSize: 100 }}
                    modules={[FreeMode, Scrollbar]}
                    className='h-full'>
                    <SwiperSlide>Slide 1</SwiperSlide>
                    <SwiperSlide>Slide 2</SwiperSlide>
                    <SwiperSlide>Slide 3</SwiperSlide>
                    <SwiperSlide>Slide 4</SwiperSlide>
                    <SwiperSlide>Slide 5</SwiperSlide>
                    <SwiperSlide>Slide 6</SwiperSlide>
                    <SwiperSlide>Slide 7</SwiperSlide>
                    <SwiperSlide>Slide 8</SwiperSlide>
                    <SwiperSlide>Slide 9</SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};
export async function getServerSideProps(context) {
    const { productId } = context.query;
    const product = await httpRequest.get(`/products/v2/${productId}`);
    return {
        props: {
            product: product.data,
        },
    };
}

export default Product;
