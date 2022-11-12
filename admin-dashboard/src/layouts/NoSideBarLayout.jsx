import React from 'react';
import { Outlet } from 'react-router-dom';
import ParticlesLayout from './ParticlesLayout';

function NoSideBarLayout(props) {
    return (
        <>
            <ParticlesLayout />
            {props.children ? props.children : <Outlet />}
        </>
    );
}

export default NoSideBarLayout;
