import Image from 'next/image';
import React from 'react';

import { BsFacebook, BsYoutube } from 'react-icons/bs';
import { SiGmail } from 'react-icons/si';
import { AiFillInstagram } from 'react-icons/ai';

const Footer = () => {
    return (
        <div className='container mx-auto grid grid-cols-1 gap-3 mt-10 py-5 bg-[#2B3445]'>
            <div className='flex items-center gap-3 text-3xl text-[#f9f9f9]'>
                <BsFacebook />
                <AiFillInstagram />
                <BsYoutube />
                <SiGmail />
            </div>
            <div className='flex justify-between items-center'>
                <div className='text-white [&>p]:opacity-70'>
                    <h1 className='font-bold text-xl'>Contract Us</h1>
                    <p className=''>Address: 38 Yen Bai, Danang, Vietnam</p>
                    <p className=''>Email: shoes-shop@gmail.com</p>
                    <p className=''>Phone: 0905123456</p>
                </div>
                <Image src='/ss-logo.svg' alt='logo' width={60} height={40} className=' md:block h-[44px]' />

            </div>
        </div>
    );
};

export default Footer;
