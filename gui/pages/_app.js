import Layout from '../components/Layout';
import '../styles/globals.css';
import '../styles/range-slider.css';
import { NextUIProvider } from '@nextui-org/react';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
    return (
        <NextUIProvider>
            <Layout>
                <NextNProgress
                    color='#000'
                    startPosition={0.2}
                    stopDelayMs={200}
                    height={5}
                    showOnShallow={true}
                    options={{ easing: 'ease', speed: 500 }}
                />
                <Component {...pageProps} />
            </Layout>
        </NextUIProvider>
    );
}

export default MyApp;
