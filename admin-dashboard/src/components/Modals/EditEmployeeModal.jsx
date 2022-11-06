import { Box, Select, TextField, useTheme } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import BasicModal from '../common/BasicModal';
import { tokens } from '../../theme';

const defaultInputValues = {
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    birthday: '',
};

const EditEmployeeModal = ({ open, onClose, updateData, params }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [employees, setEmployees] = useState(defaultInputValues);

    const handleChange = (value) => {
        setEmployees(value);
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
        fullName: yup.string().required('Employee name is required').min(3, 'Employee name must be at least 3 characters'),
        email: yup.string().required('Employee email is required').email('Employee email must be valid'),
        phoneNumber: yup.string().required('Employee phone number is required').min(9, 'Employee phone number must be at least 9 characters'),
        address: yup.string().min(5, 'Employee address must be at least 3 characters'),
        birthday: yup.date().required('Birthday is required'),
        // roles: yup.array().of(yup.string()).required('Employee roles are required').min(1, 'Please select at least one role'),
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
                    placeholder="Employee ID"
                    disabled
                    name="employeeId"
                    label="Employee ID"
                    {...register('employeeId')}
                    value={params.row._id}
                />
                <TextField
                    placeholder="Full Name"
                    name="fullName"
                    label="Full Name"
                    required
                    {...register('fullName')}
                    error={errors.fullName ? true : false}
                    helperText={errors.fullName?.message}
                    onChange={(e) => handleChange({ ...employees, fullName: e.target.value })}
                />
                <TextField
                    placeholder="Email"
                    name="email"
                    label="Email"
                    required
                    {...register('email')}
                    error={errors.email ? true : false}
                    helperText={errors.email?.message}
                    onChange={(e) => handleChange({ ...employees, email: e.target.value })}
                />
                <TextField
                    placeholder="Phone Number"
                    name="phoneNumber"
                    label="Phone Number"
                    required
                    {...register('phoneNumber')}
                    error={errors.phoneNumber ? true : false}
                    helperText={errors.phoneNumber?.message}
                    onChange={(e) => handleChange({ ...employees, phoneNumber: e.target.value })}
                />
                <TextField
                    placeholder="Address"
                    name="address"
                    label="Address"
                    required
                    {...register('address')}
                    error={errors.address ? true : false}
                    helperText={errors.address?.message}
                    onChange={(e) => handleChange({ ...employees, address: e.target.value })}
                />
                <TextField
                    name="birthday"
                    type='date'
                    required
                    {...register('birthday')}
                    error={errors.birthday ? true : false}
                    helperText={errors.birthday?.message}
                    onChange={(e) => handleChange({ ...employees, birthday: e.target.value })}
                />
                {/* <Select
                    placeholder="Roles"
                    name="roles"
                    type='date'
                    value={employees.roles}
                    required
                    {...register('roles')}
                    onChange={(e) => handleChange({ ...employees, roles: e.target.value })}
                >
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                </Select> */}
            </Box>
        );
    };
    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title="Employees"
            subTitle="Edit employee details"
            content={getContent()}
            onSubmit={handleSubmit(() => {
                try {
                    console.log(employees);
                    updateData(employees, params);
                    onClose();
                } catch (error) {
                    console.log(error);
                }
            })}
        />
    );
};

export default EditEmployeeModal;
