import React, { useState } from 'react';
import Link from 'next/link';
import httpRequest from '../../ultis/axios';
import { AiOutlineEye, AiOutlineShoppingCart } from 'react-icons/ai';

import HeaderProduct from '../../components/Products/HeaderProduct';
import Sidebar from '../../components/Products/Sidebar';

const ProductWithCate = ({ product, categories, suppliers }) => {
    const [isOpenFilter, setIsOpenFilter] = useState(true);
    console.log(product);
    return (
        <div>
            <div className='relative sm:sticky sm:top-0 z-10'>
                <HeaderProduct setIsOpenFilter={setIsOpenFilter} />
            </div>
            <div className='sm:flex'>
                <Sidebar isOpenFilter={isOpenFilter} categories={categories} suppliers={suppliers} />

                <div className='grid grid-cols-2 sm:grid-cols-3 gap-5 w-full'>
                    {product.map((p) => {
                        return (
                            <div key={p._id} className='group relative border rounded-lg cursor-pointer'>
                                <div className=' h-[200px] sm:h-[250px] lg:h-[400px] bg-[#f6f6f6]'>
                                    <Link href={`/product/details/${p._id}`}>
                                        <img
                                            src={`http://localhost:9000${p.imageURL[0]}`}
                                            alt={p.name}
                                            className=' w-full h-full object-contain'
                                        />
                                    </Link>
                                    <div className='absolute duration-300 lg:translate-x-5 lg:opacity-0 top-2 md:top-5 right-2 md:right-5 md:group-hover:translate-x-0 md:group-hover:opacity-100'>
                                        <AiOutlineShoppingCart className='border border-[#ccc] rounded-full text-3xl text-[#999] md:text-4xl p-1 mb-1 bg-white  duration-200 hover:scale-110' />
                                        <AiOutlineEye className='border border-[#ccc] rounded-full text-3xl text-[#999] md:text-4xl p-1 bg-white  duration-200 hover:scale-110' />
                                    </div>
                                </div>
                                <div className='flex flex-col sm:flex-row justify-between items-start gap-5 py-2 sm:py-5 px-1'>
                                    <p className='text-sm'>{p.name}</p>
                                    <p className='font-semibold'>${p.price}</p>
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
    const { category, supplier, option } = context.query;
    const resProduct = await httpRequest.get(
        `products/filter?category=${category}&supplier=${supplier}&option=${option}`,
    );
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
