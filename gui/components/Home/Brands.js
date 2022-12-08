import React from 'react';

const Brands = ({ suppliers }) => {
    return (
        <div className='mt-10'>
            <h1 className='font-bold text-xl mb-5'>FEATURED BRANDS</h1>
            <div className='grid grid-cols-2 sm:grid-cols-4 justify-items-center items-center border-8 rounded-lg'>
                {suppliers.map((supplier) => {
                    return (
                        <img
                            key={supplier._id}
                            src={`${process.env.BASE_URL}${supplier.imageUrl}`}
                            alt={supplier.name}
                            className='w-[100%] h-[100%] max-h-[100px] object-contain p-5 border sm:border-0'
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Brands;
