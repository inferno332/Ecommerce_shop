import { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { mockDataTeam } from '../../data/mockData';
import { AdminPanelSettingsOutlined, LockOpenOutlined, SecurityOutlined } from '@mui/icons-material';

import DataTable from '../../components/DataTable';
import Header from '../../components/Header';

function Team() {
    const [pageSize, setPageSize] = useState(5);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'NAME', flex: 1, cellClassName: 'name-column--cell' },
        { field: 'age', headerName: 'AGE', type: 'number', headerAlign: 'left', align: 'left' },
        { field: 'phone', headerName: 'PHONE NUMBER', flex: 1 },
        { field: 'email', headerName: 'EMAIL', flex: 1 },
        {
            field: 'access',
            headerName: 'Acess Level',
            flex: 1,
            renderCell: ({ row: { access } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={access === 'admin' ? colors.greenAccent[600] : colors.redAccent[700]}
                        borderRadius="4px"
                        overflow="hidden"
                    >
                        {access === 'admin' && <AdminPanelSettingsOutlined />}
                        {access === 'manager' && <SecurityOutlined />}
                        {access === 'user' && <LockOpenOutlined />}
                        <Typography color={colors.grey[100]} ml="5px">
                            {access}
                        </Typography>
                    </Box>
                );
            },
        },
    ];

    return (
        <Box m="20px">
            <Header title="TEAM" subtitle="Managing the Team Members" />
            <DataTable
                rows={mockDataTeam}
                columns={columns}
                styling
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 15, 20]}
            />
        </Box>
    );
}

export default Team;
