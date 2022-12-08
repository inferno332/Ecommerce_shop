import React from 'react';

const StepTwo = ({ register }) => {
    return (
        <div className='flex flex-col gap-5'>
            <div className='p-3 border border-gray-400 hover:border-gray-900 rounded-md'>
                <input className='w-full' {...register('shippingAddress')} placeholder='Shipping Address' />
            </div>
            <div className='relative p-3 border border-gray-400 hover:border-gray-900 rounded-md'>
                <label className='absolute top-[-12px] bg-white text-sm text-gray-400 tracking-wide'>
                    Shipped Date
                </label>
                <input className='w-full' type='date' {...register('shippedDate')} placeholder='First Name' />
            </div>
            <div className='relative p-3 border border-gray-400 rounded-md'>
                <label className='absolute top-[-12px] bg-white text-sm text-gray-400 tracking-wide'>
                    Payment Method
                </label>
                <input className='w-full' disabled placeholder='CASH' />
            </div>
            <div className='p-3 border border-gray-400 hover:border-gray-900 rounded-md'>
                <textarea
                    className='w-full'
                    {...register('description')}
                    placeholder='Note something you want us do...'
                />
            </div>
        </div>
    );
};

export default StepTwo;
