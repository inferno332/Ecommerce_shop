import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import RangeSlider from '../RangeSlider';

const Sidebar = ({ isOpenFilter, categories, suppliers, hideHeader }) => {
    const router = useRouter();
    const { query } = router;
    let CategoryNames = query.category?.split('-') || [];
    let SupplierNames = query.supplier?.split('-') || [];
    let PriceRange = query.price && JSON.parse(query.price);
    const listVariants = {
        close: { width: 0, height: 0, opacity: 0, transition: { duration: 0.5 } },
        open: { width: '200px', height: '65vh', opacity: 1, transition: { duration: 0.5 } },
    };

    const handleCheckCategory = (e, name) => {
        if (e.target.checked) {
            CategoryNames.push(name);
        } else {
            CategoryNames = CategoryNames.filter((item) => item !== name);
        }
    };
    const handleCheckSupplier = (e, name) => {
        if (e.target.checked === true) {
            SupplierNames.push(name);
        } else {
            SupplierNames = SupplierNames.filter((item) => item !== name);
        }
    };
    const handlePriceChange = (value) => {
        PriceRange = { gte: value.min, lte: value.max };
    };
    const handleRouterPush = () => {
        if (CategoryNames.length > 0 && SupplierNames.length > 0) {
            router.push({
                pathname: `/product/filter`,
                query: {
                    category: CategoryNames.join('-'),
                    supplier: SupplierNames.join('-'),
                    price: JSON.stringify(PriceRange),
                },
            });
        } else if (CategoryNames.length > 0) {
            router.push({
                pathname: '/product/filter',
                query: { category: CategoryNames.join('-'), price: JSON.stringify(PriceRange) },
            });
        } else if (SupplierNames.length > 0) {
            router.push({
                pathname: '/product/filter',
                query: { supplier: SupplierNames.join('-'), price: JSON.stringify(PriceRange) },
            });
        } else if (PriceRange) {
            router.push({
                pathname: '/product/filter',
                query: { price: JSON.stringify(PriceRange) },
            });
        } else {
            router.push('/product');
        }
    };

    return (
        <motion.div
            animate={isOpenFilter ? 'open' : 'close'}
            variants={listVariants}
            className={`${hideHeader ? 'sm:top-[49px]' : 'sm:top-[130px]'} sm:sticky flex duration-300 ease-out`}>
            <div>
                <div className='border-b pb-3'>
                    <p className='font-medium pb-2'>Categories</p>
                    <div>
                        {categories.map((category) => {
                            return (
                                <div key={category._id} className='flex gap-2 py-1'>
                                    <input
                                        type='checkbox'
                                        value={category.name}
                                        className='w-5'
                                        onChange={(e) => handleCheckCategory(e, category.name)}
                                        defaultChecked={CategoryNames.includes(category.name) ? true : false}
                                    />
                                    <label>{category.name}</label>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className='border-b py-3'>
                    <p className='font-medium pb-2'>Brands</p>
                    <div>
                        {suppliers.map((supplier) => {
                            return (
                                <div key={supplier._id} className='flex gap-2 py-1'>
                                    <input
                                        type='checkbox'
                                        value={supplier.name}
                                        className='w-5'
                                        onChange={(e) => handleCheckSupplier(e, supplier.name)}
                                        defaultChecked={SupplierNames.includes(supplier.name) ? true : false}
                                    />
                                    <label>{supplier.name}</label>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className='border-b py-3'>
                    <p className='font-medium pb-2 mb-2'>Prices</p>
                    <RangeSlider
                        min='0'
                        max='500'
                        onChange={(e) => handlePriceChange(e)}
                        defaultValue={[PriceRange?.gte || 0, PriceRange?.lte || 500]}
                    />
                </div>
                <button className='border rounded-lg p-1 bg-orange-300 mt-10' onClick={handleRouterPush}>
                    Click
                </button>
            </div>
        </motion.div>
    );
};

export default Sidebar;
