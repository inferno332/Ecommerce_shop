import React from 'react';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axiosJWT from '../../axios/axiosJWT';
import toast, { Toaster } from 'react-hot-toast';

import DataTable from '../../components/DataTable';
import Header from '../../components/Header';
import ActionsRow from '../../components/ActionsRow';
import { GridToolbar } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';

const Products = () => {
    const roles = useSelector((state) => {
        if (state.auth.login.currentUser !== null) {
            return state.auth.login.currentUser.payload.roles;
        }
        return [];
    });
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [refresh, setRefesh] = useState(false);

    const createData = async (data) => {
        try {
            await axiosJWT.post(`${process.env.REACT_APP_BASE_URL}/products`, data);
            setRefesh((prev) => !prev);
            toast.success('Successfully updated!');
        } catch (error) {
            toast.error('Can not update!');
            console.log(error);
        }
    };

    const handleUpload = async (params, e) => {
        const formData = new FormData();
        formData.append('files', e.target.files[0]);
        await axiosJWT
            .post(`${process.env.REACT_APP_BASE_URL}/upload/product/${params.row._id}`, formData)
            .then(() => {
                setRefesh((prev) => !prev);
                toast.success('Successfully uploaded!');
            })
            .catch((err) => console.log(err));
    };

    const handleDelete = async (id) => {
        try {
            await axiosJWT.delete(`${process.env.REACT_APP_BASE_URL}/products/${id}`);
            setProducts(products.filter((product) => product._id !== id));
            toast.success('Successfully deleted!');
        } catch (error) {
            console.log(error);
        }
    };

    const updateData = async (data, params) => {
        try {
            await axiosJWT.patch(`${process.env.REACT_APP_BASE_URL}/products/${params.row._id}`, data);
            setRefesh((prev) => !prev);
            toast.success('Successfully updated!');
        } catch (error) {
            toast.error('Can not update!');
            console.log(error);
        }
    };

    const getAllCategories = async () => {
        try {
            const res = await axiosJWT.get(`${process.env.REACT_APP_BASE_URL}/categories`);
            setCategories(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    const getAllSuppliers = async () => {
        try {
            const res = await axiosJWT.get(`${process.env.REACT_APP_BASE_URL}/suppliers`);
            setSuppliers(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getProducts = async () => {
        try {
            const res = await axiosJWT.get(`${process.env.REACT_APP_BASE_URL}/products`);
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
        { field: 'name', headerName: 'Name', flex: 0.5 },
        { field: 'price', headerName: 'Price', flex: 0.3 },
        {
            field: 'stock',
            headerName: 'Stock',
            flex: 0.3,
            valueGetter: (params) => params.row.sizes.map((size) => size.stock).reduce((a, b) => a + b, 0),
        },
        {
            field: 'categoryName',
            headerName: 'Category',
            valueGetter: (params) => params.row.category?.name,
            flex: 0.3,
        },
        {
            field: 'supplierName',
            headerName: 'Supplier',
            valueGetter: (params) => params.row.supplier?.name,
            flex: 0.3,
        },
        {
            field: 'action',
            headerName: 'Actions',
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <ActionsRow
                        content="Product"
                        params={params}
                        handleDelete={handleDelete}
                        updateData={updateData}
                        handleUpload={handleUpload}
                        categories={categories}
                        suppliers={suppliers}
                        disableDelete={roles.includes('admin') ? false : true}
                    />
                );
            },
        },
        {
            field: 'imageURL',
            headerName: 'Image',
            flex: 1,
            renderCell: (params) => {
                return params.row.imageURL.map((image, index) => {
                    return (
                        <img
                            key={index}
                            style={{
                                width: 60,
                                height: 60,
                                objectFit: 'fill',
                                borderRadius: '20%',
                                marginRight: '10px',
                            }}
                            src={`${process.env.REACT_APP_BASE_URL}${image}`}
                            alt=""
                        />
                    );
                });
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
                components={{ Toolbar: GridToolbar }}
                disableSelectionOnClick
                rowHeight={70}
                loading={products.length === 0}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 15, 20]}
                categories={categories}
                suppliers={suppliers}
                createData={createData}
                content="Product"
            />
        </Box>
    );
};

export default Products;
