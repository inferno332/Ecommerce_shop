import React, { useState } from 'react';
import httpRequest from '../../ultis/axios';

import AllProducts from '../../components/Products/AllProducts';
import HeaderProduct from '../../components/Products/HeaderProduct';

const Products = ({ categories, suppliers, products }) => {
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    return (
        <div>
            <div className='sm:sticky sm:top-0'>
                <HeaderProduct setIsOpenFilter={setIsOpenFilter} />
            </div>
            <div>
                <AllProducts
                    isOpenFilter={isOpenFilter}
                    categories={categories}
                    suppliers={suppliers}
                    products={products}
                />
            </div>
        </div>
    );
};

export async function getServerSideProps() {
    const resCate = await httpRequest.get('/categories/v1');
    const categories = await resCate.data;

    const resSuppliers = await httpRequest.get('/suppliers/v1');
    const suppliers = await resSuppliers.data;

    const resProducts = await httpRequest.get(`/products/v1`);
    const products = await resProducts.data;
    return {
        props: {
            categories,
            suppliers,
            products,
        },
    };
}

export default Products;
