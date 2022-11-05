import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/system';
import { Box, Button, Container, Grid, Input, Typography } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

function Register() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        handleRegister(data);
    };

    const handleRegister = async (data) => {
        await axios.post('http://localhost:9000/auth/register', data);
        navigate('/login');
    };

    const handleShowPass = () => {
        setShowPassword(!showPassword);
    };

    return (
        <ContainerAuth>
            <BoxAuth>
                <div>
                    <Typography variant="h2" textAlign="center">
                        Re<span style={{ color: '#5c6bc0' }}>gis</span>ter
                    </Typography>
                    <Typography textAlign="center" variant="h5">
                        It's quick and easy.
                    </Typography>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={5} paddingX={5}>
                        <Grid item xs={6}>
                            <Input
                                {...register('name', { required: true })}
                                placeholder="* Your name is ..."
                                fullWidth
                            />
                            {errors.name && (
                                <Typography variant="subtitle2" pt={1} color="red">
                                    Please fill your name!
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <Input
                                type="email"
                                {...register('email', { required: true })}
                                placeholder="* Email ..."
                                fullWidth
                            />
                            {errors.email && (
                                <Typography variant="subtitle2" pt={1} color="red">
                                    Please fill your email!
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <Input type="number" {...register('phoneNumber')} placeholder="Phone Number" fullWidth />
                        </Grid>
                        <Grid item xs={6}>
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
                            {errors.username && (
                                <Typography variant="subtitle2" pt={1} color="red">
                                    Please fill your username!
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex' }}>
                            <Input
                                type={showPassword ? 'password' : 'text'}
                                {...register('password', { required: true })}
                                placeholder="* Password"
                                fullWidth
                            />
                            <RemoveRedEyeOutlinedIcon onClick={handleShowPass} style={{ cursor: 'pointer' }} />
                            {errors.password && (
                                <Typography variant="subtitle2" pt={1} color="red">
                                    Please fill your password!
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                style={{ backgroundColor: '#3b3d8b' }}
                            >
                                Sign up
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Typography color="#5c7fda" component={Link} to="/login">
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
    backgroundColor: '#1f2a40',
    width: '25vw',
    height: '600px',
    borderRadius: '10px',
    borderTop: '10px solid #79a6fe',
    borderBottom: '10px solid #8BD17C',
});
