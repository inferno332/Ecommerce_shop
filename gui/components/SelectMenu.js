import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';

const CategoryMenu = [{ name: 'All categories' }, { name: 'Men' }, { name: 'Women' }, { name: 'Accessories' }];

export default function SelectMenu() {
    const [selected, setSelected] = useState(CategoryMenu[0]);

    return (
        <div className='bg-[#F2F2F2] w-40 h-fit hover:cursor-pointer z-[2]'>
            <Listbox value={selected} onChange={setSelected}>
                <Listbox.Button className='relative py-3 w-36'>
                    <p>{selected.name}</p>
                    <span className='absolute inset-y-0 right-0 flex items-center'>
                        <FiChevronDown className='h-5 w-5 text-gray-400' aria-hidden='true' />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <Listbox.Options className='fixed mt-1 max-h-60 w-60 overflow-auto rounded-md bg-white py-1 shadow-lg'>
                        {CategoryMenu.map((person, personIdx) => (
                            <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                    }`
                                }
                                value={person}
                            >
                                {({ selected }) => (
                                    <>
                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                            {person.name}
                                        </span>
                                        {selected ? (
                                            <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                                                <FiCheck className='h-5 w-5' aria-hidden='true' />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </Listbox>
        </div>
    );
}
