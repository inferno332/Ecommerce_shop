import React from 'react';

const StepTwo = ({ register, errors }) => {
    return (
        <div className='flex flex-col gap-5'>
            <div>
                <div className='p-3 border border-gray-400 hover:border-gray-900 rounded-md'>
                    <input
                        className='w-full'
                        {...register('shippingAddress', { required: true })}
                        placeholder='Shipping Address'
                    />
                </div>
                {errors.shippingAddress && <p className='text-sm text-red-500'>* Please enter your shipping address!</p>}
            </div>
            <div className='relative p-3 border border-gray-400 hover:border-gray-900 rounded-md'>
                <label className='absolute top-[-12px] bg-white text-sm text-gray-400 tracking-wide'>
                    Shipped Date
                </label>
                <input className='w-full' type='date' {...register('shippedDate')} />
            </div>
            <div className='relative p-3 border border-gray-400 rounded-md'>
                <label className='absolute top-[-12px] bg-white text-sm text-gray-400 tracking-wide'>
                    Payment Method
                </label>
                <input className='w-full' disabled placeholder='CASH' />
            </div>
            <div className='p-3 border border-gray-400 hover:border-gray-900 rounded-md'>
                <textarea
                    className='w-full focus-visible:outline-none'
                    {...register('description')}
                    placeholder='Note something you want us do...'
                />
            </div>
        </div>
    );
};

export default StepTwo;
