import { useRouter } from 'next/router';

const Product = () => {
    const router = useRouter();
    const { productName } = router.query;
    
    return <div></div>;
};

export default Product;
