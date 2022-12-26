import { useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { tokens } from '../../theme';
import {
    HomeOutlined,
    PeopleOutlined,
    ReceiptOutlined,
    MenuOutlined,
    LogoutOutlined,
    AdminPanelSettingsOutlined,
    CategoryOutlined,
    WidgetsOutlined,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/apiRequests';

const DataPage = [
    {
        title: 'Employees',
        to: '/employees',
        icon: <AdminPanelSettingsOutlined />,
    },
    {
        title: 'Categories',
        to: '/categories',
        icon: <CategoryOutlined />,
    },
    {
        title: 'Products',
        to: '/products',
        icon: <WidgetsOutlined />,
    },
    {
        title: 'Orders',
        to: '/orders',
        icon: <ReceiptOutlined />,
    },
];

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{ color: colors.grey[100] }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        logoutUser(dispatch, navigate);
    };

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('Dashboard');

    const user = useSelector((state) => state.auth.login.currentUser);

    return (
        <Box
            sx={{
                '& .pro-sidebar-inner': {
                    background: `${colors.primary[400]} !important`,
                },
                '& .pro-icon-wrapper': {
                    backgroundColor: 'transparent !important',
                },
                '& .pro-inner-item': {
                    padding: '5px 35px 5px 20px !important',
                },
                '& .pro-inner-item:hover': {
                    color: `${colors.blueAccent[500]} !important`,
                },
                '& .pro-menu-item.active': {
                    color: `${colors.blueAccent[500]} !important`,
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlined /> : undefined}
                        style={{
                            margin: '10px 0 20px 0',
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                                <Typography variant="h3" color={colors.grey[100]}>
                                    ADMIN
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlined />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {/* USER */}
                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={`../../assets/user.png`}
                                    style={{ cursor: 'pointer', borderRadius: '50%' }}
                                />
                            </Box>

                            <Box textAlign="center">
                                <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" marginTop="10px">
                                    {user?.payload.fullName}
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[400]}>
                                    VP Fancy Admin
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    {/* MENU ITEMS */}
                    <Box paddingLeft={isCollapsed ? undefined : '10%'}>
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        {DataPage.map((item) => (
                            <Item
                                key={item.title}
                                title={item.title}
                                to={item.to}
                                icon={item.icon}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        ))}
                    </Box>
                    {/* Log out */}
                    <Divider variant="middle" sx={{ my: '10px', color: colors.primary[100] }} />
                    <Box paddingLeft={isCollapsed ? undefined : '10%'}>
                        <MenuItem
                            style={{ color: colors.grey[100] }}
                            onClick={handleLogout}
                            icon={<LogoutOutlined />}
                        >
                            <Typography>Log out</Typography>
                        </MenuItem>
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
}

export default Sidebar;
