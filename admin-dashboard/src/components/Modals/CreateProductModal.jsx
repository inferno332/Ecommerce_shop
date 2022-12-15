import {
    Box,
    Button,
    InputAdornment,
    MenuItem,
    OutlinedInput,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import BasicModal from '../common/BasicModal';
import { tokens } from '../../theme';
import { DeleteOutline } from '@mui/icons-material';

const CreateProductModal = ({ open, onClose, suppliers, categories, createData }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const defaultInputValues = {
        name: '',
        description: '',
        price: '',
        sizes: [],
        categoryId: '',
        supplierId: '',
    };

    const [products, setProducts] = useState(defaultInputValues);

    const handleChange = (value) => {
        setProducts(value);
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
        name: yup.string().required('Name is required'),
        description: yup.string().required('Description is required'),
        price: yup.number().required('Price is required'),
        sizes: yup
            .array(
                yup.object().shape({
                    name: yup.string().required('Size name is required'),
                    discount: yup.number().required('Discount is required'),
                    stock: yup.number().required('Stock is required'),
                }),
            )
            .required('Size is required'),
        categoryId: yup.string().required('Category is required'),
        supplierId: yup.string().required('Supplier is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: defaultInputValues,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'sizes',
    });

    const getContent = () => {
        return (
            <Box sx={modalStyles.inputFields}>
                <TextField
                    placeholder="Name"
                    name="name"
                    label="Name"
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
                    required
                    {...register('price')}
                    error={errors.price ? true : false}
                    onChange={(e) => handleChange({ ...products, price: e.target.value })}
                />
                {/* Sizes */}
                {fields.map((field, index) => (
                    <Box key={field.id} display="flex" gap={2}>
                        <TextField
                            {...register(`sizes.${index}.name`)}
                            error={errors.sizes?.[index]?.name ? true : false}
                            helperText={errors.sizes?.[index]?.name?.message}
                            placeholder="Size name"
                            name={`sizes.${index}.name`}
                            label="Size name"
                            onChange={(e) =>
                                handleChange({
                                    ...products,
                                    sizes: products.sizes.map((size, i) =>
                                        i === index ? { ...size, name: e.target.value } : size,
                                    ),
                                })
                            }
                        />
                        <TextField
                            {...register(`sizes.${index}.discount`)}
                            error={errors.sizes?.[index]?.discount ? true : false}
                            helperText={errors.sizes?.[index]?.discount?.message}
                            type="number"
                            placeholder="Discount"
                            name={`sizes.${index}.discount`}
                            label="Discount"
                            onChange={(e) =>
                                handleChange({
                                    ...products,
                                    sizes: products.sizes.map((size, i) =>
                                        i === index ? { ...size, discount: parseInt(e.target.value) } : size,
                                    ),
                                })
                            }
                        />
                        <TextField
                            {...register(`sizes.${index}.stock`)}
                            error={errors.sizes?.[index]?.stock ? true : false}
                            helperText={errors.sizes?.[index]?.stock?.message}
                            type="number"
                            placeholder="Stock"
                            name={`sizes.${index}.stock`}
                            label="Stock"
                            onChange={(e) =>
                                handleChange({
                                    ...products,
                                    sizes: products.sizes.map((size, i) =>
                                        i === index ? { ...size, stock: parseInt(e.target.value) } : size,
                                    ),
                                })
                            }
                        />
                        <span
                            style={{ cursor: 'pointer', color: colors.redAccent[500], marginTop: '18px' }}
                            onClick={() => {
                                remove(index);
                                setProducts({
                                    ...products,
                                    sizes: products.sizes.filter((size, i) => i !== index),
                                });
                            }}
                        >
                            <DeleteOutline />
                        </span>
                    </Box>
                ))}
                <Button
                    sx={{
                        bgcolor: colors.blueAccent[600],
                        marginBottom: '20px',
                        '&:hover': { bgcolor: colors.blueAccent[500] },
                    }}
                    variant="contained"
                    onClick={() => {
                        setProducts({ ...products, sizes: [...products.sizes, { name: '', discount: '', stock: '' }] });
                        append({ name: '', discount: '', stock: '' });
                    }}
                    type="submit"
                >
                    <Typography variant="h6" color={colors.grey[100]}>
                        Append
                    </Typography>
                </Button>
                {/* End Sizes */}
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
            </Box>
        );
    };

    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title="Product"
            subTitle="Add product"
            content={getContent()}
            onSubmit={handleSubmit(() => {
                try {
                    console.log(products);
                    createData(products);
                    onClose();
                } catch (error) {
                    console.log(error);
                }
            })}
        />
    );
};

export default CreateProductModal;
