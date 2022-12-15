import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router';

const PaginatedItems = ({  }) => {
    const router = useRouter();
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: event.selected + 1 },
        });
    };

    return (
        <div className='mt-4 w-[360px] sm:w-[560px] flex mx-auto'>
            <ReactPaginate
                breakLabel='...'
                nextLabel='next >'
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={5}
                previousLabel='< previous'
                renderOnZeroPageCount={null}
                className='flex justify-center text-center font-semibold w-full text-gray-700'
                pageClassName='border border-r-0 border-slate-300 w-10 py-1 hover:bg-black hover:text-white cursor-pointer'
                breakClassName='border border-r-0 border-slate-300 w-10 py-1 hover:bg-black hover:text-white'
                previousClassName='border border-r-0 border-slate-300 py-1 px-2 hover:bg-black hover:text-white rounded-l-sm'
                nextClassName='border border-slate-300 py-1 px-2 hover:bg-black hover:text-white rounded-r-sm'
                activeClassName='bg-black text-white'
            />
        </div>
    );
};
export default PaginatedItems;
