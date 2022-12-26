import { Box, Typography } from '@mui/material';
import React from 'react';

import BasicModal from './common/BasicModal';

const ConfirmDeleteModal = ({ open, onClose, onSubmit }) => {
    const getContent = () => {
        return (
            <Box>
                <Typography paddingBottom={5} variant="h4">
                    Are you sure you want to delete this? This action cannot be undone.
                </Typography>
            </Box>
        );
    };
    return <BasicModal open={open} onClose={onClose} onSubmit={onSubmit} content={getContent()} deleteBtn />;
};

export default ConfirmDeleteModal;
