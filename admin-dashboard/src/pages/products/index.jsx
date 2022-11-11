import React from 'react';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axiosJWT from '../../axios/axiosJWT';
import toast, { Toaster } from 'react-hot-toast';

import DataTable from '../../components/DataTable';
import Header from '../../components/Header';
import ActionsRow from '../../components/ActionsRow';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [refresh, setRefesh] = useState(false);

    const handleDelete = async (id) => {
        try {
            await axiosJWT.delete(`http://localhost:9000/products/${id}`);
            setProducts(products.filter((product) => product._id !== id));
            toast.success('Successfully deleted!');
        } catch (error) {
            console.log(error);
        }
    };

    const updateData = async (data, params) => {
        try {
            await axiosJWT.put(`http://localhost:9000/products/${params.row._id}`, data);
            setRefesh((prev) => !prev);
            toast.success('Successfully updated!');
        } catch (error) {
            toast.error('Can not update!');
            console.log(error);
        }
    };

    const getAllCategories = async () => {
        try {
            const res = await axiosJWT.get('http://localhost:9000/categories');
            setCategories(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getAllSuppliers = async () => {
        try {
            const res = await axiosJWT.get('http://localhost:9000/suppliers');
            setSuppliers(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getProducts = async () => {
        try {
            const res = await axiosJWT.get('http://localhost:9000/products');
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getAllCategories();
        getAllSuppliers();
        getProducts();
    }, [refresh]);

    const columns = [
        { field: 'name', headerName: 'Name',flex:1 },
        { field: 'price', headerName: 'Price' },
        { field: 'discount', headerName: 'Discount (%)' },
        { field: 'stock', headerName: 'Stock' },
        { field: 'categoryName', headerName: 'Category', valueGetter: (params) => params.row.category?.name },
        { field: 'supplierName', headerName: 'Supplier', valueGetter: (params) => params.row.supplier?.name },
        {
            field: 'action',
            headerName: 'Actions',
            flex: 0.85,
            renderCell: (params) => {
                return (
                    <ActionsRow
                        content="Product"
                        params={params}
                        handleDelete={handleDelete}
                        updateData={updateData}
                        categories={categories}
                        suppliers={suppliers}
                    />
                );
            },
        },
    ];

    return (
        <Box m="20px">
            <Toaster position="top-center" reverseOrder={false} />
            <Header title="Products" subtitle="List of products" />
            <DataTable
                rows={products}
                columns={columns}
                getRowId={(row) => row._id}
                loading={products.length === 0}
                styling
                disableSelectionOnClick
            />
        </Box>
    );
};

export default Products;
