import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from 'react';

const Layout = ({ children }) => {
    //Fix Next.js “Text content does not match server-rendered HTML” React hydration error
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        return null;
    }
    //END
    return (
        <>
            <Header />
            <main className='container mx-auto min-h-[90vh] sm:min-h-[80vh]'>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
