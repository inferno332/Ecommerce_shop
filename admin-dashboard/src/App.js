import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import Topbar from './pages/global/Topbar';
import Sidebar from './pages/global/Sidebar';
import Dashboard from './pages/dashboard';
import Team from './pages/team';
import Contacts from './pages/contacts';
import Categories from './pages/categories';
// import Invoices from './pages/invoices';
// import Bar from './pages/bar';
// import Form from './pages/form';
// import Line from './pages/line';
// import Pie from './pages/pie';
// import Geography from './pages/geography';

function App() {
    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {/* Reset css */}
                <CssBaseline />
                <div className="app">
                    <Sidebar />
                    <main className="content">
                        <Topbar />
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/team" element={<Team />} />
                            <Route path="/categories" element={<Categories />} />
                            <Route path="/contacts" element={<Contacts />} />
                            {/* <Route path="/form" element={<Form />} /> */}
                            {/* <Route path="/bar" element={<Bar />} /> */}
                            {/* <Route path="/pie" element={<Pie />} /> */}
                            {/* <Route path="/line" element={<Line />} /> */}
                            {/* <Route path="/geography" element={<Geography />} /> */}
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
