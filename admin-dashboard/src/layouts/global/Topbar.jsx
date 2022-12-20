import React, { useContext, useState,useEffect } from 'react';
import { io } from 'socket.io-client';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { LightModeOutlined, DarkModeOutlined, NotificationsOutlined } from '@mui/icons-material';
import { Box, IconButton, useTheme, Badge, Popover, Typography } from '@mui/material';

import axiosJWT from '../../axios/axiosJWT';
import { ColorModeContext } from '../../theme';

function Topbar() {
    const navigate = useNavigate();
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const [notification, setNotification] = useState([]);
    const [orders, setOrders] = useState([]);
    const [openNotif, setOpenNotif] = useState(false);

    let socket = io.connect(`${process.env.REACT_APP_BASE_URL}`, {
        secure: true,
        reconnection: true,
        reconnectionDelay: 5000,
        reconnectionAttempts: 20,
    });

    useEffect(() => {
        const notif = window.localStorage.getItem('notification');
        if (notif !== null) {
            setNotification(JSON.parse(notif));
        }

        socket.on('server-notification', (data) => {
            setNotification((prev) => [...prev, data]);
        });
    }, []);

    useEffect(() => {
        window.localStorage.setItem('notification', JSON.stringify(notification));

        axiosJWT.get(`${process.env.REACT_APP_BASE_URL}/orders`).then((res) => setOrders(res.data));
    }, [notification]);

    return (
        <Box display="flex" justifyContent="flex-end" p={2}>
            {/* ICONS */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? <DarkModeOutlined /> : <LightModeOutlined />}
                </IconButton>
                <StyledBadge badgeContent={notification.length} color="success">
                    <div>
                        <IconButton
                            onClick={() => {
                                setOpenNotif((prev) => !prev);
                            }}
                        >
                            <NotificationsOutlined />
                        </IconButton>
                        {notification.length > 0 ? (
                            <Popover
                                open={openNotif}
                                onClose={() => {
                                    setOpenNotif(false);
                                    setNotification([]);
                                }}
                                anchorReference="anchorPosition"
                                anchorPosition={{ top: 50, left: 1700 }}
                                sx={{ maxHeight: '350px', overflowY: 'scroll' }}
                            >
                                {orders.map((item, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            p: 2,
                                            width: '200px',
                                            borderBottom: '1px solid #ccc',
                                        }}
                                        onClick={() => {
                                            navigate('/orders');
                                            setOpenNotif(false);
                                            setNotification([]);
                                        }}
                                    >
                                        <Typography variant="h5">
                                            You have an order of {item.firstName} {item.lastName}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#e3d6d6' }}>
                                            {moment(item.createdAt).fromNow()}
                                        </Typography>
                                    </Box>
                                ))}
                            </Popover>
                        ) : (
                            <Popover
                                open={openNotif}
                                onClose={() => setOpenNotif(false)}
                                anchorReference="anchorPosition"
                                anchorPosition={{ top: 50, left: 1700 }}
                            >
                                <Typography sx={{ p: 2 }}>Don't have any notifications</Typography>
                            </Popover>
                        )}
                    </div>
                </StyledBadge>
            </Box>
        </Box>
    );
}

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 7,
        top: 7,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

export default Topbar;
