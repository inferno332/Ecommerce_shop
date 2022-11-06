import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/system';
import { Box, Button, Container, Grid, Input, Typography, useTheme } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import { tokens } from '../../theme';
import { loginUser } from '../../redux/apiRequests';

function Login() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(true);

    const onSubmit = (data) => {
        loginUser(data, dispatch, navigate);
    };

    const handleShowPass = () => {
        setShowPassword(!showPassword);
    };

    return (
        <ContainerAuth>
            <BoxAuth style={{ backgroundColor: colors.primary[900] }}>
                <div>
                    <Typography variant="h2">
                        <span style={{ color: colors.blueAccent[500] }}>Admin </span>Dashboard
                    </Typography>
                    <Typography textAlign="center" variant="h5">
                        Sign in to your account.
                    </Typography>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={5} paddingX={5}>
                        <Grid item xs={12}>
                            <Input {...register('username', { required: true })} placeholder="Username" fullWidth />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', position: 'relative' }}>
                            <Input
                                type={showPassword ? 'password' : 'text'}
                                {...register('password', { required: true })}
                                placeholder="Password"
                                fullWidth
                            />
                            <RemoveRedEyeOutlinedIcon
                                sx={{ position: 'absolute', left: '310px', top: '42px' }}
                                onClick={handleShowPass}
                                style={{ cursor: 'pointer' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                style={{ backgroundColor: colors.blueAccent[500] }}
                            >
                                Sign in
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Typography color={colors.blueAccent[500]} component={Link} to="/register">
                    Don't have an account? Sign up
                </Typography>
            </BoxAuth>
        </ContainerAuth>
    );
}

export default Login;

const ContainerAuth = styled(Container)({
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
});

const BoxAuth = styled(Box)({
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
    width: '25vw',
    height: '600px',
    borderRadius: '10px',
    borderTop: `10px solid #79a6fe`,
    borderBottom: '10px solid #8BD17C',
});
