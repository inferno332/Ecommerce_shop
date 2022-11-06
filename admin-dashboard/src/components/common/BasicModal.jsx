import { Box, Button, IconButton, Modal, Typography, useTheme } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';

import { tokens } from '../../theme';

const BasicModal = ({ open, onClose, title, subTitle, content, onSubmit, deleteBtn = false }) => {
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
                <IconButton
                    sx={{ position: 'absolute', top: 5, right: 5, padding: '10px  ' }}
                    aria-label="close"
                    onClick={onClose}
                >
                    <CloseOutlined />
                </IconButton>
                <Typography variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography sx={{ mt: 2 }}>{subTitle}</Typography>
                {content}
                <Box gap={2} display="flex" flexDirection="row-reverse">
                    {deleteBtn ? (
                        <Button
                            sx={{ bgcolor: colors.redAccent[600], '&:hover': { bgcolor: colors.redAccent[500] } }}
                            variant="contained"
                            onClick={onSubmit}
                        >
                            <Typography variant="h6" color={colors.grey[100]}>
                                Delete
                            </Typography>
                        </Button>
                    ) : (
                        <Button
                            sx={{ bgcolor: colors.blueAccent[600], '&:hover': { bgcolor: colors.blueAccent[500] } }}
                            variant="contained"
                            onClick={onSubmit}
                        >
                            <Typography variant="h6" color={colors.grey[100]}>
                                Submit
                            </Typography>
                        </Button>
                    )}
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
