import React from 'react';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';

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
                return <ActionsRow content='Customer' params={params} handleDelete={handleDelete} updateData={updateData} />;
            },
        },
    ];

    return (
        <Box m="20px">
            <Header title="Customers" subtitle="List of Customers" />
            <DataTable
                rows={customers}
                columns={columns}
                getRowId={(row) => row._id}
                styling
                disableSelectionOnClick
            />
        </Box>
    );
};

export default Customers;
