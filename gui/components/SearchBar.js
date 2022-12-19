import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';

const SearchBar = () => {
    // note: the id field is mandatory
    const router = useRouter();
    const [searchResult, setSearchResult] = useState([]);
    const handleOnSearch = async (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        try {
            const res = await axios.get(`${process.env.BASE_URL}/products/search/${string}`);
            let tmpData = res.data.map(({ _id, ...rest }) => ({ id: _id, ...rest }));
            setSearchResult(tmpData);
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnSelect = (item) => {
        router.push(`/product/details/${item.id}`);
    };

    const formatResult = (item) => {
        return (
            <div className='flex items-start md:items-center mr-5 flex-col md:flex-row cursor-pointer'>
                <Image
                    src={`${process.env.BASE_URL}${item.imageURL[0]}`}
                    width='200'
                    height='200'
                    alt={item.name}
                    className='h-16 w-16 md:h-24 md:w-24'
                />
                <p className='text-md text-gray-800'>{item.name}</p>
            </div>
        );
    };

    return (
        <div className='w-full relative md:w-[180px] focus-within:w-full duration-500 z-10'>
            <ReactSearchAutocomplete
                items={searchResult}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                formatResult={formatResult}
                maxResults={7}
                inputDebounce='300'
                showIcon={false}
                placeholder='Search'
                styling={{
                    width: '100%',
                    clearIconMargin: '2px 30px 2px 0',
                }}
            />
            <span className='absolute top-[50%] -translate-y-[50%] right-3 text-lg'>
                <FiSearch />
            </span>
        </div>
    );
};

export default SearchBar;
