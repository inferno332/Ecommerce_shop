import axios from 'axios';
import { loginStart, loginSuccess, loginFailed, logoutSuccess } from './authSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('http://localhost:9000/auth/login', user);
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (error) {
        dispatch(loginFailed());
    }
};

export const logoutUser = async (dispatch, navigate) => {
    dispatch(logoutSuccess());
    navigate('/login');
};
