import { Box, TextField, useTheme } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import BasicModal from '../../components/common/BasicModal';
import { tokens } from '../../theme';
import moment from 'moment';

const EditCustomerModal = ({ open, onClose, updateData, params }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const defaultInputValues = {
        firstName: params.row.firstName,
        lastName: params.row.lastName,
        email: params.row.email,
        phoneNumber: params.row.phoneNumber,
        address: params.row.address,
        birthday: moment(params.row.birthday).format('YYYY-MM-DD'),
    };

    const [customer, setCustomer] = useState(defaultInputValues);

    const handleChange = (value) => {
        setCustomer(value);
    };

    const modalStyles = {
        inputFields: {
            backgroundColor: colors.primary[400],
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
            marginBottom: '15px',
            '.MuiFormControl-root': {
                marginBottom: '20px',
            },
        },
    };

    const validationSchema = yup.object().shape({
        firstName: yup.string().required('First name is required').min(3, 'First name must be at least 3 characters'),
        lastName: yup.string().required('Last name is required').min(3, 'Last name must be at least 3 characters'),
        email: yup.string().required('Email is required').email('Email is invalid'),
        phoneNumber: yup
            .string()
            .required('Phone number is required')
            .min(9, 'Phone number must be at least 9 characters'),
        address: yup.string().required('Address is required').min(10, 'Address must be at least 10 characters'),
        birthday: yup.date().required('Birthday is required').max(new Date(), 'Birthday must be in the past'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const getContent = () => {
        return (
            <Box sx={modalStyles.inputFields}>
                <TextField
                    placeholder="Customer ID"
                    disabled
                    name="customerId"
                    label="Customer ID"
                    defaultValue={params.row._id}
                />
                <TextField
                    placeholder="First Name"
                    name="firstName"
                    label="First Name"
                    required
                    defaultValue={params.row.firstName}
                    {...register('firstName')}
                    error={errors.firstName ? true : false}
                    helperText={errors.firstName?.message}
                    onChange={(e) => handleChange({ ...customer, firstName: e.target.value })}
                />
                <TextField
                    placeholder="Last Name"
                    name="lastName"
                    label="Last Name"
                    required
                    defaultValue={params.row.lastName}
                    {...register('lastName')}
                    error={errors.lastName ? true : false}
                    helperText={errors.lastName?.message}
                    onChange={(e) => handleChange({ ...customer, lastName: e.target.value })}
                />
                <TextField
                    placeholder="Email"
                    name="email"
                    label="Email"
                    required
                    defaultValue={params.row.email}
                    {...register('email')}
                    error={errors.email ? true : false}
                    helperText={errors.email?.message}
                    onChange={(e) => handleChange({ ...customer, email: e.target.value })}
                />
                <TextField
                    placeholder="Phone Number"
                    name="phoneNumber"
                    label="Phone Number"
                    required
                    defaultValue={params.row.phoneNumber}
                    {...register('phoneNumber')}
                    error={errors.phoneNumber ? true : false}
                    helperText={errors.phoneNumber?.message}
                    onChange={(e) => handleChange({ ...customer, phoneNumber: e.target.value })}
                />
                <TextField
                    placeholder="Address"
                    name="address"
                    label="Address"
                    required
                    defaultValue={params.row.address}
                    {...register('address')}
                    error={errors.address ? true : false}
                    helperText={errors.address?.message}
                    onChange={(e) => handleChange({ ...customer, address: e.target.value })}
                />
                <TextField
                    name="birthday"
                    type="date"
                    required
                    defaultValue={moment(params.row.birthday).format('YYYY-MM-DD')}
                    {...register('birthday')}
                    error={errors.birthday ? true : false}
                    helperText={errors.birthday?.message}
                    onChange={(e) => handleChange({ ...customer, birthday: e.target.value })}
                />
            </Box>
        );
    };
    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title="Customer"
            subTitle="Edit customer details"
            content={getContent()}
            onSubmit={handleSubmit(() => {
                try {
                    updateData(customer, params);
                    onClose();
                } catch (error) {
                    console.log(error);
                }
            })}
        />
    );
};

export default EditCustomerModal;
