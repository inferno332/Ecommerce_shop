import { Box, ImageList, ImageListItem, ImageListItemBar, TextField, useTheme } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import BasicModal from '../../components/common/BasicModal';
import { tokens } from '../../theme';

const EditCategoryModal = ({ open, onClose, updateData, params, handleUpload }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const defaultInputValues = {
        name: params.row.name,
        description: params.row.description,
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
        name: yup
            .string()
            .required('Category name is required')
            .min(3, 'Category name must be at least 3 characters')
            .max(20, 'Category name must be at most 20 characters'),
        description: yup
            .string()
            .required('Category description is required')
            .min(10, 'Category description must be at least 10 characters')
            .max(100, 'Category description must be at most 100 characters'),
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
                    disabled
                    name="categoryId"
                    label="Category ID"
                    {...register('categoryId')}
                    defaultValue={params.row._id}
                />
                <TextField
                    placeholder="Category Name"
                    name="name"
                    label="Category Name"
                    required
                    {...register('name')}
                    error={errors.name ? true : false}
                    helperText={errors.name?.message}
                    defaultValue={params.row.name}
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
                    defaultValue={params.row.description}
                    onChange={(e) => handleChange({ ...category, description: e.target.value })}
                />
                <input
                    type="file"
                    name="uploadImg"
                    {...register('uploadImg')}
                    accept="image/png, image/jpeg"
                    multiple
                    onChange={(e) => handleUpload(params, e)}
                />
                {params.row.imageUrl && (
                    <ImageList variant="masonry" cols={3} gap={6} rowHeight={150} sx={{ width: 600, height: 200 }}>
                        <ImageListItem cols={1} rows={1}>
                            <img
                                src={`${process.env.REACT_APP_BASE_URL}/${params.row.imageUrl}`}
                                alt=""
                                loading="lazy"
                            />
                            <ImageListItemBar title={params.row.name} position="bottom" />
                        </ImageListItem>
                    </ImageList>
                )}
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
                    updateData(category, params);
                    onClose();
                } catch (error) {
                    console.log(error);
                }
            })}
        />
    );
};

export default EditCategoryModal;
