import React from 'react';
import OrderForm from '../components/Checkout/OrderForm';
import OrderSummary from '../components/Checkout/OrderSummary';

const checkout = () => {
    return (
        <div className='mt-5 mx-auto flex flex-col-reverse md:flex-row gap-5'>
            <div className='flex-1'>
                <OrderForm />
            </div>
            <div className='flex-1'>
                <OrderSummary />
            </div>
        </div>
    );
};

export default checkout;
