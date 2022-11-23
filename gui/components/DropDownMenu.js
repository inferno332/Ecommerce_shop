import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

const CategoryMenu = [{ name: 'All categories' }, { name: 'Men' }, { name: 'Women' }, { name: 'Accessories' }];
const DropDownMenu = () => {
    return (
        <Menu as='div' className='relative inline-block text-left bg-blue-300 w-40'>
            <Menu.Button>Menu</Menu.Button>
            <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
            >
                <Menu.Items className='absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg'>
                    <div className='py-1'>
                        {CategoryMenu.map((item) => (
                            <Menu.Item>
                                {({ active }) => (
                                    <a href='#' className={`${active ? 'bg-gray-100' : ''} block px-4 py-2`}>
                                        {item.name}
                                    </a>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default DropDownMenu;
