import { Box, Checkbox, FormControlLabel, TextField, useTheme } from '@mui/material';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import BasicModal from '../common/BasicModal';
import { tokens } from '../../theme';

const EditEmployeeModal = ({ open, onClose, updateData, params }) => {
    const defaultInputValues = {
        fullName: params.row.fullName,
        email: params.row.email,
        phoneNumber: params.row.phoneNumber,
        address: params.row.address,
        birthday: params.row.birthday,
        roles : params.row.roles ,
    };
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [employees, setEmployees] = useState(defaultInputValues);

    const handleCheckboxChange = (role) => {
        const newValues =  employees.roles?.includes(role) ? employees.roles?.filter(item => item !== role) : [...employees.roles, role];
        setEmployees({...employees, roles: newValues});
    }

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
        fullName: yup
            .string()
            .required('Employee name is required')
            .min(3, 'Employee name must be at least 3 characters'),
        email: yup.string().required('Employee email is required').email('Employee email must be valid'),
        phoneNumber: yup
            .string()
            .required('Employee phone number is required')
            .min(9, 'Employee phone number must be at least 9 characters'),
        address: yup.string().min(5, 'Employee address must be at least 3 characters'),
        birthday: yup.date().required('Birthday is required'),
        roles: yup.array().of(yup.string()).required('Employee roles are required'),
    });

    const {
        register,
        control,
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
                    defaultValue={params.row._id}
                    disabled
                    name="employeeId"
                    label="Employee ID"
                    {...register('employeeId')}
                />
                <TextField
                    placeholder="Full Name"
                    name="fullName"
                    label="Full Name"
                    defaultValue={params.row.fullName}
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
                    defaultValue={params.row.email}
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
                    defaultValue={params.row.phoneNumber}
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
                    defaultValue={params.row.address}
                    required
                    {...register('address')}
                    error={errors.address ? true : false}
                    helperText={errors.address?.message}
                    onChange={(e) => handleChange({ ...employees, address: e.target.value })}
                />
                <TextField
                    name="birthday"
                    type="date"
                    defaultValue={params.row.birthday}
                    required
                    {...register('birthday')}
                    error={errors.birthday ? true : false}
                    helperText={errors.birthday?.message}
                    onChange={(e) => handleChange({ ...employees, birthday: e.target.value })}
                />
                {['admin','staff','manager'].map((role) => (
                    <FormControlLabel
                        key={role}
                        label={role}
                        control={
                            <Controller 
                                control={control}
                                name={role}
                                render={({ field }) => (
                                    <Checkbox 
                                        {...field}
                                        checked={employees.roles?.includes(role) ? true : false}
                                        onChange={() => handleCheckboxChange(role)}
                                    />
                                )}
                            />
                        }
                    />
                ))}
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
