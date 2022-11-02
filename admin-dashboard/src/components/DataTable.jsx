import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../theme';

const DataTable = ({styling = false, ...passProps }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const props = {...passProps}
    return styling ? (
        <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
                '& .MuiDataGrid-root .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-root .MuiDataGrid-cell:focus': { outline: 'none !important' },
                '& .MuiDataGrid-root': { border: 'none' },
                '& .MuiDataGrid-cell': { borderTop: 'none' },
                '& .name-column--cell': { color: colors.greenAccent[300] },
                '& .MuiDataGrid-columnHeaders': { backgroundColor: colors.blueAccent[700], borderBottom: 'none' },
                '& .MuiDataGrid-footerContainer': { backgroundColor: colors.blueAccent[700], borderTop: 'none' },
                '& .MuiDataGrid-virtualScroller': { backgroundColor: colors.primary[400] },
                '& .MuiDataGrid-toolbarContainer .MuiButton-text': { color: `${colors.grey[100]} !important` },
            }}
        >
            <DataGrid {...props}  />
        </Box>
    ) : (
        <Box m="40px 0 0 0" height="75vh">
            <DataGrid {...props}  />
        </Box>
    );
};

export default DataTable;
