import React from 'react';

const Brands = ({ suppliers }) => {
    return (
        <div className='container mx-auto mt-10'>
            <h1 className='font-bold text-3xl mb-5 text-center'>FEATURED BRANDS</h1>
            <div className='grid grid-cols-2 sm:grid-cols-4 justify-items-center items-center sm:border rounded-lg'>
                {suppliers.map((supplier) => {
                    return (
                        <img
                            key={supplier._id}
                            src={`http://localhost:9000${supplier.imageUrl}`}
                            alt={supplier.name}
                            className='w-[100%] h-[100%] max-h-[100px] object-contain p-5 border border-black rounded-3xl odd:border-l-0 even:border-r-0 first:border-t-0 [&:nth-child(2)]:border-t-0 last:border-b-0 [&:nth-child(3)]:border-b-0 sm:border-none'
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Brands;
