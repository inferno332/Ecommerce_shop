import React from 'react';
import { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { AdminPanelSettingsOutlined, WorkOutlineRounded, ManageAccountsOutlined } from '@mui/icons-material';
import moment from 'moment';
import toast, { Toaster } from 'react-hot-toast';

import DataTable from '../../components/DataTable';
import Header from '../../components/Header';
import ActionsRow from '../../components/ActionsRow';
import axiosJWT from '../../axios/axiosJWT';
import { tokens } from '../../theme';

const Employees = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [employees, setEmployees] = useState([]);
    const [refresh, setRefesh] = useState(false);

    const handleDelete = async (id) => {
        try {
            await axiosJWT.delete(`http://localhost:9000/employees/${id}`);
            setEmployees(employees.filter((employee) => employee._id !== id));
            toast.success('Successfully deleted!');
        } catch (error) {
            console.log(error);
        }
    };

    const updateData = async (data, params) => {
        try {
            await axiosJWT.patch(`http://localhost:9000/employees/${params.row._id}`, data);
            setRefesh((prev) => !prev);
            toast.success('Successfully updated!');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosJWT.get('http://localhost:9000/employees');
                setEmployees(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);

    const columns = [
        {
            field: 'roles',
            headerName: 'Roles',
            flex: 1,
            renderCell: (params) => {
                return (
                    <Box width="30%" display="flex" gap={1} flex="1">
                        {params.row.roles.map((role) => (
                            <Box
                                key={role}
                                minWidth="82px"
                                py="6px"
                                display="flex"
                                justifyContent="center"
                                backgroundColor={
                                    role === 'admin'
                                        ? colors.greenAccent[600]
                                        : role === 'manager'
                                        ? colors.redAccent[600]
                                        : colors.redAccent[700]
                                }
                                borderRadius="4px"
                            >
                                {role === 'admin' && <AdminPanelSettingsOutlined />}
                                {role === 'manager' && <ManageAccountsOutlined />}
                                {role === 'staff' && <WorkOutlineRounded />}
                                <Typography color={colors.grey[100]} ml="5px">
                                    {role.toUpperCase().charAt(0) + role.slice(1)}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                );
            },
        },
        { field: 'fullName', headerName: 'Name', flex: 0.5, cellClassName: 'name-column--cell' },
        { field: 'email', headerName: 'Email', flex: 0.6 },
        { field: 'phoneNumber', headerName: 'Phone' },
        { field: 'address', headerName: 'Address', flex: 0.6 },

        {
            field: 'birthday',
            headerName: 'Birthday',
            renderCell: (params) => moment(params.row.birthday).format('DD-MM-YYYY'),
        },
        {
            field: 'action',
            headerName: 'Actions',
            minWidth: 120,
            renderCell: (params) => {
                return (
                    <ActionsRow
                        content="Employee"
                        params={params}
                        handleDelete={handleDelete}
                        updateData={updateData}
                    />
                );
            },
        },
    ];

    return (
        <Box m="20px">
            <Toaster position="top-center" reverseOrder={false} />
            <Header title="Employees" subtitle="List of Employees" />
            <DataTable rows={employees} columns={columns} getRowId={(row) => row._id} loading={employees.length === 0} styling disableSelectionOnClick />
        </Box>
    );
};

export default Employees;
