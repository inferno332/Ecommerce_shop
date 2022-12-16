import React from 'react';

const Aboutus = () => {
    return (
        <div className='overflow-hidden'>
            <div className='text-center mt-5'>
                <p className='font-extrabold text-5xl sm:text-9xl tracking-tighter'>WELCOME TO</p>
                <p className='font-extrabold text-5xl sm:text-9xl tracking-tighter'>LS SHOP</p>
            </div>
            <div className='my-5'>
                <video className='w-full my-5' autoPlay muted loop>
                    <source src='/INDUSTRY-x-NIKE---HOMEPAGE-WIP-0524.mp4' />
                </video>
                <h1 className=' text-2xl sm:text-3xl sm:mx-auto sm:w-[700px] text-center'>
                    NIKE, Inc. is a team comprised of the Nike, Jordan and Converse brands driven by a shared purpose to
                    leave an enduring impact.
                </h1>
            </div>
            <div className='sm:flex items-center gap-5 my-10'>
                <div className='flex-1'>
                    <img className='w-full h-full object-contain' src='/adidas.jpg' alt='adidas' />
                </div>
                <h1 className='flex-1 sm:text-xl'>
                    Everything we do is rooted in sport. Sport plays an increasingly important role in more and more
                    people's lives, on and off the field of play. It is central to every culture and society and is core
                    to our health and happiness.
                </h1>
            </div>
            <div className='flex flex-col-reverse sm:flex-row items-center gap-5 my-10'>
                <h1 className='flex-1 sm:text-xl'>
                    the TRACK at new balance is a multi-purpose athletic facility designed to accommodate sports and
                    athletes of all ages and levels to experience a world class facility like no other. Our facility can
                    also enhance your next event by creating a one-of-a-kind atmosphere.
                </h1>
                <div className='flex-1'>
                    <img className='w-full h-full object-contain' src='/NB.jpg' alt='adidas' />
                </div>
            </div>
            <div className=' sm:flex items-center gap-5 my-10'>
                <div className='flex-1'>
                    <img className='w-full h-full object-contain' src='/ecco.jpg' alt='adidas' />
                </div>
                <h1 className='flex-1 sm:text-xl'>
                    More than three decades ago, in 1990 - ECCO founders Birte and Karl Toosbuy, issued the first set of
                    Management Codes, to unify common principles of action in the matter of sustainable development.
                    Even as ECCO is increasingly innovating and updating more often.
                </h1>
            </div>
            <div className='mb-10'>
                <h1 className='font-semibold text-2xl'>Leadership</h1>
            </div>
            <div className='grid sm:grid-cols-3 gap-5'>
                <div className='text-center'>
                    <img
                        className='w-full object-contain'
                        src='https://emi9d8rzue7.exactdn.com/wp-content/uploads/2021/06/Luca-Profile-Avatars-3.png?strip=all&lossy=1&ssl=1'
                        alt='avatar'
                    />
                    <p className='font-semibold text-xl'>Huỳnh Công Khoa</p>
                    <p>Founder</p>
                </div>
                <div className='text-center'>
                    <img
                        className='w-full object-contain'
                        src='https://emi9d8rzue7.exactdn.com/wp-content/uploads/2021/06/Luca-Profile-Avatars-3.png?strip=all&lossy=1&ssl=1'
                        alt='avatar'
                    />
                    <p className='font-semibold text-xl'>Nguyễn Minh Quân</p>
                    <p>Founder</p>
                </div>
                <div className='text-center'>
                    <img
                        className='w-full object-contain'
                        src='https://emi9d8rzue7.exactdn.com/wp-content/uploads/2021/06/Luca-Profile-Avatars-3.png?strip=all&lossy=1&ssl=1'
                        alt='avatar'
                    />
                    <p className='font-semibold text-xl'>Phùng Quốc Đạt</p>
                    <p>Founder</p>
                </div>
            </div>
        </div>
    );
};

export default Aboutus;
