import { useState } from 'react';
import { AddCircleOutline } from '@mui/icons-material';
import { Box, Typography, useTheme } from '@mui/material';
import { GridFooter, GridFooterContainer } from '@mui/x-data-grid';

import { tokens } from '../theme';
import CreateCategoryModal from './Modals/CreateCategoryModal';
import CreateProductModal from './Modals/CreateProductModal';

const CreateModal = ({ content, ...props }) => {
    switch (content) {
        case 'Category':
            return <CreateCategoryModal {...props} />;
        case 'Product':
            return <CreateProductModal {...props} />;
        // case 'Employee':
        //     return <CreateEmployeeModal {...props} />;
        // case 'Customer':
        //     return <CreateCustomerModal {...props} />;
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
            <CreateModal
                content={content}
                open={open}
                onClose={() => setOpen(false)}
                createData={createData}
                {...props}
            />
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
                <AddCircleOutline fontSize="large" />
                <Typography fontSize="16px">Create</Typography>
            </Box>
            <GridFooter />
        </GridFooterContainer>
    );
};

export default FooterCreateButton;
