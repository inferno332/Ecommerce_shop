import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import httpRequest from '../../ultis/axios';

import { Stepper, Step, StepLabel, StepContent } from '@mui/material';
import { BsArrowRight } from 'react-icons/bs';

import StepOne from './form/StepOne';
import StepTwo from './form/StepTwo';
import { useCart } from '../../zustand/useCart';

const OrderForm = () => {
    const { products } = useCart((state) => state);
    console.log(products.quantity);
    
    //REACT HOOK FORM
    const { handleSubmit, register } = useForm();

    const onSubmit = async (data) => {
        const array = { ...data, orderDetail: products };
        console.log(array);
        // await httpRequest.post('/orders/v1', data);
    };
    //END

    //STEPPER
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    //END

    return (
        <div>
            <h1 className='font-semibold text-2xl mb-3'>Please enter this form</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stepper activeStep={activeStep} orientation='vertical'>
                    <Step>
                        <StepLabel>Customer information</StepLabel>
                        <StepContent>
                            <StepOne register={register} />
                            <div>
                                <button
                                    className='w-full mt-5 bg-black hover:bg-[#333] duration-200 ease-in text-white py-2 px-5 rounded-lg'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNext();
                                    }}>
                                    Continue
                                </button>
                            </div>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Order information</StepLabel>
                        <StepContent>
                            <StepTwo register={register} />
                            <div>
                                <button
                                    type='submit'
                                    className='w-full mt-5 mb-2 bg-black hover:bg-[#333] duration-200 ease-in text-white py-2 px-5 rounded-lg'
                                    onClick={handleNext}>
                                    Finish
                                </button>
                                <button
                                    className='w-full py-2 px-5 rounded-lg hover:bg-[#E5E9EC] duration-200 ease-in'
                                    onClick={handleBack}>
                                    Back
                                </button>
                            </div>
                        </StepContent>
                    </Step>
                </Stepper>
            </form>
            {activeStep === 2 && (
                <div>
                    <div className='text-center my-3'>
                        <p>Thanks for your orders! We will contact you soon.</p>
                        <p>Have a Happy Day!</p>
                    </div>
                    <div
                        className='flex items-center gap-2 text-sm text-blue-500 border-b border-dashed border-blue-500 max-w-[160px] hover:scale-[1.01] duration-200 cursor-pointer'
                        onClick={handleReset}>
                        <p>Return to Home Page</p>
                        <BsArrowRight />
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderForm;
