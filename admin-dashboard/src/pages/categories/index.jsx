import React from 'react';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';

import DataTable from '../../components/DataTable';
import Header from '../../components/Header';
import ActionsRow from '../../components/ActionsRow';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:9000/categories/${id}`);
            setCategories(categories.filter((category) => category._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        axios
            .get('http://localhost:9000/categories')
            .then((res) => setCategories(res.data))
            .catch((err) => console.log(err));
    }, []);

    const columns = [
        { field: '_id', headerName: 'Categories ID', width: 200 },
        { field: 'name', headerName: 'Category', flex: 0.5, cellClassName: 'name-column--cell' },
        { field: 'description', headerName: 'Description', flex: 1 },
        {
            field: 'action',
            headerName: 'Actions',
            width: 200,
            flex: 0.5,
            renderCell: (params) => {
                return <ActionsRow params={params} handleDelete={handleDelete} />;
            },
        },
    ];

    return (
        <Box m="20px">
            <Header title="Categories" subtitle="List of Categories" />
            <DataTable
                rows={categories}
                columns={columns}
                getRowId={(row) => row._id}
                styling
                disableSelectionOnClick
            />
        </Box>
    );
};

export default Categories;
