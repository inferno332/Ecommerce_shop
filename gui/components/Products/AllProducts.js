import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { Pagination } from '@nextui-org/react';
import { AiOutlineEye, AiOutlineShoppingCart } from 'react-icons/ai';

import { useCart } from '../../zustand/useCart';

const AllProducts = ({ products }) => {
    const { add } = useCart((state) => state);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const itemPerPage = 12;
    const handlePageClick = (page) => {
        const newOffset = (page - 1) * itemPerPage;
        setItemOffset(newOffset);
    };
    useEffect(() => {
        setCurrentProducts(products.slice(itemOffset, itemOffset + itemPerPage));
        setPageCount(Math.ceil(products.length / itemPerPage));
        console.log(products.length);
    }, [products, itemOffset]);
    return (
        <div className='flex flex-col w-full gap-5'>
            <Toaster position='top-center' reverseOrder={false} />
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 w-full'>
                {currentProducts.map((product) => {
                    return (
                        <div key={product._id} className='group relative border rounded-lg cursor-pointer'>
                            <div className=' h-[200px] sm:h-[250px] lg:h-[360px] bg-transparent border-b-[#ccc] border truncate'>
                                <Link href={`/product/details/${product._id}`}>
                                    <Image
                                        src={`${process.env.BASE_URL}${product.imageURL[0]}`}
                                        alt={product.name}
                                        width='300'
                                        height='300'
                                        className=' w-full h-full object-contain group-hover:scale-110'
                                    />
                                    {product.sizes[0].discount > 0 && (
                                        <div className='discount absolute top-5'>{product.sizes[0].discount}% Off</div>
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
                                                price: Math.floor(product.sizes[0].discountPrice),
                                                image: product.imageURL[0],
                                                size: product.sizes[0].name,
                                                quantity: 1,
                                            });
                                        }}
                                    />
                                    <Link href={`/product/details/${product._id}`}>
                                        <AiOutlineEye className='border border-[#ccc] rounded-full text-3xl text-[#999] md:text-4xl p-1 bg-white  duration-200 hover:scale-110' />
                                    </Link>
                                </div>
                            </div>
                            <div className='py-2 sm:py-5 px-1'>
                                <div className='flex flex-col justify-between gap-1'>
                                    <p className='text-md md:text-lg capitalize md:tracking-[0.2px]'>
                                        {product.name.toLowerCase()}
                                    </p>
                                    {product.sizes && (
                                        <h1 className='text-md sm:text-sm font-semibold'>
                                            Size: {product.sizes[0].name}
                                        </h1>
                                    )}
                                    {product?.sizes[0].discount > 0 ? (
                                        <div className='flex gap-3 items-end'>
                                            <p className='font-semibold text-md md:text-lg text-orange-600'>
                                                ${Math.floor(product.sizes[0].discountPrice)}
                                            </p>
                                            <del className='text-md md:text-lg text-gray-500'>${product.price}</del>
                                        </div>
                                    ) : (
                                        <p className='text-md md:text-lg text-orange-700 font-semibold'>${product.price}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* Pagination */}
            <div className='mt-4 flex mx-auto'>
                <Pagination
                    total={pageCount}
                    initialPage={1}
                    onChange={(page) => handlePageClick(page)}
                    color='gradient'
                />
            </div>
        </div>
    );
};

export default AllProducts;
