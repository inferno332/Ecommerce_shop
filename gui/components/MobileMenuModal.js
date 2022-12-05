import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

export default function MobileMenuModal() {
    let [isOpen, setIsOpen] = useState(false);

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
                    <FiMenu/>
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
                                <Dialog.Panel className='w-full relative flex flex-col justify-between max-w-md transform overflow-hidden bg-white p-6 text-left min-h-screen shadow-xl transition-all'>
                                    <div className='absolute top-1 right-1 p-4'>
                                        <IoClose className='text-2xl' />
                                    </div>
                                    <div className='gap-5 flex flex-col mt-4'>
                                        <p className='text-xl font-semibold'>All categories</p>
                                        <p className='text-xl font-semibold'>Women</p>
                                        <p className='text-xl font-semibold'>Men</p>
                                        <p className='text-xl font-semibold'>Accessories</p>
                                    </div>
                                    <div>
                                        <p>
                                            Become a Nike Member for the best products, inspiration and stories in
                                            sport.
                                        </p>
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
