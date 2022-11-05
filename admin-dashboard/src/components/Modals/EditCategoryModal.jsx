import { Box, TextField,useTheme } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import BasicModal from '../common/BasicModal';
import { tokens } from '../../theme';

const EditCategoryModal = ({ open, onClose }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

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
        categoryId: yup
            .string()
            .required('Category ID is required')
            .min(6, 'Category ID must be at least 6 characters'),
        categoryName: yup
            .string()
            .required('Category name is required')
            .min(3, 'Category name must be at least 3 characters'),
        categoryDescription: yup
            .string()
            .required('Category description is required')
            .min(10, 'Category description must be at least 10 characters'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const editUser = (data) => {
        console.log(data);
    };

    const getContent = () => {
        return (
            <Box sx={modalStyles.inputFields}>
                <TextField
                    placeholder="Category ID"
                    name="categoryId"
                    label="Category ID"
                    required
                    {...register('categoryId')}
                    error={errors.categoryId ? true : false}
                    helperText={errors.categoryId?.message}
                />
                <TextField
                    placeholder="Category Name"
                    name="categoryName"
                    label="Category Name"
                    required
                    {...register('categoryName')}
                    error={errors.categoryName ? true : false}
                    helperText={errors.categoryName?.message}
                />
                <TextField
                    placeholder="Category Description"
                    name="categoryDescription"
                    label="Category Description"
                    required
                    {...register('categoryDescription')}
                    error={errors.categoryDescription ? true : false}
                    helperText={errors.categoryDescription?.message}
                />
            </Box>
        );
    };
    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title="Category"
            subTitle="Edit category details"
            content={getContent()}
            onSubmit={handleSubmit(editUser)}
        ></BasicModal>
    );
};

export default EditCategoryModal;
