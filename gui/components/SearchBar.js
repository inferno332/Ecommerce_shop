import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useState, useRef, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';

import listenForOutsideClicks from '../ultis/clickOutsideEvent';

const SearchBar = ({ setIsOpen, isOpen }) => {
    const router = useRouter();
    // handle click outside search bar
    const searchRef = useRef(null);
    const [listening, setListening] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleFocus = () => {
        setIsOpen(true);
    };
    useEffect(listenForOutsideClicks(listening, setListening, searchRef, setIsOpen));
    // end
    const [searchResult, setSearchResult] = useState([]);
    const handleOnSearch = async (string) => {
        if (string) {
            try {
                setIsLoading(true);
                const res = await axios.get(`${process.env.BASE_URL}/products/search/${string}`);
                let tmpData = res.data.map(({ _id, ...rest }) => ({ id: _id, ...rest }));
                setSearchResult(tmpData);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleOnSelect = (item) => {
        router.push(`/product/details/${item.id}`);
    };

    const formatResult = (item) => {
        return (
            isOpen && (
                <div className='flex items-start md:items-center mr-5 flex-col md:flex-row cursor-pointer'>
                    {isLoading ? (
                        <div>
                            <div className='animate-pulse bg-gray-300 h-16 w-16 md:h-24 md:w-24 rounded-md'></div>
                            <div className='animate-pulse bg-gray-300 h-4 w-56 mt-2 rounded-md'></div>
                        </div>
                    ) : (
                        <div>
                            <Image
                                src={`${process.env.BASE_URL}${item.imageURL[0]}`}
                                width='200'
                                height='200'
                                alt={item.name}
                                className='h-20 w-20 md:h-24 md:w-24 border-slate-300 border rounded-lg shadow-xl'
                            />
                            <p className='text-lg text-gray-800'>{item.name}</p>
                        </div>
                    )}
                </div>
            )
        );
    };

    return (
        <div
            className={`relative duration-500 z-10 transition-all ${isOpen ? 'w-full' : 'w-[180px]'}`}
            ref={searchRef}
            onClick={handleFocus}>
            <ReactSearchAutocomplete
                items={searchResult}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                formatResult={formatResult}
                showClear={false}
                maxResults={7}
                inputDebounce='500'
                showIcon={false}
                placeholder='Search'
                styling={{
                    clearIconMargin: '2px 30px 2px 0',
                }}
            />
            <span className='absolute top-[50%] -translate-y-[50%] right-3 text-lg cursor-pointer'>
                {isOpen ? (
                    <MdClose
                        onClick={(e) => {
                            setIsOpen(false);
                            e.stopPropagation();
                        }}
                    />
                ) : (
                    <FiSearch />
                )}
            </span>
        </div>
    );
};

export default SearchBar;
