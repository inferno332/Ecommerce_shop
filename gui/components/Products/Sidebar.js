import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import RangeSlider from '../RangeSlider';

const Sidebar = ({ isOpenFilter, categories, suppliers }) => {
    const router = useRouter();
    const { query } = router;
    console.log(query.price);
    let CategoryNames = query.category?.split('-') || [];
    let SupplierNames = query.supplier?.split('-') || [];
    const listVariants = {
        close: { width: 0, height: 0, opacity: 0, transition: { duration: 0.5 } },
        open: { width: '200px', height: '85vh', opacity: 1, transition: { duration: 0.5 } },
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
            console.log(SupplierNames.length);
        } else {
            SupplierNames = SupplierNames.filter((item) => item !== name);
        }
    };
    const handleRouterPush = () => {
        if (CategoryNames.length > 0 && SupplierNames.length > 0) {
            console.log('a');
            router.push({
                pathname: `/product/filter`,
                query: {
                    category: CategoryNames.join('-'),
                    supplier: SupplierNames.join('-'),
                },
            });
        } else if (CategoryNames.length > 0) {
            router.push({
                pathname: '/product/filter',
                query: { category: CategoryNames.join('-') },
            });
        } else if (SupplierNames.length > 0 && CategoryNames.length === 0) {
            console.log('b');
            router.push({
                pathname: '/product/filter',
                query: { supplier: SupplierNames.join('-') },
            });
        } else {
            console.log('cc');
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
                </div>
                <button className='border rounded-lg p-1 bg-orange-300 mt-10' onClick={handleRouterPush}>
                    Click
                </button>
            </div>
        </motion.div>
    );
};

export default Sidebar;
