import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import httpRequest from '../../ultis/axios';

import HeaderProduct from '../../components/Products/HeaderProduct';
import Sidebar from '../../components/Products/Sidebar';
import AllProducts from '../../components/Products/AllProducts';
import PaginatedItems from '../../components/Pagination';

const ProductWithCate = ({ products, categories, suppliers }) => {
    const [isOpenFilter, setIsOpenFilter] = useState(true);

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
            <Head>
                <title>Our Products</title>
                <meta name='description' content='Generated by create next app' />
                <link rel='icon' href='/gingercoons-Hightop-Sneakers.svg' />
            </Head>

            <div
                className={`${
                    hideHeader ? 'sm:top-0' : 'sm:top-[80px]'
                } ease-linear duration-100 relative sm:sticky h-14 mt-4 mb-4 z-[9]`}>
                <HeaderProduct setIsOpenFilter={setIsOpenFilter} />
            </div>
            <div className='sm:flex '>
                <div className='relative'>
                    <Sidebar
                        isOpenFilter={isOpenFilter}
                        categories={categories}
                        suppliers={suppliers}
                        hideHeader={hideHeader}
                    />
                </div>
                <AllProducts products={products} />
            </div>
            <PaginatedItems products={products} />
        </div>
    );
};

export async function getServerSideProps(context) {
    const { category, supplier, price, page } = context.query;
    const resProduct = await httpRequest.get('products/filter', {
        params: {
            category,
            supplier,
            price,
            page,
        },
    });
    const products = await resProduct.data;

    const resCate = await httpRequest.get('/categories/v1');
    const categories = await resCate.data;

    const resSuppliers = await httpRequest.get('/suppliers/v1');
    const suppliers = await resSuppliers.data;

    return {
        props: {
            products,
            categories,
            suppliers,
        },
    };
}

export default ProductWithCate;
