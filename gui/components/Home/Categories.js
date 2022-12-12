import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Categories = ({ categories }) => {
    const router = useRouter();

    return (
        <div>
            <h1 className='font-bold text-xl mb-5'>CATEGORIES</h1>
            <div className='grid grid-cols-1 gap-5 sm:grid-cols-3'>
                {categories.map((category) => {
                    return (
                        <div
                            className='relative duration-300 sm:cursor-pointer sm:hover:shadow-2xl sm:hover:scale-[1.01]'
                            key={category._id}
                            onClick={() => router.push(`/product/filter?category=${category.name}`)}>
                            <Image
                                src={`${process.env.BASE_URL}${category.imageUrl}`}
                                alt={category.name}
                                height={450}
                                width={450}
                                className='h-[420px] w-[100%] sm:h-[500px] object-cover rounded-md'
                            />
                            <div className='absolute bottom-5 left-5 bg-white rounded-xl p-3'>
                                <h2 className='font-medium text-2xl text-[#555] tracking-wide sm:text-lg'>
                                    {category.name}
                                </h2>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Categories;
