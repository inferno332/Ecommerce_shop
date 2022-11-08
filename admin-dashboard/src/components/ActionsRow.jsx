import { useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { DeleteOutline, DescriptionOutlined } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';

import { tokens } from '../theme';
import EditCategoryModal from './Modals/EditCategoryModal';
import ConfirmDeleteModal from './Modals/ConfirmDeleteModal';
import EditCustomerModal from './Modals/EditCustomerModal';
import EditEmployeeModal from './Modals/EditEmployeeModal';

const EditModal = ({content, ...props}) => {
    switch(content) {
        case 'Category':
            return <EditCategoryModal {...props}/>;
        case 'Customer':
            return <EditCustomerModal {...props}/>;
        case 'Employee':
            return <EditEmployeeModal {...props}/>
        default:
            return null;
    }
}

const ActionsRow = ({ params, handleDelete, updateData, content }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    const handleConfirmDelete = () => {
        handleDelete(params.row._id);
        setOpenDelete(false);
    };

    return (
        <Box display="flex" gap={3} overflow="hidden">
            <Button
                variant="contained"
                sx={{
                    backgroundColor: colors.greenAccent[600],
                    ':hover': { backgroundColor: colors.greenAccent[700] },
                }}
                startIcon={<DescriptionOutlined />}
                onClick={() => setOpen(true)}
            >
                {!mdDown && <Typography color={colors.grey[100]}>
                    Edit
                </Typography>}
            </Button>
            <EditModal content={content} open={open} onClose={() => setOpen(false)} params={params} updateData={updateData} />
            <Button
                variant="contained"
                sx={{
                    backgroundColor: colors.redAccent[600],
                    ':hover': { backgroundColor: colors.redAccent[700] },
                    
                }}
                startIcon={<DeleteOutline />}
                onClick={() => setOpenDelete(true)}
            >
                {!mdDown && <Typography color={colors.grey[100]}>
                    Delete
                </Typography>}
            </Button>
            <ConfirmDeleteModal open={openDelete} onClose={() => setOpenDelete(false)} onSubmit={handleConfirmDelete} />
        </Box>
    );
};

export default ActionsRow;
