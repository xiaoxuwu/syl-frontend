import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});

export default instance;