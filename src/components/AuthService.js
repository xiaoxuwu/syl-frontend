import axios from './AxiosClient';

export function authenticate(credentials) {
    return axios.post('/auth/', credentials)
}

export function isAuthenticated() {
    console.log(localStorage.getItem('token'))
    return localStorage.getItem('token') !== ''
}

export function setToken(res) {
    localStorage.setItem('token', res.data.token);
}

export function logout() {
    localStorage.setItem('token', '')
}