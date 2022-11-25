import { Menu } from '@headlessui/react';
import { MdCategory, MdKeyboardArrowRight } from 'react-icons/md';
import { motion } from 'framer-motion';

const CategoryMenu = [{ name: 'All categories' }, { name: 'Men' }, { name: 'Women' }, { name: 'Accessories' }];
const DropDownMenu = () => {
    const subMenuAnimate = {
        expanded: {
            opacity: 1,
            transition: {
                duration: 0.25,
                ease: 'easeIn',
            },
        },
        collapsed: {
            opacity: 0,
            transition: {
                duration: 0.25,
                ease: [0.1, 1, 0.57, 1],
            },
        },
    };
    return (
        <Menu as='div' className='relative inline-block bg-gray-300 rounded-md w-[278px] h-[40px] z-[2]'>
            {({ open }) => (
                <>
                    <Menu.Button className='w-full text-left px-2 py-2 flex items-center font-bold opacity-70 relative'>
                        <span className='mr-3'>
                            <MdCategory />
                        </span>
                        Menu
                        <motion.span
                            className='text-xl mt-[2px] absolute right-2'
                            transition={{ duration: 0.25 }}
                            animate={{ rotate: open ? 90 : 0 }}
                        >
                            <MdKeyboardArrowRight />
                        </motion.span>
                    </Menu.Button>
                    <motion.div initial='collapsed' animate={open ? 'expanded' : 'collapsed'} variants={subMenuAnimate}>
                        <Menu.Items className='absolute left-0 mt-2 w-full origin-center divide-y divide-gray-100 rounded-sm bg-white shadow-xl'>
                            <div className='py-1'>
                                {CategoryMenu.map((item) => (
                                    <Menu.Item key={item.name}>
                                        {({ active }) => (
                                            <p
                                                className={`${
                                                    active ? 'bg-gray-100' : ''
                                                } block px-4 py-2 cursor-pointer`}
                                            >
                                                {item.name}
                                            </p>
                                        )}
                                    </Menu.Item>
                                ))}
                            </div>
                        </Menu.Items>
                    </motion.div>
                </>
            )}
        </Menu>
    );
};

export default DropDownMenu;
