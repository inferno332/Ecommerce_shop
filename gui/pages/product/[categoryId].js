import React, { useCallback, useEffect, useState } from 'react';
import httpRequest from '../../ultis/axios';

import HeaderProduct from '../../components/Products/HeaderProduct';
import Sidebar from '../../components/Products/Sidebar';
import AllProducts from '../../components/Products/AllProducts';

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
            <div
                className={`${
                    hideHeader ? 'sm:top-[-1px]' : 'sm:top-[80px]'
                } ease-linear duration-300 relative sm:sticky z-10`}>
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
