import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import Dashboard from './pages/dashboard';
import Orders from './pages/orders';
import Categories from './pages/categories';
import Customers from './pages/customers';
import Employees from './pages/employees';
import Products from './pages/products';
import MainLayout from './layouts/MainLayout';
import Register from './pages/login/Register';
import Index from './pages';
import NoSideBarLayout from './layouts/NoSideBarLayout';
import Login from './pages/login/Login';

function App() {
    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {/* Reset css */}
                <CssBaseline />
                <Routes>
                    <Route path="/" element={<Index />}>
                        <Route element={<MainLayout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="categories" element={<Categories />} />
                            <Route path="customers" element={<Customers />} />
                            <Route path="orders" element={<Orders />} />
                            <Route path="employees" element={<Employees />} />
                            <Route path="products" element={<Products />} />
                        </Route>

                        <Route element={<NoSideBarLayout />}>
                            <Route path="register" element={<Register />} />
                            <Route path="login" element={<Login />} />
                        </Route>
                    </Route>
                </Routes>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
