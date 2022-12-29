import React from 'react';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axiosJWT from '../../axios/axiosJWT';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

import DataTable from '../../components/DataTable';
import Header from '../../components/Header';
import ActionsRow from '../../components/ActionsRow';
import { GridToolbar } from '@mui/x-data-grid';

const Categories = () => {
    const roles = useSelector((state) => state.auth.login.currentUser.payload.roles);
    const [categories, setCategories] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [refresh, setRefesh] = useState(false);

    const createData = async (data) => {
        try {
            await axiosJWT.post(`${process.env.REACT_APP_BASE_URL}/categories`, data);
            setRefesh((prev) => !prev);
            toast.success('Successfully updated!');
        } catch (error) {
            toast.error('Can not update!');
            console.log(error);
        }
    };

    const handleUpload = async (params, e) => {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        await axiosJWT
            .post(`${process.env.REACT_APP_BASE_URL}/upload/category/${params.row._id}`, formData)
            .then(() => {
                setRefesh((prev) => !prev);
                toast.success('Successfully uploaded!');
            })
            .catch((err) => console.log(err));
    };

    const handleDelete = async (id) => {
        try {
            const res = await axiosJWT.delete(`${process.env.REACT_APP_BASE_URL}/categories/${id}`);
            setRefesh((prev) => !prev);
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const updateData = async (data, params) => {
        try {
            await axiosJWT.put(`${process.env.REACT_APP_BASE_URL}/categories/${params.row._id}`, data);
            setRefesh((prev) => !prev);
            toast.success('Successfully updated!');
        } catch (error) {
            toast.error('Can not update!');
            console.log(error);
        }
    };

    useEffect(() => {
        axiosJWT
            .get(`${process.env.REACT_APP_BASE_URL}/categories`)
            .then((res) => setCategories(res.data))
            .catch((err) => console.log(err));
    }, [refresh]);

    const columns = [
        {
            field: 'imageURL',
            headerName: 'Image',
            width: 200,
            renderCell: (params) => (
                <img
                    style={{ width: 90, height: 90, objectFit: 'fill', borderRadius: '10px' }}
                    src={`${process.env.REACT_APP_BASE_URL}${params.row.imageUrl}`}
                    alt=""
                />
            ),
        },
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
                        handleUpload={handleUpload}
                        disableDelete={!roles.includes('admin')}
                        disableEdit={!roles.includes('admin')}
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
                components={{ Toolbar: GridToolbar }}
                disableSelectionOnClick
                loading={categories.length === 0}
                rowHeight={100}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 15, 20]}
                createData={createData}
                content="Category"
            />
        </Box>
    );
};

export default Categories;
