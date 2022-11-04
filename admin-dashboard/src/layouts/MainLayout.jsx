import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../pages/global/Sidebar';
import Topbar from '../pages/global/Topbar';

function MainLayout({children}) {
    return (
        <>
            <div className="app">
                <Sidebar />
                <div className="content">
                    <Topbar />
                    {children ? children : <Outlet />}
                </div>
            </div>
        </>
    );
}

export default MainLayout;
