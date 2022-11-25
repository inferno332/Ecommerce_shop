import { useRouter } from 'next/router';

const Product = () => {
    const router = useRouter();
    const { productName } = router.query;

    return (
        <div className='flex justify-center items-center productBg'>
            <div className='flex flex-col md:flex-row w-full justify-around'>
                <div className='flex'>Swiper</div>
                <div className='flex flex-col w-2/5'>
                    <h1 className='mb-4 font-bold text-3xl text-[#2B344]'>Police Gray Eyeglasses</h1>
                    <div className='flex mb-4'>
                        <p className='mr-2'>Brand:</p>
                        <h6 className='font-medium'>Xiaomi</h6>
                    </div>
                    <div className='mb-4'>
                        <p className='mb-2'>Description:</p>
                        <p className='text-sm text-gray-500 '>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod
                            voluptatum. Quisquam, quod voluptatum. Quisquam, quod voluptatum. Quisquam,
                            quod voluptatum. Quisquam, quod voluptatum. Quisquam, quod voluptatum.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
