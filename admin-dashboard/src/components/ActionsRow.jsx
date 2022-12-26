import { useState } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { DeleteOutline, DescriptionOutlined } from '@mui/icons-material';

import { tokens } from '../theme';
import EditCategoryModal from '../pages/categories/EditCategoryModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import EditCustomerModal from '../pages/customers/EditCustomerModal';
import EditEmployeeModal from '../pages/employees/EditEmployeeModal';
import EditProductModal from '../pages/products/EditProductModal';

const EditModal = ({ content, ...props }) => {
    switch (content) {
        case 'Category':
            return <EditCategoryModal {...props} />;
        case 'Customer':
            return <EditCustomerModal {...props} />;
        case 'Employee':
            return <EditEmployeeModal {...props} />;
        case 'Product':
            return <EditProductModal {...props} />;
        default:
            return null;
    }
};

const ActionsRow = ({
    params,
    handleDelete,
    updateData,
    content,
    noEdit = false,
    handleUpload,
    disableEdit = false,
    disableDelete = false,
    ...props
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleConfirmDelete = () => {
        handleDelete(params.row._id);
        setOpenDelete(false);
    };

    return (
        <Box display="flex" justifyContent={'center'} gap={2} overflow="hidden">
            <EditModal
                content={content}
                open={open}
                onClose={() => setOpen(false)}
                params={params}
                updateData={updateData}
                handleUpload={handleUpload}
                {...props}
            />
            <IconButton
                sx={{
                    backgroundColor: colors.greenAccent[500],
                    ':hover': { backgroundColor: colors.greenAccent[600] },
                    '&:disabled': { backgroundColor: colors.greenAccent[500], opacity: 0.5 },
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(true);
                }}
                disabled={disableEdit}
            >
                <DescriptionOutlined sx={{ color: '#000' }} />
            </IconButton>
            <IconButton
                sx={{
                    backgroundColor: colors.redAccent[600],
                    ':hover': { backgroundColor: colors.redAccent[700] },
                    '&:disabled': { backgroundColor: colors.redAccent[600], opacity: 0.5 },
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    setOpenDelete(true);
                }}
                disabled={disableDelete}
            >
                <DeleteOutline />
            </IconButton>
            <ConfirmDeleteModal open={openDelete} onClose={() => setOpenDelete(false)} onSubmit={handleConfirmDelete} />
        </Box>
    );
};

export default ActionsRow;
