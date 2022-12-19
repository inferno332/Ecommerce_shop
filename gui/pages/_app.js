import Layout from '../components/Layout';
import '../styles/globals.css';
import '../styles/range-slider.css';
import { NextUIProvider } from '@nextui-org/react';

function MyApp({ Component, pageProps }) {
    return (
        <NextUIProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </NextUIProvider>
    );
}

export default MyApp;
