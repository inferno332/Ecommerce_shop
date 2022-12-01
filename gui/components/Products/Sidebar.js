import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const prices = [
    {
        label: 'under $100',
        gte: 0,
        lte: 100,
    },
    {
        label: '$100 - $200',
        gte: 100,
        lte: 200,
    },
    {
        label: 'above $200',
        gte: 200,
        lte: 100000,
    },
];

const Sidebar = ({ isOpenFilter, categories, suppliers }) => {
    const [checkPrice, setCheckPrice] = React.useState({
        gte: 0,
        lte: 1000000,
    });
    const router = useRouter();
    const { query } = router;
    console.log(query.price);
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
    };
    const handleCheckSupplier = (e, name) => {
        if (e.target.checked === true) {
            filter.supplierName.push(name);
            console.log(filter.supplierName.length);
        } else {
            filter.supplierName = filter.supplierName.filter((item) => item !== name);
        }
    };
    const handleCheckPrice = (e, value) => {
        e.preventDefault();
        if (e.target.checked) {
            setCheckPrice({ ...checkPrice, gte: value.gte, lte: value.lte });
        } else {
            setCheckPrice({ ...checkPrice, gte: 0, lte: 100000 });
        }
        console.log(checkPrice);
    };
    const handleRouterPush = (e) => {
        e.preventDefault();
        if (filter.categoryName.length > 0 && filter.supplierName.length > 0) {
            console.log('a');
            router.push({
                pathname: `/product/filter`,
                query: {
                    category: filter.categoryName.join('-'),
                    supplier: filter.supplierName.join('-'),
                    // price: JSON.stringify(checkPrice),
                },
            });
        } else if (filter.categoryName.length > 0) {
            router.push({
                pathname: '/product/filter',
                query: { category: filter.categoryName.join('-') },
                // price: JSON.stringify(checkPrice),
            });
        } else if (filter.supplierName.length > 0 && filter.categoryName.length === 0) {
            console.log('b');
            router.push({
                pathname: '/product/filter',
                query: { supplier: filter.supplierName.join('-') },
                price: 0,
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
                        {categories.map((category, index) => {
                            return (
                                <div key={category._id} className='flex gap-2 py-1'>
                                    <input
                                        type='checkbox'
                                        value={category.name}
                                        className='w-5'
                                        onChange={(e) => handleCheckCategory(e, category.name)}
                                        defaultChecked={CategoryName.includes(category.name) ? true : false}
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
                                        defaultChecked={SupplierName.includes(supplier.name) ? true : false}
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
                                <input
                                    type='checkbox'
                                    className='w-5'
                                    value={price}
                                    onChange={(e) => handleCheckPrice(e, price)}
                                />
                                <label>{price.label}</label>
                            </div>
                        );
                    })}
                </div>
                <button className='border rounded-lg p-1 bg-orange-300 mt-10' onClick={(e) => handleRouterPush(e)}>
                    Click
                </button>
            </div>
        </motion.div>
    );
};

export default Sidebar;
