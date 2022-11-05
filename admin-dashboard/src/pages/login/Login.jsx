import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/system';
import { Box, Button, Container, Grid, Input, Typography } from '@mui/material';
import { loginUser } from '../../redux/apiRequests';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

function Login() {
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
            <BoxAuth>
                <div>
                    <Typography variant="h2">
                        <span style={{ color: '#5c6bc0' }}>Admin</span>Dashboard
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
                        <Grid item xs={12} sx={{ display: 'flex' }}>
                            <Input
                                type={showPassword ? 'password' : 'text'}
                                {...register('password', { required: true })}
                                placeholder="Password"
                                fullWidth
                            />
                            <RemoveRedEyeOutlinedIcon onClick={handleShowPass} style={{ cursor: 'pointer' }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                style={{ backgroundColor: '#3b3d8b' }}
                            >
                                Sign in
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Typography color="#5c7fda" component={Link} to="/register">
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
    backgroundColor: '#1f2a40',
    width: '25vw',
    height: '600px',
    borderRadius: '10px',
    borderTop: '10px solid #79a6fe',
    borderBottom: '10px solid #8BD17C',
});