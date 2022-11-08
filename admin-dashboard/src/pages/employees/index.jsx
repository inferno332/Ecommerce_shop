import React from 'react';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import DataTable from '../../components/DataTable';
import Header from '../../components/Header';
import ActionsRow from '../../components/ActionsRow';
import axiosJWT from '../../axios/axiosJWT';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [refresh, setRefesh] = useState(false);

    const handleDelete = async (id) => {
        try {
            await axiosJWT.delete(`http://localhost:9000/employees/${id}`);
            setEmployees(employees.filter((employee) => employee._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const updateData = (data, params) => {
        try {
            axiosJWT.patch(`http://localhost:9000/employees/${params.row._id}`, data);
            console.log(params.row._id);
            setRefesh(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        axiosJWT
            .get('http://localhost:9000/employees')
            .then((res) => setEmployees(res.data))
            .catch((err) => console.log(err));
    }, [refresh]);

    const columns = [
        { field: '_id', headerName: 'Employees ID', width: 180 },
        { field: 'fullName', headerName: 'Name', flex: 0.5, cellClassName: 'name-column--cell' },
        { field: 'email', headerName: 'Email', flex: 0.85 },
        { field: 'phoneNumber', headerName: 'Phone', flex: 0.5 },
        { field: 'address', headerName: 'Address' },
        { field: 'birthday', headerName: 'Birthday',flex: 0.5 },
        {
            field: 'action',
            headerName: 'Actions',
            flex: 0.85,
            minWidth: 150,
            renderCell: (params) => {
                return <ActionsRow content='Employee' params={params} handleDelete={handleDelete} updateData={updateData} />;
            },
        },
    ];

    return (
        <Box m="20px">
            <Header title="Employees" subtitle="List of Employees" />
            <DataTable
                rows={employees}
                columns={columns}
                getRowId={(row) => row._id}
                styling
                disableSelectionOnClick
            />
        </Box>
    );
};

export default Employees;
