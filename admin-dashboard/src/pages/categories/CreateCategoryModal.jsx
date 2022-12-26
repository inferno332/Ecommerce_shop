import { Box, TextField, useTheme } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import BasicModal from '../../components/common/BasicModal';
import { tokens } from '../../theme';

const CreateCategoryModal = ({ open, onClose, createData }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const defaultInputValues = {
        name: '',
        description: '',
    };

    const [category, setCategory] = useState(defaultInputValues);

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
        name: yup.string().required('Category name is required').min(3, 'Category name must be at least 3 characters'),
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
                    placeholder="Category Name"
                    name="name"
                    label="Category Name"
                    required
                    {...register('name')}
                    error={errors.name ? true : false}
                    helperText={errors.name?.message}
                    defaultValue=""
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
                    defaultValue=""
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
            subTitle="Add category"
            content={getContent()}
            onSubmit={handleSubmit(() => {
                try {
                    createData(category);
                    onClose();
                } catch (error) {
                    console.log(error);
                }
            })}
        />
    );
};

export default CreateCategoryModal;
