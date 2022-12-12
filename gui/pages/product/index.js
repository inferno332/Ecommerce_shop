import React, { useCallback, useEffect, useState } from 'react';
import httpRequest from '../../ultis/axios';

import AllProducts from '../../components/Products/AllProducts';
import HeaderProduct from '../../components/Products/HeaderProduct';
import Sidebar from '../../components/Products/Sidebar';

const Products = ({ categories, suppliers, products, page }) => {
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
            <div
                className={`${
                    hideHeader ? 'sm:top-[-1px]' : 'sm:top-[80px]'
                } ease-out duration-300 relative sm:sticky z-10`}>
                <HeaderProduct setIsOpenFilter={setIsOpenFilter} />
            </div>
            <div className='sm:flex'>
                <Sidebar
                    isOpenFilter={isOpenFilter}
                    categories={categories}
                    suppliers={suppliers}
                    hideHeader={hideHeader}
                />
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
