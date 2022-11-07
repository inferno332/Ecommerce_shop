import axios from 'axios';

const axiosJWT = axios.create();

axiosJWT.interceptors.request.use((config) => {
    const token = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth)?.login?.currentUser?.token;
    config.headers.Authorization = 'Bearer ' + token;
    return config;
});

export default axiosJWT;
