import axios from 'axios';
import { loginStart, loginSuccess, loginFailed, logoutSuccess } from './authSlice';

export const loginUser = async (user, dispatch, navigate, setError) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('https://server-ls-shop.onrender.com/auth/login', user);
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (error) {
        setError('password', {
            type: 'server',
            message: 'Something went wrong with your password',
        });
        dispatch(loginFailed());
    }
};

export const logoutUser = async (dispatch, navigate) => {
    dispatch(logoutSuccess());
    navigate('/login');
};
