import { useState } from 'react';
import { Menu } from '@headlessui/react';
import { MdCategory, MdKeyboardArrowRight } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';

const CategoryMenu = [{ name: 'All categories' }, { name: 'Men' }, { name: 'Women' }, { name: 'Accessories' }];
const DropDownMenu = () => {
    const [open, setOpen] = useState(false);

    const subMenuAnimate = {
        open: {
            opacity: 1,
            transition: {
                duration: 0.25,
                ease: 'easeIn',
            },
        },
        closed: {
            opacity: 0,
            transition: {
                duration: 0.25,
                ease: [0.1, 1, 0.57, 1],
            },
        },
    };
    return (
        <Menu as='div' className='relative inline-block bg-gray-300 rounded-md w-[278px] h-[40px] z-[2]'>
            <Menu.Button
                className='w-full text-left px-2 py-2 flex items-center font-bold opacity-70 relative'
                onClick={() => setOpen((prev) => !prev)}
            >
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
            <AnimatePresence>
                <motion.div animate={open ? 'open' : 'closed'} variants={subMenuAnimate}>
                    <Menu.Items className='absolute left-0 mt-2 w-5/6 origin-center divide-y divide-gray-100 rounded-md bg-white shadow-lg'>
                        <div className='py-1'>
                            {CategoryMenu.map((item) => (
                                <Menu.Item key={item.name}>
                                    {({ active }) => (
                                        <a href='#' className={`${active ? 'bg-gray-100' : ''} block px-4 py-2`}>
                                            {item.name}
                                        </a>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </motion.div>
            </AnimatePresence>
        </Menu>
    );
};

export default DropDownMenu;
