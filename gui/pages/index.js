import httpRequest from '../ultis/axios';

import Head from 'next/head';
import Benefit from '../components/Benefit';
import Sliders from '../components/Sliders';
import Header from '../components/Header';
import Categories from '../components/Categories';
import Products from '../components/Products';
import Brands from '../components/Brands';
import Footer from '../components/Footer';

export default function Home({ sliders, categories, products, suppliers }) {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name='description' content='Generated by create next app' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Header />
            <main className='container mx-auto'>
                <Sliders sliders={sliders} />
                <Benefit />
                <Categories categories={categories} />
                <Products products={products} />
                <Brands suppliers={suppliers} />
            </main>
            <Footer />
        </div>
    );
}

export async function getStaticProps() {
    const resSlider = await httpRequest.get('/sliders');
    const sliders = await resSlider.data;

    const resCate = await httpRequest.get('/categories/v1');
    const categories = await resCate.data;

    const resProducts = await httpRequest.get('/products/v1');
    const products = await resProducts.data;

    const resSuppliers = await httpRequest.get('/suppliers/v1');
    const suppliers = await resSuppliers.data;

    return {
        props: {
            sliders,
            categories,
            products,
            suppliers,
        },
    };
}
