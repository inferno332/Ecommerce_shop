import React from 'react';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axiosJWT from '../../axios/axiosJWT';

import DataTable from '../../components/DataTable';
import Header from '../../components/Header';
import ActionsRow from '../../components/ActionsRow';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [refresh, setRefesh] = useState(false);

    const handleDelete = async (id) => {
        try {
            await axiosJWT.delete(`http://localhost:9000/categories/${id}`);
            setCategories(categories.filter((category) => category._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const updateData = (data, params) => {
        try {
            axiosJWT.put(`http://localhost:9000/categories/${params.row._id}`, data);
            setRefesh(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        axiosJWT
            .get('http://localhost:9000/categories')
            .then((res) => setCategories(res.data))
            .catch((err) => console.log(err));
    }, [refresh]);

    const columns = [
        { field: '_id', headerName: 'Categories ID', width: 200 },
        { field: 'name', headerName: 'Category', flex: 0.5, cellClassName: 'name-column--cell' },
        { field: 'description', headerName: 'Description', flex: 1 },
        {
            field: 'action',
            headerName: 'Actions',
            flex: 0.85,
            renderCell: (params) => {
                return (
                    <ActionsRow
                        content="Category"
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
