import axios from 'axios';

const axiosJWT = axios.create();

axiosJWT.interceptors.request.use((config) => {
    const token = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth)?.login?.currentUser?.token;
    config.headers.Authorization = 'Bearer ' + token;
    return config;
});

axiosJWT.interceptors.response.use(
    (res) => {
        return Promise.resolve(res);
    },
    (error) => {
        if (error.response.status === 401) {
            window.location.href = '/login';
        } else {
            return Promise.reject(error);
        }
    },
);

export default axiosJWT;
