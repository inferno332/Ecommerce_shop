import { Box, InputAdornment, MenuItem, OutlinedInput, TextField, useTheme } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import BasicModal from '../common/BasicModal';
import { tokens } from '../../theme';

const EditProductModal = ({ open, onClose, updateData, params, suppliers, categories, handleUpload }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const defaultInputValues = {
        name: params.row.name,
        description: params.row.description,
        price: params.row.price,
        stock: params.row.stock,
        discount: params.row.discount,
        categoryId: params.row.categoryId,
        supplierId: params.row.supplierId,
    };

    const [products, setProducts] = useState(defaultInputValues);

    const handleChange = (value) => {
        setProducts(value);
        console.log(value);
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
            '.Mui-focused': {
                color: colors.greenAccent[500],
            },
        },
    };

    const validationSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        description: yup.string().required('Description is required'),
        price: yup.number().required('Price is required'),
        stock: yup.number().required('Stock is required').integer('Stock must be an integer'),
        discount: yup.number().required('Discount is required').max(100, 'Discount must be less than 100'),
        categoryId: yup.string().required('Category is required'),
        supplierId: yup.string().required('Supplier is required'),
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
                <TextField placeholder="Product ID" defaultValue={params.row._id} disabled label="Product ID" />
                <TextField
                    placeholder="Name"
                    name="name"
                    label="Name"
                    defaultValue={params.row.name}
                    required
                    {...register('name')}
                    error={errors.name ? true : false}
                    helperText={errors.name?.message}
                    onChange={(e) => handleChange({ ...products, name: e.target.value })}
                />
                <TextField
                    placeholder="Description"
                    name="description"
                    label="Description"
                    defaultValue={params.row.description}
                    required
                    {...register('description')}
                    error={errors.description ? true : false}
                    helperText={errors.description?.message}
                    onChange={(e) => handleChange({ ...products, description: e.target.value })}
                />
                <OutlinedInput
                    sx={{ mb: '20px' }}
                    placeholder="Price"
                    type="number"
                    id="outlined-adornment-amount"
                    name="price"
                    startAdornment={<InputAdornment position="start">Amount ($)</InputAdornment>}
                    defaultValue={params.row.price}
                    required
                    {...register('price')}
                    error={errors.price ? true : false}
                    onChange={(e) => handleChange({ ...products, price: e.target.value })}
                />
                <TextField
                    placeholder="Stock"
                    type="number"
                    name="stock"
                    label="Stock"
                    defaultValue={params.row.stock}
                    required
                    {...register('stock')}
                    error={errors.stock ? true : false}
                    helperText={errors.stock?.message}
                    onChange={(e) => handleChange({ ...products, stock: e.target.value })}
                />
                <TextField
                    placeholder="Discount"
                    type="number"
                    name="discount"
                    label="Discount"
                    defaultValue={params.row.discount}
                    required
                    {...register('discount')}
                    error={errors.discount ? true : false}
                    helperText={errors.discount?.message}
                    onChange={(e) => handleChange({ ...products, discount: e.target.value })}
                />
                <Box display="flex" gap={2}>
                    <TextField
                        sx={{ flex: 1 }}
                        placeholder="Category"
                        name="categoryId"
                        required
                        {...register('categoryId')}
                        error={errors.categoryId ? true : false}
                        helperText={errors.categoryId?.message}
                        select
                        label="Category"
                        value={products.categoryId}
                        onChange={(e) => handleChange({ ...products, categoryId: e.target.value })}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category._id} value={category._id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        sx={{ flex: 1 }}
                        placeholder="Supplier"
                        name="supplierId"
                        required
                        {...register('supplierId')}
                        error={errors.supplierId ? true : false}
                        helperText={errors.supplierId?.message}
                        select
                        label="Supplier"
                        value={products.supplierId}
                        onChange={(e) => handleChange({ ...products, supplierId: e.target.value })}
                    >
                        {suppliers.map((supplier) => (
                            <MenuItem key={supplier._id} value={supplier._id}>
                                {supplier.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <input
                    type="file"
                    name="uploadImg"
                    {...register('uploadImg')}
                    accept="image/png, image/jpeg"
                    multiple
                    onChange={(e) => handleUpload(params, e)}
                />
            </Box>
        );
    };
    
    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title="Product"
            subTitle="Edit product details"
            content={getContent()}
            onSubmit={handleSubmit(() => {
                try {
                    console.log(products);
                    updateData(products, params);
                    onClose();
                } catch (error) {
                    console.log(error);
                }
            })}
        />
    );
};

export default EditProductModal;
