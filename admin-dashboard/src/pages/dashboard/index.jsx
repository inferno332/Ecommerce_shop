import { Box, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import axiosJWT from '../../axios/axiosJWT';
import EmailIcon from '@mui/icons-material/Email';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TrafficIcon from '@mui/icons-material/Traffic';

import { tokens } from '../../theme';
import StatBox from '../../components/StatBox';
import LineChart from '../../components/LineChart';

function Dashboard() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [orderSold, setOrderSold] = useState({
        today: 0,
        week: 0,
        month: 0,
    });
    const getSoldOrderByDay = async () => {
        try {
            const res = await axiosJWT.get('https://server-ls-shop.onrender.com/orders/sold/today');
            setOrderSold((prev) => {
                return { ...prev, today: res.data.length };
            });
        } catch (error) {
            console.log(error);
        }
    };
    const getSoldOrderByWeek = async () => {
        try {
            const res = await axiosJWT.get('https://server-ls-shop.onrender.com/orders/sold/week');
            setOrderSold((prev) => {
                return { ...prev, week: res.data.length };
            });
        } catch (error) {
            console.log(error);
        }
    };
    const getSoldOrderByMonth = async () => {
        try {
            const res = await axiosJWT.get('https://server-ls-shop.onrender.com/orders/sold/month');
            setOrderSold((prev) => {
                return { ...prev, month: res.data.length };
            });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getSoldOrderByDay();
        getSoldOrderByWeek();
        getSoldOrderByMonth();
    }, []);
    console.log(orderSold);
    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            </Box>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
                {/* ROW 1 */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={orderSold.today.toString()}
                        subtitle="Today's Orders"
                        progress="0.75"
                        increase="+14%"
                        icon={<EmailIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={`${orderSold.week}`}
                        subtitle="This Week's Orders"
                        progress="0.50"
                        increase="+21%"
                        icon={<PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={`${orderSold.month}`}
                        subtitle="This Month's Orders"
                        progress="0.30"
                        increase="+5%"
                        icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title="1,325,134"
                        subtitle="Traffic Received"
                        progress="0.80"
                        increase="+43%"
                        icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
                    />
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" height="250px">
                <LineChart isDashboard />
            </Box>
        </Box>
    );
}

export default Dashboard;
