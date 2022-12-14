import React from 'react';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axiosJWT from '../../axios/axiosJWT';
import moment from 'moment';
import toast, { Toaster } from 'react-hot-toast';

import DataTable from '../../components/DataTable';
import Header from '../../components/Header';
import ActionsRow from '../../components/ActionsRow';
import { GridToolbar } from '@mui/x-data-grid';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [refresh, setRefesh] = useState(false);

    const handleDelete = async (id) => {
        try {
            await axiosJWT.delete(`${process.env.REACT_APP_BASE_URL}/customers/${id}`);
            setCustomers(customers.filter((customer) => customer._id !== id));
            toast.success('Successfully deleted!');
        } catch (error) {
            console.log(error);
        }
    };

    const updateData = async (data, params) => {
        try {
            await axiosJWT.put(`${process.env.REACT_APP_BASE_URL}/customers/${params.row._id}`, data);
            setRefesh((prev) => !prev);
            console.log(data);
            toast.success('Successfully updated!');
        } catch (error) {
            toast.error('Can not update!');
            console.log(error);
        }
    };

    useEffect(() => {
        axiosJWT
            .get(`${process.env.REACT_APP_BASE_URL}/customers`)
            .then((res) => setCustomers(res.data))
            .catch((err) => console.log(err));
    }, [refresh]);

    const columns = [
        { field: '_id', headerName: 'Customers ID', width: 180 },
        { field: 'firstName', headerName: 'Customer', flex: 0.5, cellClassName: 'name-column--cell' },
        { field: 'email', headerName: 'Email', flex: 0.5 },
        { field: 'phoneNumber', headerName: 'Phone', flex: 0.5 },
        { field: 'address', headerName: 'Address', flex: 1 },
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
                        content="Customer"
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
            <Header title="Customers" subtitle="List of Customers" />
            <DataTable
                rows={customers}
                columns={columns}
                getRowId={(row) => row._id}
                components={{ Toolbar: GridToolbar }}
                disableSelectionOnClick
                loading={customers.length === 0}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 15, 20]}
            />
        </Box>
    );
};

export default Customers;
