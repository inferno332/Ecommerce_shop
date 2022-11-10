import React from 'react';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axiosJWT from '../../axios/axiosJWT';
import toast, { Toaster } from 'react-hot-toast';

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
            toast.success('Successfully deleted!');
        } catch (error) {
            console.log(error);
        }
    };

    const updateData = async (data, params) => {
        try {
            await axiosJWT.put(`http://localhost:9000/categories/${params.row._id}`, data);
            setRefesh((prev) => !prev);
            toast.success('Successfully updated!');
        } catch (error) {
            toast.error('Can not update!');
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
            <Toaster position="top-center" reverseOrder={false} />
            <Header title="Categories" subtitle="List of Categories" />
            <DataTable
                rows={categories}
                columns={columns}
                getRowId={(row) => row._id}
                loading={categories.length === 0}
                styling
                disableSelectionOnClick
            />
        </Box>
    );
};

export default Categories;
