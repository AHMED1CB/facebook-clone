import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8000/api", 
    headers: {
        Accept: 'application/json',
    },
})


api.interceptors.response.use(
    res => res,
    err => {
        return Promise.reject(err.response);
    }
);

export default api;