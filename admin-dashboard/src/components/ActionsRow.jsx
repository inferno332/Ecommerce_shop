import { useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';

import { tokens } from '../theme';
import EditCategoryModal from './Modals/EditCategoryModal';

const ActionsRow = ({ params, handleDelete }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [open, setOpen] = useState(false);

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
                <EditCategoryModal open={open} onClose={() => setOpen(false)} />
            </Button>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: colors.redAccent[600],
                    ':hover': { backgroundColor: colors.redAccent[700] },
                }}
                startIcon={<DeleteOutline />}
                onClick={() => handleDelete(params.row._id)}
            >
                <Typography color={colors.grey[100]} ml="5px">
                    Delete
                </Typography>
            </Button>
        </Box>
    );
};

export default ActionsRow;
