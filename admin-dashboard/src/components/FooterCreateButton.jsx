import { AddCircleOutline } from '@mui/icons-material';
import { Box, Typography, useTheme } from '@mui/material';
import { GridFooter, GridFooterContainer } from '@mui/x-data-grid';
import { useState } from 'react';

import { tokens } from '../theme';
import CreateCategoryModal from './Modals/CreateCategoryModal';

const CreateModal = ({ content, ...props }) => {
    switch (content) {
        case 'Category':
            return <CreateCategoryModal {...props} />;
        default:
            return null;
    }
};
const FooterCreateButton = ({ createData, content, ...props }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [open, setOpen] = useState(false);

    return (
        <GridFooterContainer>
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    p: '10px',
                    alignItems: 'center',
                    mx: 'auto',
                    borderRadius: '5px',
                    ':hover': { cursor: 'pointer', backgroundColor: colors.greenAccent[600] },
                }}
                onClick={() => setOpen(true)}
            >
                <CreateModal
                    open={open}
                    onClose={() => setOpen(false)}
                    content={content}
                    createData={createData}
                    {...props}
                />
                <AddCircleOutline fontSize="large" />
                <Typography fontSize="16px">Create</Typography>
            </Box>
            <GridFooter />
        </GridFooterContainer>
    );
};

export default FooterCreateButton;
