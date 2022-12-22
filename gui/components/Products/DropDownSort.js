import { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BiSort } from 'react-icons/bi';
import { useRouter } from 'next/router';

const DropDownSort = () => {
    const [isActive, setIsActive] = useState(false);
    const router = useRouter();
    const { sort } = router.query;
    return (
        <Menu as='div' className='relative inline-block'>
            <Menu.Button
                className={` flex items-center border rounded-xl p-2 gap-1`}
                onClick={() => setIsActive((prev) => !prev)}>
                Sort By
                <i className={`${isActive ? 'animate-rotateRight' : 'animate-rotateLeft'}`}>
                    <BiSort />
                </i>
            </Menu.Button>
            <Transition
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'>
                <Menu.Items className='absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-sm bg-white shadow-xl py-2'>
                    <Menu.Item>
                        {({ active }) => (
                            <div
                                onClick={() =>
                                    router.push({
                                        pathname: router.pathname,
                                        query: {
                                            ...router.query,
                                            sort: 'createdAt:desc',
                                        },
                                    })
                                }
                                className={`${active ? 'bg-black text-white' : ''} p-2 cursor-pointer ${
                                    sort === 'createdAt:desc' ? 'bg-black text-white' : ''
                                } `}>
                                Newest
                            </div>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <div
                                onClick={() =>
                                    router.push({
                                        pathname: router.pathname,
                                        query: {
                                            ...router.query,
                                            sort: 'price:desc',
                                        },
                                    })
                                }
                                className={`${active ? 'bg-black text-white' : ''} p-2 cursor-pointer ${
                                    sort === 'price:desc' ? 'bg-black text-white' : ''
                                } `}>
                                Highest Price
                            </div>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <div
                                onClick={() =>
                                    router.push({
                                        pathname: router.pathname,
                                        query: {
                                            ...router.query,
                                            sort: 'price:asc',
                                        },
                                    })
                                }
                                className={`${active ? 'bg-black text-white' : ''} p-2 cursor-pointer ${
                                    sort === 'price:asc' ? 'bg-black text-white' : ''
                                } `}>
                                Lowest Price
                            </div>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default DropDownSort;
