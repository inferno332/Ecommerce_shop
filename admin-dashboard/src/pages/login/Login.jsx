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
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();
    const [showPassword, setShowPassword] = useState(true);

    const onSubmit = (data) => {
        loginUser(data, dispatch, navigate, setError);
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
                            {errors.username && (
                                <Typography variant="subtitle2" pt={1} color="red">
                                    Please fill your username!
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', position: 'relative' }}>
                            <Input
                                type={showPassword ? 'password' : 'text'}
                                {...register('password', { required: true, minLength: 6 })}
                                placeholder="Password"
                                fullWidth
                            />
                            <RemoveRedEyeOutlinedIcon
                                sx={{ position: 'absolute', right: 0, cursor: 'pointer' }}
                                onClick={handleShowPass}
                            />
                        </Grid>
                        {errors.password && (
                            <Typography variant="subtitle2" pt={1} pl={5} color="red">
                                {errors.password.message}
                            </Typography>
                        )}
                        {errors.password?.type === 'minLength' && (
                            <Typography variant="subtitle2" pt={1} color="red">
                                Atleat 6 characters
                            </Typography>
                        )}
                        {errors.password?.type === 'required' && (
                            <Typography variant="subtitle2" pt={1} color="red">
                                Please fill your password!
                            </Typography>
                        )}
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
    minWidth: '25vw',
    minHeight: '600px',
    borderRadius: '10px',
    borderTop: `10px solid #79a6fe`,
    borderBottom: '10px solid #8BD17C',
});
