import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/system';
import { Box, Button, Container, Grid, Input, Typography, useTheme } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import toast, { Toaster } from 'react-hot-toast';

import { tokens } from '../../theme';

function Register() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(true);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        handleRegister(data);
    };

    const handleRegister = async (data) => {
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/register`, data);
            toast.success('Successfully toasted!');
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (error) {
            const errors = error.response.data;
            if (errors.keyPattern.email) {
                setError('email', {
                    type: 'server',
                    message: 'Email already exist',
                });
            }
            if (errors.keyPattern.username) {
                setError('username', {
                    type: 'server',
                    message: 'Username already exist',
                });
            }
        }
    };

    const handleShowPass = () => {
        setShowPassword(!showPassword);
    };

    return (
        <ContainerAuth>
            <Toaster position="top-center" reverseOrder={false} />
            <BoxAuth style={{ backgroundColor: colors.primary[900] }}>
                <div>
                    <Typography variant="h2" textAlign="center">
                        Re<span style={{ color: colors.blueAccent[500] }}>gis</span>ter
                    </Typography>
                    <Typography textAlign="center" variant="h5">
                        It's quick and easy.
                    </Typography>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={5} paddingX={5}>
                        <Grid item xs={12} md={6}>
                            <Input
                                {...register('fullName', { required: true })}
                                placeholder="* Your name is ..."
                                fullWidth
                            />
                            {errors.fullName && (
                                <Typography variant="subtitle2" pt={1} color="red">
                                    Please fill your name!
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Input
                                type="email"
                                {...register('email', { required: true })}
                                placeholder="* Email ..."
                                fullWidth
                            />
                            {errors.email?.type === 'required' && (
                                <Typography variant="subtitle2" pt={1} color="red">
                                    Please fill your email!
                                </Typography>
                            )}
                            {errors.email && (
                                <Typography variant="subtitle2" pt={1} color="red">
                                    {errors.email.message}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Input type="number" {...register('phoneNumber')} placeholder="Phone Number" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Input type="date" {...register('birthday')} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <Input {...register('address', { required: true })} placeholder="* Address ..." fullWidth />
                            {errors.address && (
                                <Typography variant="subtitle2" pt={1} color="red">
                                    Please fill your address!
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Input {...register('username', { required: true })} placeholder="* Username" fullWidth />
                            {errors.username?.type === 'required' && (
                                <Typography variant="subtitle2" pt={1} color="red">
                                    Please fill your username!
                                </Typography>
                            )}
                            {errors.username && (
                                <Typography variant="subtitle2" pt={1} color="red">
                                    {errors.username.message}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', position: 'relative' }}>
                            <Input
                                type={showPassword ? 'password' : 'text'}
                                {...register('password', { required: true, minLength: 6 })}
                                placeholder="* Password"
                                fullWidth
                            />
                            <RemoveRedEyeOutlinedIcon
                                onClick={handleShowPass}
                                sx={{ position: 'absolute', right: 0, cursor: 'pointer' }}
                            />
                        </Grid>
                        {errors.password?.type === 'required' && (
                            <Typography variant="subtitle2" pt={1} pl={5} color="red">
                                Please fill your password!
                            </Typography>
                        )}
                        {errors.password?.type === 'minLength' && (
                            <Typography variant="subtitle2" pt={1} pl={5} color="red">
                                At least 6 characters
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
                                Sign up
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Typography color={colors.blueAccent[500]} component={Link} to="/login">
                    Already have an account!
                </Typography>
            </BoxAuth>
        </ContainerAuth>
    );
}

export default Register;

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
    borderTop: '10px solid #79a6fe',
    borderBottom: '10px solid #8BD17C',
});
