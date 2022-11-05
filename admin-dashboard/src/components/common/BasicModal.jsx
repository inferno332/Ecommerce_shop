import React from 'react';
import { Box, Button, Modal, Typography, useTheme } from '@mui/material';

import { tokens } from '../../theme';

const BasicModal = ({ open, onClose, title, subTitle, content, onSubmit }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const wrapper = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: colors.primary[400],
        boxShadow: 24,
        p: 4,
    };
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={wrapper}>
                <Typography variant="h6" component="h2">
                    {title}
                </Typography>
                <Typography sx={{ mt: 2 }}>{subTitle}</Typography>
                {content}
                <Box gap={2} sx={{ display: 'flex' }}>
                    <Button
                        sx={{ bgcolor: colors.blueAccent[600], '&:hover': { bgcolor: colors.blueAccent[500] } }}
                        variant="contained"
                        onClick={onSubmit}
                    >
                        <Typography variant="h6" color={colors.grey[100]}>
                            Submit
                        </Typography>
                    </Button>
                    <Button sx={{ '&:hover': { opacity: 0.8 } }} onClick={onClose}>
                        <Typography variant="h6" color={colors.grey[100]}>
                            Cancel
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default BasicModal;
