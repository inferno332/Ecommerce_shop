import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const prices = ['under $100', '$100 - $200', 'above $200'];

const Sidebar = ({ isOpenFilter, categories, suppliers }) => {
    const router = useRouter();
    const listVariants = {
        close: { width: 0, height: 0, opacity: 0, transition: { duration: 0.5 } },
        open: { width: '200px', height: '85vh', opacity: 1, transition: { duration: 0.5 } },
    };

    let filter = {
        categoryId: [],
        supplierId: [],
    };
    const handleCheckCategoryId = (e, id) => {
        if (e.target.checked === true) {
            filter.categoryId.push(id);
        } else {
            let index = filter.categoryId.indexOf(id);
            if (index > -1) {
                filter.categoryId.splice(index, 1);
            }
        }
        console.log(filter.categoryId);
    };
    const handleCheckSupplierId = (e, id) => {
        if (e.target.checked === true) {
            filter.supplierId.push(id);
        } else {
            let index = filter.supplierId.indexOf(id);
            if (index > -1) {
                filter.supplierId.splice(index, 1);
            }
        }
        console.log(filter.supplierId);
    };

    const handleRouterPush = () => {
        if (filter.categoryId.length > 0 && filter.supplierId.length > 0) {
            console.log('option1');
            const arr = [];
            arr.push(...filter.categoryId, ...filter.supplierId);
            router.push(`/product/${String(arr).replace(',', '%20')}?option=option1`);
        } else if (filter.categoryId.length > 0) {
            router.push(`/product/${String(filter.categoryId).replace(',', '%20')}?option=option2`);
        } else if (filter.supplierId.length > 0) {
            router.push(`/product/${String(filter.supplierId).replace(',', '%20')}?option=option2`);
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
                        {categories.map((category) => {
                            return (
                                <div key={category._id} className='flex gap-2 py-1'>
                                    <input
                                        type='checkbox'
                                        value={category._id}
                                        className='w-5'
                                        onChange={(e) => handleCheckCategoryId(e, category._id)}
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
                                        onChange={(e) => handleCheckSupplierId(e, supplier._id)}
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
