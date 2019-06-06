import axios from '../AxiosClient';

export function authenticate(credentials) {
    return axios.post('/auth/', credentials)
}

export function getUserInfo(token) {
    return axios.get('/api/users/', { 'headers': { 'Authorization': 'Token ' + token } })
}

export function isAuthenticated() {
    var token = localStorage.getItem('token')
    if (token !== undefined) {
        return token !== ''
    } else {
        return false
    }
}

export function setToken(res) {
    localStorage.setItem('token', res.data.token);
}

export function setUserInfo(token, username) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
}

export function removeToken() {
    localStorage.setItem('token', '')
}
