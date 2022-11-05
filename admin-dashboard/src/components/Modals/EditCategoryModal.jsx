import { Box, TextField, useTheme } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

import BasicModal from '../common/BasicModal';
import { tokens } from '../../theme';

const defaultInputValues = {
    name: '',
    description: '',
};

const EditCategoryModal = ({ open, onClose, editUser }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [id,setId] = useState('');
    const [category, setCategory] = useState(defaultInputValues);

    const updateUser = (data) => {
        axios.put(`http://localhost:9000/categories/${id}`, data).then(res => {console.log(res.data)}).catch(err => {console.log(err)});
        console.log(data);
    };

    const handleChange = (value) => {
        setCategory(value);
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
        categoryId: yup
            .string()
            .required('Category ID is required')
            .min(6, 'Category ID must be at least 6 characters'),
        name: yup
            .string()
            .required('Category name is required')
            .min(3, 'Category name must be at least 3 characters'),
        description: yup
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
                    onChange={(e) => handleChange(()=>{setId(e.target.value)}) }
                />
                <TextField
                    placeholder="Category Name"
                    name="name"
                    label="Category Name"
                    required
                    {...register('name')}
                    error={errors.name ? true : false}
                    helperText={errors.name?.message}
                    onChange={(e) => handleChange({ ...category, name: e.target.value })}
                />
                <TextField
                    placeholder="Category Description"
                    name="description"
                    label="Category Description"
                    required
                    {...register('description')}
                    error={errors.description ? true : false}
                    helperText={errors.description?.message}
                    onChange={(e) => handleChange({ ...category, description: e.target.value })}
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
            onSubmit={handleSubmit(() => {
                try {
                    updateUser(category);
                    onClose();
                } catch (error) {
                    console.log(error);
                }
            })}
        ></BasicModal>
    );
};

export default EditCategoryModal;
