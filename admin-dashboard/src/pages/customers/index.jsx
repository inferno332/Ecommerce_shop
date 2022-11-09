import React from 'react';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import moment from 'moment';

import DataTable from '../../components/DataTable';
import Header from '../../components/Header';
import ActionsRow from '../../components/ActionsRow';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [refresh, setRefesh] = useState(false);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:9000/customers/${id}`);
            setCustomers(customers.filter((customer) => customer._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const updateData = (data, params) => {
        try {
            axios.put(`http://localhost:9000/customers/${params.row._id}`, data);
            setRefesh(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        axios
            .get('http://localhost:9000/customers')
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
            <Header title="Customers" subtitle="List of Customers" />
            <DataTable rows={customers} columns={columns} getRowId={(row) => row._id} styling disableSelectionOnClick />
        </Box>
    );
};

export default Customers;
