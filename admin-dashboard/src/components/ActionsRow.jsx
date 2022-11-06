import { useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';

import { tokens } from '../theme';
import EditCategoryModal from './Modals/EditCategoryModal';
import ConfirmDeleteModal from './Modals/ConfirmDeleteModal';

const ActionsRow = ({ params, handleDelete, updateData }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleConfirmDelete = () => {
        handleDelete(params.row._id);
        setOpenDelete(false);
    };

    return (
        <Box display="flex" gap={3}>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: colors.greenAccent[600],
                    ':hover': { backgroundColor: colors.greenAccent[700] },
                }}
                startIcon={<EditOutlined />}
                onClick={() => setOpen(true)}
            >
                <Typography color={colors.grey[100]} ml="5px">
                    Edit
                </Typography>
            </Button>
            <EditCategoryModal open={open} onClose={() => setOpen(false)} params={params} updateData={updateData} />
            <Button
                variant="contained"
                sx={{
                    backgroundColor: colors.redAccent[600],
                    ':hover': { backgroundColor: colors.redAccent[700] },
                }}
                startIcon={<DeleteOutline />}
                onClick={() => setOpenDelete(true)}
            >
                <Typography color={colors.grey[100]} ml="5px">
                    Delete
                </Typography>
            </Button>
            <ConfirmDeleteModal open={openDelete} onClose={() => setOpenDelete(false)} onSubmit={handleConfirmDelete} />
        </Box>
    );
};

export default ActionsRow;
