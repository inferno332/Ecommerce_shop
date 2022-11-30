import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const prices = ['under $100', '$100 - $200', 'above $200'];

const Sidebar = ({ isOpenFilter, categories, suppliers }) => {
    const router = useRouter();
    const { query } = router;
    console.log(query);
    let CategoryName = query.category?.split('-') || [];
    let SupplierName = query.supplier?.split('-') || [];
    let filter = {
        categoryName: CategoryName,
        supplierName: SupplierName,
    };
    const listVariants = {
        close: { width: 0, height: 0, opacity: 0, transition: { duration: 0.5 } },
        open: { width: '200px', height: '85vh', opacity: 1, transition: { duration: 0.5 } },
    };

    const handleCheckCategory = (e, name) => {
        if (e.target.checked) {
            filter.categoryName.push(name);
        } else {
            filter.categoryName = filter.categoryName.filter((item) => item !== name);
        }

        console.log(filter.categoryName);
    };
    const handleCheckSupplier = (e, name) => {
        if (e.target.checked === true) {
            filter.supplierName.push(name);
        } else {
            filter.supplierName = filter.supplierName.filter((item) => item !== name);
        }
        console.log(filter.supplierName);
    };

    const handleRouterPush = () => {
        if (filter.categoryName.length > 0 && filter.supplierName.length > 0) {
            console.log('option1');
            router.push({
                pathname: '/product/filter',
                query: {
                    category: filter.categoryName.join('-'),
                    supplier: filter.supplierName.join('-'),
                    option: 'option1',
                },
            });
        } else if (filter.categoryName.length > 0) {
            router.push({
                pathname: '/product/filter',
                query: { category: filter.categoryName.join('-'), option: 'option2' },
            });
        } else if (filter.supplierName.length > 0) {
            router.push({
                pathname: '/product/filter',
                query: { supplier: filter.supplierName.join('-'), option: 'option2' },
            });
        }
    };

    return (
        <motion.div
            animate={isOpenFilter ? 'open' : 'close'}
            variants={listVariants}
            className='sm:sticky sm:top-[50px] flex'>
            <div>
                <div className='border-b pb-3'>
                    <p className='font-medium pb-2'>Categories</p>
                    <div>
                        {categories.map((category, index) => {
                            return (
                                <div key={category._id} className='flex gap-2 py-1'>
                                    <input
                                        type='checkbox'
                                        value={category.name}
                                        className='w-5'
                                        onChange={(e) => handleCheckCategory(e, category.name)}
                                        defaultChecked={category.name === CategoryName[index] ? true : false}
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
                        {suppliers.map((supplier, index) => {
                            return (
                                <div key={supplier._id} className='flex gap-2 py-1'>
                                    <input
                                        type='checkbox'
                                        value={supplier.name}
                                        className='w-5'
                                        onChange={(e) => handleCheckSupplier(e, supplier.name)}
                                        defaultChecked={supplier.name === SupplierName[index] ? true : false}
                                    />
                                    <label>{supplier.name}</label>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className='border-b py-3'>
                    <p className='font-medium pb-2'>Prices</p>
                    {prices.map((price, index) => {
                        return (
                            <div key={index} className='flex gap-2 py-1'>
                                <input type='checkbox' className='w-5' />
                                <label>{price}</label>
                            </div>
                        );
                    })}
                </div>
                <button className='border rounded-lg p-1 bg-orange-300 mt-10' onClick={handleRouterPush}>
                    Click
                </button>
            </div>
        </motion.div>
    );
};

export default Sidebar;
