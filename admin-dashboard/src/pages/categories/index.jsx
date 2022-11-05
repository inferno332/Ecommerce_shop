import React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';

import DataTable from '../../components/DataTable';
import Header from '../../components/Header';
import { tokens } from '../../theme';
import axios from 'axios';

const Categories = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [categories, setCategories] = useState([]);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:9000/categories/${id}`);
        setCategories(categories.filter((category) => category._id !== id));
        console.log(categories);
    };

    useEffect(() => {
        axios.get('http://localhost:9000/categories').then((res) => setCategories(res.data));
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
                return (
                    <Box display="flex" gap={3}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: colors.greenAccent[600],
                                ':hover': { backgroundColor: colors.greenAccent[700] },
                            }}
                            startIcon={<EditOutlined />}
                        >
                            <Typography color={colors.grey[100]} ml="5px">
                                Edit
                            </Typography>
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: colors.redAccent[600],
                                ':hover': { backgroundColor: colors.redAccent[700] },
                            }}
                            startIcon={<DeleteOutline />}
                            onClick={() => handleDelete(params.row._id)}
                        >
                            <Typography color={colors.grey[100]} ml="5px">
                                Delete
                            </Typography>
                        </Button>
                    </Box>
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
