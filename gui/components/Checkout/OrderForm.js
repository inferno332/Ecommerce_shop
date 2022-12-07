import React from 'react';
import { useForm } from 'react-hook-form';
import httpRequest from '../../ultis/axios';

const OrderForm = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        await httpRequest.post('/customers', data);
    };

    return (
        <div>
            <h1 className='font-semibold text-2xl mb-3'>Enter this form:</h1>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                <div className='p-3 border border-gray-400 rounded-md'>
                    <input className='w-full' {...register('firstName')} placeholder='First Name' />
                </div>
                <div className='p-3 border border-gray-400 rounded-md'>
                    <input className='w-full' {...register('lastName')} placeholder='Last Name' />
                </div>
                <div className='p-3 border border-gray-400 rounded-md'>
                    <input className='w-full' {...register('email')} placeholder='Email' />
                </div>
                <div className='p-3 border border-gray-400 rounded-md'>
                    <input className='w-full' {...register('phoneNumber')} placeholder='Phone Number' />
                </div>
                <div className='p-3 border border-gray-400 rounded-md'>
                    <input className='w-full' {...register('address')} placeholder='Address' />
                </div>
                <div className='p-3 border border-gray-400 rounded-md'>
                    <input className='w-full' type='date' {...register('birthday')} placeholder='Birthday' />
                </div>
                <button
                    className='w-full border rounded-xl bg-[#000] text-white py-3 opacity-90 hover:opacity-100 duration-200'
                    type='submit'>
                    Continue
                </button>
            </form>
        </div>
    );
};

export default OrderForm;
