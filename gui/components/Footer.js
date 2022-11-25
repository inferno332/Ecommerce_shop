import Image from 'next/image';
import React from 'react';

import { BsFacebook, BsYoutube } from 'react-icons/bs';
import { SiGmail } from 'react-icons/si';
import { AiFillInstagram } from 'react-icons/ai';

const Footer = () => {
    return (
        <div className='bg-[#2B3445]'>
            <div className='container mx-auto grid grid-cols-1 gap-5 mt-10 py-5 '>
                <div>
                    <Image src='/ss-logo-white.svg' alt='logo' width='100' height='100' className='md:block' />
                    <div className='text-[#f9f9f9] opacity-70 max-w-md'>
                        Independent since 2022, we empower people through sport and craftsmanship to create positive
                        change in comm unities around the world.
                    </div>
                </div>
                <div className=''>
                    <div className='text-white [&>p]:opacity-70'>
                        <h1 className='font-bold text-xl'>Contract Us</h1>
                        <p className=''>Address: 38 Yen Bai, Danang, Vietnam</p>
                        <p className=''>Email: shoes-shop@gmail.com</p>
                        <p className=''>Phone: 0905123456</p>
                    </div>
                </div>
                <div className='flex items-center gap-4  text-3xl text-[#f9f9f9]'>
                    <BsFacebook className='cursor-pointer' />
                    <AiFillInstagram className='cursor-pointer' />
                    <BsYoutube className='cursor-pointer' />
                    <SiGmail className='cursor-pointer' />
                </div>
            </div>
        </div>
    );
};

export default Footer;
