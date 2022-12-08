import React from 'react';

const StepOne = ({ register, handleNext }) => {
    return (
        <div className='flex flex-col gap-5'>
            <div className='p-3 border border-gray-400 hover:border-gray-900 rounded-md'>
                <input className='w-full' {...register('firstName', { required: true })} placeholder='First Name' />
            </div>
            <div className='p-3 border border-gray-400 hover:border-gray-900 rounded-md'>
                <input className='w-full' {...register('lastName', { required: true })} placeholder='Last Name' />
            </div>
            <div className='p-3 border border-gray-400 hover:border-gray-900 rounded-md'>
                <input className='w-full' type='email' {...register('email', { required: true })} placeholder='Email' />
            </div>
            <div className='p-3 border border-gray-400 hover:border-gray-900 rounded-md'>
                <input className='w-full' type='number' {...register('phoneNumber')} placeholder='Phone Number' />
            </div>
            <div className='p-3 border border-gray-400 hover:border-gray-900 rounded-md'>
                <input className='w-full' {...register('address', { required: true })} placeholder='Address' />
            </div>
            <div className='relative p-3 border border-gray-400 hover:border-gray-900 rounded-md'>
                <label className='absolute top-[-12px] bg-white text-sm text-gray-400 tracking-wider'>Birthday</label>
                <input className='w-full' type='date' {...register('birthday')} />
            </div>
            <button
                className='w-full bg-black hover:bg-[#333] duration-200 ease-in text-white py-2 px-5 rounded-lg'
                onClick={(e) => {
                    e.preventDefault();
                    handleNext();
                }}>
                Continue
            </button>
        </div>
    );
};

export default StepOne;
