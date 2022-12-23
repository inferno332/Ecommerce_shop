import React from 'react';

import { MdOutlineSort } from 'react-icons/md';

import DropDownSort from './DropDownSort';

const HeaderProduct = ({ setIsOpenFilter }) => {
    return (
        <div className='flex justify-between items-center bg-white h-full'>
            <h1 className='font-bold text-xl hidden sm:block'>OUR PRODUCTS</h1>
            <div className='flex gap-2'>
                <button
                    className='flex items-center border rounded-xl p-2 gap-1'
                    onClick={() => setIsOpenFilter((prev) => !prev)}
                >
                    Filters
                    <i>
                        <MdOutlineSort />
                    </i>
                </button>
                <div>
                    <DropDownSort />
                </div>
            </div>
        </div>
    );
};

export default HeaderProduct;
