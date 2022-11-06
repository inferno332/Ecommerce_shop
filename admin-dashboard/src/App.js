import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import Dashboard from './pages/dashboard';
import Team from './pages/team';
import Contacts from './pages/contacts';
import Categories from './pages/categories';
import Customers from './pages/customers';
import Form from './pages/form';
// import Bar from './pages/bar';
// import Line from './pages/line';
// import Pie from './pages/pie';
// import Geography from './pages/geography';
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
                            <Route path="team" element={<Team />} />
                            <Route path="categories" element={<Categories />} />
                            <Route path="customers" element={<Customers />} />
                            <Route path="contacts" element={<Contacts />} />
                            <Route path="/form" element={<Form />} />
                            {/* <Route path="/bar" element={<Bar />} /> */}
                            {/* <Route path="/pie" element={<Pie />} /> */}
                            {/* <Route path="/line" element={<Line />} /> */}
                            {/* <Route path="/geography" element={<Geography />} /> */}
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
