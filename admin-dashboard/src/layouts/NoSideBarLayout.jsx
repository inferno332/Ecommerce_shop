import React from 'react';
import { Outlet } from 'react-router-dom';
import ParticlesLayout from '../components/ParticlesLayout';

function NoSideBarLayout({children}) {
    return (
        <>
            <ParticlesLayout />
            {children ? children : <Outlet />}
        </>
    );
}

export default NoSideBarLayout;
