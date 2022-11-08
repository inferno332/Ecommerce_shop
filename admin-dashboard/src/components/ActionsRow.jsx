import { useState } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { DeleteOutline, DescriptionOutlined } from '@mui/icons-material';

import { tokens } from '../theme';
import EditCategoryModal from './Modals/EditCategoryModal';
import ConfirmDeleteModal from './Modals/ConfirmDeleteModal';
import EditCustomerModal from './Modals/EditCustomerModal';
import EditEmployeeModal from './Modals/EditEmployeeModal';

const EditModal = ({ content, ...props }) => {
    switch (content) {
        case 'Category':
            return <EditCategoryModal {...props} />;
        case 'Customer':
            return <EditCustomerModal {...props} />;
        case 'Employee':
            return <EditEmployeeModal {...props} />;
        default:
            return null;
    }
};

const ActionsRow = ({ params, handleDelete, updateData, content }) => {
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
            <IconButton
                sx={{
                    backgroundColor: colors.greenAccent[600],
                    ':hover': { backgroundColor: colors.greenAccent[700] },
                }}
                onClick={() => setOpen(true)}
            >
                <DescriptionOutlined />
            </IconButton>
            <EditModal
                content={content}
                open={open}
                onClose={() => setOpen(false)}
                params={params}
                updateData={updateData}
            />
            <IconButton
                sx={{
                    backgroundColor: colors.redAccent[600],
                    ':hover': { backgroundColor: colors.redAccent[700] },
                }}
                onClick={() => setOpenDelete(true)}
            >
                <DeleteOutline />
            </IconButton>
            <ConfirmDeleteModal open={openDelete} onClose={() => setOpenDelete(false)} onSubmit={handleConfirmDelete} />
        </Box>
    );
};

export default ActionsRow;
