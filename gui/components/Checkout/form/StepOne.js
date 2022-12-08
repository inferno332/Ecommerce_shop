import React from 'react';

const StepOne = ({ register }) => {
    return (
        <div className='flex flex-col gap-5'>
            <div className='p-3 border border-gray-400 hover:border-gray-900 rounded-md'>
                <input className='w-full' {...register('firstName')} placeholder='First Name' />
            </div>
            <div className='p-3 border border-gray-400 hover:border-gray-900 rounded-md'>
                <input className='w-full' {...register('lastName')} placeholder='Last Name' />
            </div>
            <div className='p-3 border border-gray-400 hover:border-gray-900 rounded-md'>
                <input className='w-full' type='email' {...register('email')} placeholder='Email' />
            </div>
            <div className='p-3 border border-gray-400 hover:border-gray-900 rounded-md'>
                <input className='w-full' type='number' {...register('phoneNumber')} placeholder='Phone Number' />
            </div>
            <div className='p-3 border border-gray-400 hover:border-gray-900 rounded-md'>
                <input className='w-full' {...register('address')} placeholder='Address' />
            </div>
            <div className='relative p-3 border border-gray-400 hover:border-gray-900 rounded-md'>
                <label className='absolute top-[-12px] bg-white text-sm text-gray-400 tracking-wider'>Birthday</label>
                <input className='w-full' type='date' {...register('birthday')} />
            </div>
        </div>
    );
};

export default StepOne;
