import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import httpRequest from '../../ultis/axios';

import { AiOutlineEye, AiOutlineShoppingCart } from 'react-icons/ai';
import HeaderProduct from '../../components/Products/HeaderProduct';
import Sidebar from '../../components/Products/Sidebar';

import { useCart } from '../../zustand/useCart';

const ProductWithCate = ({ product, categories, suppliers }) => {
    const [isOpenFilter, setIsOpenFilter] = useState(true);
    const { add } = useCart((state) => state);

    // EVENT SCROLL HEADER
    const [hideHeader, sethideHeader] = useState(true);
    const [position, setPosition] = useState(0);

    const handleScroll = useCallback(() => {
        sethideHeader(window.pageYOffset > position);
        setPosition(window.pageYOffset);
    }, [position, hideHeader]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
    //END

    return (
        <div>
            <Toaster position='top-center' reverseOrder={false} />
            <div
                className={`${
                    hideHeader ? 'sm:top-[-1px]' : 'sm:top-[80px]'
                } ease-out duration-300 relative sm:sticky z-10`}>
                <HeaderProduct setIsOpenFilter={setIsOpenFilter} />
            </div>
            <div className='sm:flex gap-5'>
                <Sidebar
                    isOpenFilter={isOpenFilter}
                    categories={categories}
                    suppliers={suppliers}
                    hideHeader={hideHeader}
                />

                <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 w-full flex-grow'>
                    {product.map((p) => {
                        return (
                            <div key={p._id} className='group relative border rounded-lg cursor-pointer truncate'>
                                <div className='h-[200px] sm:h-[250px] lg:h-[380px] bg-[#f6f6f6]'>
                                    <Link href={`/product/details/${p._id}`}>
                                        <Image
                                            src={`${process.env.BASE_URL}${p.imageURL[0]}`}
                                            alt={p.name}
                                            width={300}
                                            height={300}
                                            priority
                                            className='w-full h-full object-contain duration-300 transform group-hover:scale-110'
                                        />
                                        {p.sizes[0].discount > 0 && (
                                            <div className='discount absolute top-5'>{p.sizes[0].discount}% Off</div>
                                        )}
                                    </Link>
                                    <div className='absolute duration-300 lg:translate-x-5 lg:opacity-0 top-2 md:top-5 right-2 md:right-5 md:group-hover:translate-x-0 md:group-hover:opacity-100'>
                                        <AiOutlineShoppingCart
                                            className='border border-[#ccc] rounded-full text-3xl text-[#999] md:text-4xl p-1 mb-1 bg-white  duration-200 hover:scale-110'
                                            onClick={() => {
                                                toast.success('Successfully Add To Cart!');
                                                add({
                                                    productId: p._id,
                                                    name: p.name,
                                                    price: Math.floor(p.sizes[0].discountPrice),
                                                    image: p.imageURL[0],
                                                    size: p.sizes[0].name,
                                                    quantity: 1,
                                                });
                                            }}
                                        />
                                        <Link href={`/product/details/${p._id}`}>
                                            <AiOutlineEye className='border border-[#ccc] rounded-full text-3xl text-[#999] md:text-4xl p-1 bg-white  duration-200 hover:scale-110' />
                                        </Link>
                                    </div>
                                </div>
                                <div className='py-2 sm:py-5 px-1'>
                                    <div className='flex flex-col justify-between gap-1'>
                                        <p className='text-sm'>{p.name}</p>
                                        {p.sizes && (
                                            <h1 className='text-md sm:text-sm font-semibold'>
                                                Size: {p.sizes[0].name}
                                            </h1>
                                        )}
                                        {p?.sizes[0].discount > 0 ? (
                                            <div className='flex gap-3 items-end'>
                                                <p className=' font-semibold text-xl text-orange-500'>
                                                    ${Math.floor(p.sizes[0].discountPrice)}
                                                </p>
                                                <del className='text-sm text-gray-500'>${p.price}</del>
                                            </div>
                                        ) : (
                                            <p className='font-semibold text-xl'>${p.price}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export async function getServerSideProps(context) {
    const { category, supplier, price } = context.query;
    const resProduct = await httpRequest.get('products/filter', {
        params: {
            category,
            supplier,
            price,
        },
    });
    const product = await resProduct.data;

    const resCate = await httpRequest.get('/categories/v1');
    const categories = await resCate.data;

    const resSuppliers = await httpRequest.get('/suppliers/v1');
    const suppliers = await resSuppliers.data;

    return {
        props: {
            product,
            categories,
            suppliers,
        },
    };
}

export default ProductWithCate;
