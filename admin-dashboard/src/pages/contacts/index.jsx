import { useState } from 'react';
import { Box } from '@mui/material';
import { GridToolbar } from '@mui/x-data-grid';
import { mockDataContacts } from '../../data/mockData';

import DataTable from '../../components/DataTable';
import Header from '../../components/Header';

function Contacts() {
    const [pageSize, setPageSize] = useState(10);

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'registrarId', headerName: 'REGISTRAR ID' },
        { field: 'name', headerName: 'NAME', flex: 1, cellClassName: 'name-column--cell' },
        { field: 'age', headerName: 'AGE', type: 'number', headerAlign: 'left', align: 'left' },
        { field: 'phone', headerName: 'PHONE NUMBER', flex: 1 },
        { field: 'email', headerName: 'EMAIL', flex: 1 },
        { field: 'address', headerName: 'ADDRESS', flex: 1 },
        { field: 'city', headerName: 'CITY', flex: 1 },
        { field: 'zipCode', headerName: 'ZIPCODE', flex: 1 },
    ];

    return (
        <Box m="20px">
            <Header title="CONTACTS" subtitle="List of contacts" />
            <DataTable
                rows={mockDataContacts}
                columns={columns}
                styling
                components={{ Toolbar: GridToolbar }}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 15, 20]}
            />
        </Box>
    );
}

export default Contacts;
