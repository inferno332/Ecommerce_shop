import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';

export default function MobileMenuModal() {
    let [isOpen, setIsOpen] = useState(false);
    const Categories = [
        {
            name: 'Home',
            link: '/',
        },
        {
            name: 'All categories',
            link: '/product',
        },
        {
            name: 'Women',
            link: '/product/filter?category=Women',
        },
        {
            name: 'Men',
            link: '/product/filter?category=Men',
        },
        {
            name: 'Accessory',
            link: '/product/filter?category=Accessory',
        },
    ];
    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <div className='flex items-center justify-center'>
                <button type='button' onClick={openModal}>
                    <FiMenu />
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as='div' className='relative z-10' onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'>
                        <div className='fixed inset-0 bg-black bg-opacity-25' />
                    </Transition.Child>

                    <div className='fixed w-[80vw] top-0 right-0'>
                        <div className='flex items-center justify-center text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='transform transition ease-in-out duration-300'
                                enterFrom='translate-x-full'
                                enterTo='translate-x-0'
                                leave='transform transition ease-in-out duration-300'
                                leaveFrom='translate-x-0'
                                leaveTo='translate-x-full'>
                                {/* Content */}
                                <Dialog.Panel className='w-full relative flex flex-col justify-between max-w-md transform overflow-hidden bg-white p-6 text-left min-h-screen shadow-xl transition-all'>
                                    <div className='absolute top-1 right-1 p-4 rounded-full truncate focus:outline-none'>
                                        <button onClick={closeModal}>
                                            <MdOutlineCancel className='text-2xl text-slate-400' />
                                        </button>
                                    </div>

                                    <div className='gap-5 flex flex-col mt-10'>
                                        {Categories.map((category) => (
                                            <Link href={category.link} key={category.name} legacyBehavior>
                                                <a
                                                    className='text-gray-900 hover:text-gray-900 text-2xl'
                                                    onClick={closeModal}>
                                                    {category.name}
                                                </a>
                                            </Link>
                                        ))}
                                        <Image
                                            src='/ss-logo.svg'
                                            alt='logo'
                                            width='100'
                                            height='100'
                                            className='h-fit'
                                        />
                                    </div>

                                    <div className='flex gap-4 justify-center'>
                                        <Link href='/login' legacyBehavior>
                                            <button className='text-lg px-7 py-[6px] text-white rounded-full border-[1.5px] bg-[#111]'>
                                                Sign in
                                            </button>
                                        </Link>
                                        <Link href='/register' legacyBehavior>
                                            <button className='text-lg px-6 py-[6px] text-black rounded-full border-[1.5px] border-[#ccc] bg-white'>
                                                Resgister
                                            </button>
                                        </Link>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
