import React, { useState } from 'react';
import httpRequest from '../../ultis/axios';

import AllProducts from '../../components/Products/AllProducts';
import HeaderProduct from '../../components/Products/HeaderProduct';
import Sidebar from '../../components/Products/Sidebar';

const Products = ({ categories, suppliers, products, page }) => {
    const [isOpenFilter, setIsOpenFilter] = useState(true);
    return (
        <div>
            <div className='relative sm:sticky sm:top-0 z-10'>
                <HeaderProduct setIsOpenFilter={setIsOpenFilter} />
            </div>
            <div className='sm:flex'>
                <Sidebar isOpenFilter={isOpenFilter} categories={categories} suppliers={suppliers} />
                <AllProducts products={products} page={page} />
            </div>
        </div>
    );
};

export async function getServerSideProps({ query: { page = 0 } }) {
    const resCate = await httpRequest.get('/categories/v1');
    const categories = await resCate.data;

    const resSuppliers = await httpRequest.get('/suppliers/v1');
    const suppliers = await resSuppliers.data;

    const resProducts = await httpRequest.get(`/products/v1?page=${page}`);
    const products = await resProducts.data;
    return {
        props: {
            categories,
            suppliers,
            products,
            page,
        },
    };
}

export default Products;