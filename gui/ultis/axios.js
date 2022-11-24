import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.BASE_URL,
});

export default httpRequest;
