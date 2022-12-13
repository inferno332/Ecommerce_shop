import React from 'react';
import { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { GridToolbar } from '@mui/x-data-grid';
import { AssignmentIndOutlined, HourglassBottomOutlined, LocalShippingOutlined } from '@mui/icons-material';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';

import axiosJWT from '../../axios/axiosJWT';
import DataTable from '../../components/DataTable';
import Header from '../../components/Header';
import ActionsRow from '../../components/ActionsRow';
import { tokens } from '../../theme';
import OrderDetailsModal from '../../components/Modals/OrderDetailsModal';

const Orders = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [orders, setOrders] = useState([]);
    const [open, setOpen] = useState(false);
    const [orderDetails, setOrderDetails] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [refresh, setRefesh] = useState(false);

    const createData = async (data) => {
        try {
            await axiosJWT.post('http://localhost:9000/orders', data);
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
            .post(`http://localhost:9000/upload/orders/${params.row._id}`, formData)
            .then(() => {
                setRefesh((prev) => !prev);
                toast.success('Successfully uploaded!');
            })
            .catch((err) => {
                console.log(err);
                toast.error('Can not upload!');
            });
    };

    const handleDelete = async (id) => {
        try {
            await axiosJWT.delete(`http://localhost:9000/orders/${id}`);
            setOrders(orders.filter((category) => category._id !== id));
            toast.success('Successfully deleted!');
        } catch (error) {
            console.log(error);
            toast.error('Can not delete!');
        }
    };

    const updateData = async (data, params) => {
        try {
            await axiosJWT.put(`http://localhost:9000/orders/${params.row._id}`, data);
            setRefesh((prev) => !prev);
            toast.success('Successfully updated!');
        } catch (error) {
            toast.error('Can not update!');
            console.log(error);
        }
    };
    const handleRowClick = (orders) => {
        setOrderDetails(orders);
        setOpen(true);
    };

    useEffect(() => {
        axiosJWT
            .get('http://localhost:9000/orders')
            .then((res) => setOrders(res.data))
            .catch((err) => {
                console.log(err);
                toast.error('Can not get data!');
            });
    }, [refresh]);

    const columns = [
        {
            field: 'Customer Name',
            headerName: 'Customer Name',
            flex: 0.5,
            valueGetter: ({ row: { firstName, lastName } }) => `${firstName} ${lastName}`,
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            flex: 0.3,
        },
        {
            field: 'email',
            headerName: 'Customer Email',
            flex: 0.5,
        },
        {
            field: 'address',
            headerName: 'Address',
            flex: 0.5,
        },
        {
            field: 'shippedDate',
            headerName: 'Shipped Date',
            flex: 0.3,
            valueGetter: ({ row: { shippedDate } }) => moment(shippedDate).format('DD-MM-YYYY'),
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 0.5,
            renderCell: ({ row: { status } }) => {
                return (
                    <Box
                        minWidth="100px"
                        py="6px"
                        px='8px'
                        borderRadius="4px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            status === 'delivered'
                                ? colors.greenAccent[600]
                                : status === 'waiting'
                                ? colors.redAccent[600]
                                : colors.redAccent[700]
                        }
                    >
                        {status === 'waiting' && <HourglassBottomOutlined />}
                        {status === 'shipping' && <LocalShippingOutlined />}
                        {status === 'delivered' && <AssignmentIndOutlined />}
                        <Typography color={colors.grey[100]} ml="5px">
                            {status.toUpperCase().charAt(0) + status.slice(1)}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: 'action',
            headerName: 'Actions',
            flex: 0.85,
            renderCell: (params) => {
                return (
                    <ActionsRow
                        noEdit
                        content="Category"
                        params={params}
                        handleDelete={handleDelete}
                        updateData={updateData}
                        handleUpload={handleUpload}
                    />
                );
            },
        },
    ];

    return (
        <Box m="20px">
            <Toaster position="top-center" reverseOrder={false} />
            <Header title="Orders" subtitle="List of Orders" />
            <DataTable
                rows={orders}
                columns={columns}
                getRowId={(row) => row._id}
                components={{ Toolbar: GridToolbar }}
                disableSelectionOnClick
                loading={orders.length === 0}
                rowHeight={100}
                pageSize={pageSize}
                rowsPerPageOptions={[5, 10, 15, 20]}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                onRowClick={({ row: { orderDetails } }) => handleRowClick(orderDetails)}
                createData={createData}
            />
            <OrderDetailsModal open={open} onClose={() => setOpen(false)} orderDetails={orderDetails} />;
        </Box>
    );
};

export default Orders;
