import React, { useContext, useState } from 'react';
import { io } from 'socket.io-client';
import moment from 'moment';
import axiosJWT from '../../axios/axiosJWT';
import { useNavigate } from 'react-router-dom';

import { Box, IconButton, useTheme, Badge, Popover, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import {
    LightModeOutlined,
    DarkModeOutlined,
    NotificationsOutlined,
    SettingsOutlined,
    PersonOutlined,
    Search,
} from '@mui/icons-material';
import { useEffect } from 'react';

function Topbar() {
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
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
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <Search />
                </IconButton>
            </Box>

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

                <IconButton>
                    <PersonOutlined />
                </IconButton>
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
