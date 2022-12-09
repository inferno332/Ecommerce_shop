import React from 'react';

const StepOne = ({ register, handleNext, trigger, errors }) => {
    return (
        <div className='flex flex-col gap-5'>
            <div>
                <div className='p-3 border border-gray-400 hover:border-gray-900 rounded-md'>
                    <input className='w-full' {...register('firstName', { required: true })} placeholder='First Name' />
                </div>
                {errors.firstName && <p className='text-sm text-red-500'>* Please enter your first name!</p>}
            </div>
            <div>
                <div className='p-3 border border-gray-400 hover:border-gray-900 rounded-md'>
                    <input className='w-full' {...register('lastName', { required: true })} placeholder='Last Name' />
                </div>
                {errors.lastName && <p className='text-sm text-red-500'>* Please enter your last name!</p>}
            </div>
            <div>
                <div className='p-3 border border-gray-400 hover:border-gray-900 rounded-md'>
                    <input
                        className='w-full'
                        type='email'
                        {...register('email', { required: true })}
                        placeholder='Email'
                    />
                </div>
                {errors.email && <p className='text-sm text-red-500'>* Please enter your email!</p>}
            </div>
            <div>
                <div className='p-3 border border-gray-400 hover:border-gray-900 rounded-md'>
                    <input className='w-full' type='number' {...register('phoneNumber')} placeholder='Phone Number' />
                </div>
                {errors.email && <p className='text-sm text-red-500'>* Please enter your phone number!</p>}
            </div>
            <div>
                <div className='p-3 border border-gray-400 hover:border-gray-900 rounded-md'>
                    <input className='w-full' {...register('address', { required: true })} placeholder='Address' />
                </div>
                {errors.email && <p className='text-sm text-red-500'>* Please enter your address!</p>}
            </div>
            <div className='relative p-3 border border-gray-400 hover:border-gray-900 rounded-md'>
                <label className='absolute top-[-12px] bg-white text-sm text-gray-400 tracking-wider'>Birthday</label>
                <input className='w-full' type='date' {...register('birthday')} />
            </div>
            <button
                className='w-full bg-black hover:bg-[#333] duration-200 ease-in text-white py-2 px-5 rounded-lg'
                onClick={async (e) => {
                    e.preventDefault();
                    const result = await trigger();
                    if (result) {
                        handleNext();
                    }
                }}>
                Continue
            </button>
        </div>
    );
};

export default StepOne;
