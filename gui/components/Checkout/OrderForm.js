import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import httpRequest from '../../ultis/axios';

import { Stepper, Step, StepLabel, StepContent } from '@mui/material';
import { BsArrowRight } from 'react-icons/bs';

import StepOne from './form/StepOne';
import StepTwo from './form/StepTwo';
import { useCart } from '../../zustand/useCart';

const OrderForm = () => {
    const router = useRouter();
    const { products, clear } = useCart((state) => state);

    //REACT HOOK FORM
    const {
        handleSubmit,
        register,
        formState: { errors },
        trigger,
    } = useForm();

    const onSubmit = async (data) => {
        const array = { ...data, orderDetails: products };
        console.log(array);
        // await httpRequest.post('/orders/v1', array);
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
    //END

    return (
        <div>
            <h1 className='font-semibold text-2xl mb-3'>Enter this form</h1>
            <div className='flex text-xs gap-2'>
                <span className='text-red-500'>*Note:</span>
                <span className=' text-gray-500'>
                    Please fill out all fields completely so that we can contact you sooner!
                </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stepper activeStep={activeStep} orientation='vertical'>
                    <Step>
                        <StepLabel>Customer information</StepLabel>
                        <StepContent>
                            <StepOne register={register} handleNext={handleNext} trigger={trigger} errors={errors} />
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Order information</StepLabel>
                        <StepContent>
                            <StepTwo register={register} errors={errors} />
                            <div>
                                <button
                                    type='submit'
                                    className='w-full mt-5 mb-2 bg-black hover:bg-[#333] duration-200 ease-in text-white py-2 px-5 rounded-lg'
                                    onClick={async () => {
                                        const result = await trigger('shippingAddress');
                                        if (result) {
                                            handleNext();
                                        }
                                    }}>
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
                        onClick={() => {
                            clear();
                            router.push('/');
                        }}>
                        <p>Return to Home Page</p>
                        <BsArrowRight />
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderForm;
