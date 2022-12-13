import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';

import BasicModal from '../common/BasicModal';
import { tokens } from '../../theme';

const OrderDetailsModal = ({ open, onClose, orderDetails }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const modalStyles = {
        inputFields: {
            backgroundColor: colors.primary[400],
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
            marginBottom: '15px',
            '.MuiFormControl-root': {
                marginBottom: '20px',
            },
            '.Mui-focused': {
                color: colors.greenAccent[500],
            },
        },
    };

    const getContent = () => {
        return (
            <Box sx={modalStyles.inputFields} gap={2}>
                {orderDetails.map((item) => (
                    <Card key={item.name} sx={{ width: '100%' }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" width="100%">
                                <Box display="flex" flexDirection="column">
                                    <Typography variant="h4" color={colors.greenAccent[400]}>
                                        {item.name}
                                    </Typography>
                                    <Box display="flex" mt={2}>
                                        <Box display="flex" flexDirection="column" gap={2}>
                                            <Typography variant="h5">Price:</Typography>
                                            <Typography variant="h5">Quantity:</Typography>
                                            <Typography variant="h5">Size:</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="column" gap={2} ml="10px">
                                            <Typography variant="h5">$ {item.price}</Typography>
                                            <Typography variant="h5" ml="11px">
                                                {item.quantity}
                                            </Typography>
                                            <Typography variant="h5" ml="11px">
                                                {item.size}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <img
                                    src={`http://localhost:9000${item.image}`}
                                    alt={item.name}
                                    style={{
                                        width: 150,
                                        height: 150,
                                        objectFit: 'fill',
                                        borderRadius: '10%',
                                        marginRight: '10px',
                                    }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        );
    };
    return <BasicModal open={open} onClose={onClose} title="Order Details" content={getContent()} />;
};

export default OrderDetailsModal;
